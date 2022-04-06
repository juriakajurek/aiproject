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

import { LoginComponent } from './components/Login';
import { RegisterComponent } from './components/Register';

import Settings from './settings.svg';

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

  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isRecognizerVisible, setRecognizerVisible] = useState(true);

  const makeLoginVisible = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
    setRecognizerVisible(false);
  };
  const makeRegisterVisible = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
    setRecognizerVisible(false);
  };
  const makeRecognizerVisible = () => {
    setLoginVisible(false);
    setRegisterVisible(false);
    setRecognizerVisible(true);
  };

  const [isSettingsVisible, setSettingsVisible] = useState(false);

  useEffect(async () => {
    const net = await handpose.load();
    await setInterval(() => {
      detect(net, getVictoryActive);
    }, 300);
    runHandpose();
    setVictoryActive(true);
  }, []);

  // useEffect(() => {
  //   detect(net, getVictoryActive);
  // }, []);

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

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container className="navbar-buttons-container">
          <Navbar.Brand href="#" onClick={makeRecognizerVisible}>
            Emoji Recognizer
          </Navbar.Brand>
          <Nav className="">
            <Nav.Link href="#" onClick={makeLoginVisible}>
              Logowanie
            </Nav.Link>
            <Nav.Link href="#" onClick={makeRegisterVisible}>
              Rejestracja
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="content-container">
        {isRecognizerVisible ? (
          <header className="App-header">
            <Card body className="recognizer-card">
              <img
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
              />
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
                  <label className="form-check-label" htmlFor="thumbs-up-check">
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
        ) : (
          <div />
        )}
        {isLoginVisible ? (
          <LoginComponent makeRegisterVisible={makeRegisterVisible} />
        ) : (
          <div />
        )}
        {isRegisterVisible ? (
          <RegisterComponent makeLoginVisible={makeLoginVisible} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default App;
