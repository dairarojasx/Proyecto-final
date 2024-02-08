// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
    console.log(results);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(16, 233, 26);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
     // ellipse(pose.nose.x, pose.nose.y, 100, 100);
      fill(212, 60, 236);
      text("Hola mundo", pose.nose.x, pose.nose.y); 
      text("Aquí expreso amor", pose.leftEye.x, pose.leftEye.y);
      text("Veo historias", pose.rightEye.x, pose.rightEye.y);
      text("Me aventuran", pose.rightKnee.x, pose.rightKnee.y);
      text("Me llevan a experiencias", pose.leftKnee.x, pose.leftKnee.y);
      text("Puedo escuchar melodías", pose.leftEar.x, pose.leftEar.y);
      text("Me conecta con el mundo", pose.rightEar.x, pose.rightEar.y);
      text("Mi fortaleza", pose.rightShoulder.x, pose.rightShoulder.y);
      text("Mi fortaleza", pose.leftShoulder.x, pose.leftShoulder.y);
      text("Me permiten abrazar", pose.leftElbow.x, pose.leftElbow.y);
      text("Me permiten  experimentar la vida", pose.rightElbow.x, pose.rightElbow.y);
      text("Mis  instrumentos de creatividad", pose.rightWrist.x, pose.rightWrist.y); 
      text("Mis increíbles instrumentos de expresión", pose.leftWrist.x, pose.leftWrist.y); 
      text("Me da estabilidad y fuerza", pose.rightHip.x, pose.rightHip.y);
      text("Mi base solidad", pose.leftHip.x, pose.leftHip.y); 
      text("Me permiten mantenerme en pie", pose.leftAnkle.x, pose.leftAnkle.y);
      text("Me permiten mantenerme en pie", pose.leftAnkle.x, pose.leftAnkle.y);
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 255, 255);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}