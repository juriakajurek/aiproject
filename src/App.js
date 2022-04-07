import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand, getEmoji } from './utilities';
import ThumbsUp from './gestures/ThumbsUp';
import ThumbsDown from './gestures/ThumbsDown';
import Fist from './gestures/Fist';
import Victory from './gestures/Victory';
import fingersSplayed from './gestures/FingersSplayed';
// import Settings from './settings.svg';

import { EasybaseProvider, useEasybase, Auth } from 'easybase-react';
import ebconfig from './ebconfig';

import { Card, Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emoji, setEmoji] = useState(null);

  const [isFingersSplayedActive, setFingersSplayedActive] = useState(true);
  const [isFistActive, setFistActive] = useState(true);
  const [isThumbsUpActive, setThumbsUpActive] = useState(true);
  const [isThumbsDownActive, setThumbsDownActive] = useState(true);
  const [isVictoryActive, setVictoryActive] = useState(true);
  // const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isSettingsRestored, setSettingsRestored] = useState(false);

  // const [gesturesArray, setGesturesArray] = useState([]);

  useEffect(async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 50);
  });

  const detect = async (net) => {
    if (
      typeof webcamRef.current != undefined &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.props.style.width;
      const videoHeight = webcamRef.current.props.style.height;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = webcamRef.current.video.width;
      canvasRef.current.height = webcamRef.current.video.height;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fingersSplayed,
          ThumbsDown,
          ThumbsUp,
          Victory,
          Fist,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 9);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidences = gesture.gestures.map(
            (prediction) => prediction.score,
          );
          const maxConfidence = confidences.indexOf(Math.max(...confidences));

          setEmoji(gesture.gestures[maxConfidence].name);
        }
      } else {
        setEmoji(null);
      }

      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  };

  const SignOutButton = () => {
    const { signOut } = useEasybase();
    return <div onClick={signOut}>Wyloguj</div>;
  };

  const EmojiCheckbox = (props) => {
    const { db, e, userID } = useEasybase();

    useEffect(() => {
      restoreSettings();
    }, []);

    const updateSettings = async (settingName) => {
      let fingerSplayedSetting = isFingersSplayedActive;
      let fistSetting = isFistActive;
      let thumbsUpSetting = isThumbsUpActive;
      let thumbsDownSetting = isThumbsDownActive;
      let victorySetting = isVictoryActive;

      switch (settingName) {
        case 'fingers_splayed':
          fingerSplayedSetting = !fingerSplayedSetting;
          break;
        case 'fist':
          fistSetting = !fistSetting;
          break;
        case 'thumbs_up':
          thumbsUpSetting = !thumbsUpSetting;
          break;
        case 'thumbs_down':
          thumbsDownSetting = !thumbsDownSetting;
          break;
        case 'victory':
          victorySetting = !victorySetting;
          break;
        default:
          break;
      }

      db('SETTINGS')
        .return()
        .where(e.eq('userId', userID()))
        .all()
        .then((res) => {
          if (res.length > 0) {
            db('SETTINGS')
              .where({ _key: res[0]._key })
              .set({
                isFingersSplayedActive: fingerSplayedSetting,
                isFistActive: fistSetting,
                isThumbsUpActive: thumbsUpSetting,
                isThumbsDownActive: thumbsDownSetting,
                isVictoryActive: victorySetting,
              })
              .one();
          } else {
            db('SETTINGS')
              .insert({
                isFingersSplayedActive: fingerSplayedSetting,
                isFistActive: fistSetting,
                isThumbsUpActive: thumbsUpSetting,
                isThumbsDownActive: thumbsDownSetting,
                isVictoryActive: victorySetting,
                userId: userID(),
              })
              .one();
          }
        });
    };

    const restoreSettings = async () => {
      if (!isSettingsRestored) {
        db('SETTINGS')
          .return()
          .where(e.eq('userId', userID()))
          .all()
          .then((res) => {
            if (res.length > 0) {
              console.log(res);
              setFingersSplayedActive(res[0].isfingerssplayedactive);
              setFistActive(res[0].isfistactive);
              setThumbsUpActive(res[0].isthumbsupactive);
              setThumbsDownActive(res[0].isthumbsdownactive);
              setVictoryActive(res[0].isvictoryactive);
              // updateGestureArray(res[0]);
            }
          })
          .then(() => {});
        setSettingsRestored(true);
      }
    };

    // const updateGestureArray = (settings) => {
    //   let tempArray = [];
    //   if (settings.isfingerssplayedactive) tempArray.push(fingersSplayed);
    //   if (settings.isfistactive) tempArray.push(Fist);
    //   if (settings.isthumbsupactive) tempArray.push(ThumbsUp);
    //   if (settings.isthumbsdownactive) tempArray.push(ThumbsDown);
    //   if (settings.isvictoryactive) tempArray.push(Victory);

    //   setGesturesArray(tempArray);
    //   console.log(tempArray);
    // };

    const manageSettings = () => {
      switch (props.emoji) {
        case 'fingers_splayed':
          updateSettings('fingers_splayed').then(() => {
            setFingersSplayedActive(!isFingersSplayedActive);
          });
          break;
        case 'fist':
          updateSettings('fist').then(() => {
            setFistActive(!isFistActive);
          });
          break;
        case 'thumbs_up':
          updateSettings('thumbs_up').then(() => {
            setThumbsUpActive(!isThumbsUpActive);
          });
          break;
        case 'thumbs_down':
          updateSettings('thumbs_down').then(() => {
            setThumbsDownActive(!isThumbsDownActive);
          });
          break;
        case 'victory':
          updateSettings('victory').then(() => {
            setVictoryActive(!isVictoryActive);
          });
          break;
        default:
          break;
      }
    };

    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={props.checked}
          id={props.id}
          onChange={() => manageSettings()}
        />
        <label className="form-check-label" htmlFor={props.id}>
          {getEmoji(props.emoji)}
        </label>
      </div>
    );
  };
  return (
    <div className="App">
      <EasybaseProvider ebconfig={ebconfig}>
        <Auth
          dictionary={{
            /**
             * SignUp
             */
            newPasswordLabel: 'Hasło',
            confirmNewPasswordLabel: 'Potwierdź hasło',
            newEmailLabel: 'Adres email',
            signUpSubmitButton: 'Rejestracja',
            backToSignIn: 'Powrót do Logowania',
            signUpHeader: 'Zakładanie konta',
            // newFirstNameLabel?: string;
            // newLastNameLabel?: string;
            // newFullNameLabel?: string;
            // newDateOfBirthLabel?: string;
            // newPhoneNumberLabel?: string;

            /**
             * SignIn
             */
            signInHeader: 'Witaj w Emoji Recognizer!',
            emailLabel: 'Adres email',
            passwordLabel: 'Hasło',
            forgotPasswordButton: 'Zapomniałeś hasła?',
            signInSubmitButton: 'Zaloguj',
            noAccountButton: 'Nie masz jeszcze konta? Zarejestruj się.',

            /**
             * ForgotPassword
             */
            forgotPasswordHeader: 'Resetowanie hasła',
            forgotPasswordConfirmHeader: 'Resetowanie hasła',
            forgotPasswordSecondaryHeader:
              'Podaj adres email powiązany z kontem, prześlemy na niego kod weryfikacyjny',
            forgotPasswordConfirmSubmitButton: 'Dalej',
            forgotPasswordSubmitButton: 'Dalej',
            codeLabel: 'Wpisz tutaj otrzymany kod',
            forgotPasswordConfirmLabel: 'Wprowadź nowe hasło',

            /**
             * Errors
             */
            // errorPasswordsDoNotMatch: 'Niepoprawne hasło',
            // errorBadInputFormat: '',
            // errorPasswordTooShort: 'Hasło jest za krótkie',
            // errorUserAlreadyExists: 'Taki użytkownik już istnieje',
            // errorUserDoesNotExist: 'Podany użytkownik nie istnieje',
            // errorRequestLimitExceeded: '',
            // errorNoAccountFound: 'Nie znaleziono takiego konta',
            // errorWrongVerificationCode: 'Błędny kod weryfikacyjny'
          }}
        >
          <Navbar bg="light" expand="lg">
            <Container className="navbar-buttons-container">
              <Navbar.Brand href="#">Emoji Recognizer</Navbar.Brand>
              <Nav className="">
                <Nav.Link href="#">
                  <SignOutButton />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <div className="content-container">
            <header className="App-header">
              <Card body className="recognizer-card">
                {/* <img
                  className="settings-toggle"
                  src={Settings}
                  onClick={() => {
                    document
                      .querySelectorAll(".form-check input[type='checkbox']")
                      .forEach((box) => {
                        console.log(box);
                        box.style.opacity = +!isSettingsVisible;
                        setSettingsVisible(!isSettingsVisible);
                      });
                  }}
                /> */}
                <div className="video-container">
                  <Webcam
                    ref={webcamRef}
                    className="cam"
                    style={{
                      width: 640,
                      height: 480,
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="canvas"
                    style={{
                      width: 640,
                      height: 480,
                    }}
                  />
                  <div
                    className="emoji-container"
                    style={{
                      width: 640,
                      height: 480,
                    }}
                  >
                    <p>{emoji != null ? getEmoji(emoji) : ''}</p>
                  </div>
                </div>
                <div className="switch-container">
                  <p className="gestures-header px-5 text-nowrap">
                    Rozpoznawane gesty
                  </p>
                  <p className="gestures-header-hint text-nowrap">
                    Po wprowadzeniu zmian odśwież stronę
                  </p>
                  <EmojiCheckbox
                    checked={isFingersSplayedActive}
                    id="fingers-splayed-check"
                    emoji="fingers_splayed"
                  />
                  <EmojiCheckbox
                    checked={isThumbsUpActive}
                    id="thumbs-up-check"
                    emoji="thumbs_up"
                  />
                  <EmojiCheckbox
                    checked={isThumbsDownActive}
                    id="thumbs-down-check"
                    emoji="thumbs_down"
                  />
                  <EmojiCheckbox
                    checked={isFistActive}
                    id="fist-check"
                    emoji="fist"
                  />
                  <EmojiCheckbox
                    checked={isVictoryActive}
                    id="victory-check"
                    emoji="victory"
                  />
                </div>
              </Card>
            </header>
          </div>
        </Auth>
      </EasybaseProvider>
    </div>
  );
}

export default App;
