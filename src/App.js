import React, {useEffect, useRef, useState} from 'react';
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import * as fp from "fingerpose"
import Webcam from "react-webcam"
import './App.css';
import {drawHand} from "./utilities"
import ThumbsUp from "./gestures/ThumbsUp" 
import ThumbsDown from "./gestures/ThumbsDown" 
import Fist from "./gestures/Fist" 
import Victory from "./gestures/Victory" 
import fingersSplayed from "./gestures/FingersSplayed" 

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emoji, setEmoji] = useState(null);

  useEffect(() => {
    runHandpose();
  }, []);

  const runHandpose = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net)
    }, 100)
  };

  const detect = async (net) => {
    if(typeof webcamRef.current != undefined && webcamRef.current!==null && webcamRef.current.video.readyState ===4){
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.props.style.width;
      const videoHeight = webcamRef.current.props.style.height;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = webcamRef.current.video.width;
      canvasRef.current.height = webcamRef.current.video.height;

      const hand = await net.estimateHands(video);

      if(hand.length>0){
        const GE = new fp.GestureEstimator([
          Victory,
          ThumbsUp,
          ThumbsDown,
          Fist,
          fingersSplayed
        ])
        const gesture = await GE.estimate(hand[0].landmarks, 9);
        if(gesture.gestures !== undefined && gesture.gestures.length > 0){
          const confidences = gesture.gestures.map((prediction)=> prediction.score);
          const maxConfidence = confidences.indexOf(Math.max(...confidences));

          setEmoji(gesture.gestures[maxConfidence].name);
        }
      } else {
        setEmoji(null);
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  const getEmoji = (emoji) => {
    switch (emoji) {
      case 'fingers_splayed':
        return "🖐️";
        break;      
      case 'fist':
        return "✊";
        break;
      case 'thumbs_up':
        return "👍";
        break;      
      case 'thumbs_down':
        return "👎";
        break;
      case 'victory':
        return "✌️";
        break;
      default:
        return '';
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Webcam 
          ref={webcamRef}
          style={{position: "absolute", marginLeft: "auto", marginRight: "auto", left:0, right:0, textAlign:"center", zIndex:9, width: 640, height: 480}}
        />
        <canvas 
          ref={canvasRef}
          style={{position: "absolute", marginLeft: "auto", marginRight: "auto", left:0, right:0, textAlign:"center", zIndex:9, width: 640, height: 480}}
        />
        <div style={{position: "absolute", zIndex: 100,  marginLeft: "auto", marginRight: "auto",}}>
          {emoji != null ? getEmoji(emoji) : ""}
        </div>
      </header>
    </div>
  );
}

export default App;
