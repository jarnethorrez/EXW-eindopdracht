let poses = [];
{
  const ctx = document.querySelector(`#canvas`).getContext(`2d`);
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

  const getPose = async () => {
      const net = await posenet.load(0.75);
      net.estimateSinglePose(videoFeed, 0.5, false, 16).then(pose => drawHands(pose))

      window.requestAnimationFrame(getPose);
  }

  const drawHands = (pose) => {

    const left = pose.keypoints[9].position;
    const right = pose.keypoints[10].position;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    // Left hand
    ctx.arc(left.x,left.y,10,0,2*Math.PI);
    //Right hand
    ctx.arc(right.x,right.y,10,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }


  const init = () => {
      setupWebcam();
      window.requestAnimationFrame(getPose);
  }

  init();
}
