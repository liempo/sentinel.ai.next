import React from "react";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../utils/utilities";

function CameraCard(props) {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const detectWebcamFeed = async (posenet_model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Estimation
      const pose = await posenet_model.estimateSinglePose(video);
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };
  const runPosenet = async () => {
    const posenet_model = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8
    });
    //
    setInterval(() => {
      detectWebcamFeed(posenet_model);
    }, 100);
  };
  runPosenet();
  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    if (!canvas.current) return

    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-9 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Camera 1: </h2>
      </header>
      <div className="">
        {props.isCameraOpen && (
          <div className="relative">
           <Webcam
          ref={webcamRef}
          className="m-auto top-0 left-0 right-0"
          // style={{
          //   position: "absolute",
          //   marginLeft: "auto",
          //   marginRight: "auto",
          //   left: 0,
          //   right: 0,
          //   textAlign: "center",
          //   zindex: 9,
          //   width: 640,
          //   height: 480
          // }}
        />
                <canvas
          ref={canvasRef}
          className="absolute m-auto top-0 left-0 right-0 bottom-0"
          // style={{
          //   position: "absolute",
          //   marginLeft: "auto",
          //   marginRight: "auto",
          //   left: 0,
          //   right: 0,
          //   textAlign: "center",
          //   zindex: 9,
          //   width: 640,
          //   height: 480
          // }}
        />
          </div>
        )}
      </div>
    </div>
  )
}

export default CameraCard
