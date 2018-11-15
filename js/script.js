let poses = [];
{



  const videoFeed = document.querySelector(`#videoElement`);
  let $rightWrist;
  let $leftWrist;

  const setupWebcam = () => {

    if (navigator.mediaDevices.getUserMedia) {
       navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
          videoFeed.srcObject = stream;
          videoStream = stream;
        })
    }

  }

  const loadPoseNet = async () => {
    const net = await posenet.load(1.01);
    const pose = await net.estimateSinglePose(videoFeed, 0.5, false, 16);

    poses.push(pose);
    updateHandLocation(pose);
    console.log(poses.length);

    window.requestAnimationFrame(loadPoseNet);
  }

  const updateHandLocation = (pose) => {

    const rightWrist = pose.keypoints[10];
    const leftWrist = pose.keypoints[9];

    $rightWrist.style.left = `${rightWrist.position.x}px`;
    $rightWrist.style.top = `${rightWrist.position.y}px`;

    $leftWrist.style.left = `${leftWrist.position.x}px`;
    $leftWrist.style.top = `${leftWrist.position.y}px`;

  }

  const makeHands = () => {
    // Create right wrist
    $rightWrist = document.createElement(`div`);
    $rightWrist.classList.add(`dot`);
    document.querySelector(`body`).appendChild($rightWrist);

    // create left wrist
    $leftWrist = document.createElement(`div`);
    $leftWrist.classList.add(`dot`);
    document.querySelector(`body`).appendChild($leftWrist);
  }

  const init = () => {
      setupWebcam();
      makeHands();
      window.requestAnimationFrame(loadPoseNet);
  }

  init();
}
