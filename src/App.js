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

  useEffect(async () => {
    const net = await handpose.load();
    await setInterval(() => {
      detect(net, getVictoryActive);
    }, 50);
    runHandpose();
    setVictoryActive(true);
  }, []);

  const getVictoryActive = () => isVictoryActive;

  const runHandpose = async () => {
    const net = await handpose.load();
    await setInterval(() => {}, 300);
  };

  const detect = async (net, va) => {
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

      let gesturesArray = [];
      if (isFingersSplayedActive == true)
        gesturesArray = [...gesturesArray, fingersSplayed];
      if (isFistActive == true) gesturesArray = [...gesturesArray, Fist];
      if (isThumbsUpActive == true)
        gesturesArray = [...gesturesArray, ThumbsUp];
      if (isThumbsDownActive == true)
        gesturesArray = [...gesturesArray, ThumbsDown];
      if (va()) gesturesArray = [...gesturesArray, Victory];

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(gesturesArray);
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
                  <p className="gestures-header px-5">Rozpoznawane gesty:</p>
                  <p className="gestures-header-hint px-5">
                    Po wprowadzeniu zmian odśwież stronę
                  </p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isFingersSplayedActive}
                      id="fingers-splayed-check"
                      onChange={() =>
                        setFingersSplayedActive(!isFingersSplayedActive)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="fingers-splayed-check"
                    >
                      🖐️
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isFistActive}
                      id="fist-check"
                      onChange={() => setFistActive(!isFistActive)}
                    />
                    <label className="form-check-label" htmlFor="fist-check">
                      ✊
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isThumbsUpActive}
                      id="thumbs-up-check"
                      onChange={() => setThumbsUpActive(!isThumbsUpActive)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="thumbs-up-check"
                    >
                      👍
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isThumbsDownActive}
                      id="thumbs-down-check"
                      onChange={() =>
                        isThumbsDownActive
                          ? setThumbsDownActive(false)
                          : setThumbsDownActive(true)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="thumbs-down-check"
                    >
                      👎
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isVictoryActive}
                      id="victory-check"
                      onChange={() => setVictoryActive(!isVictoryActive)}
                    />
                    <label className="form-check-label" htmlFor="victory-check">
                      ✌️
                    </label>
                  </div>
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
