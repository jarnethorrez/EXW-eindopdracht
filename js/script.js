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
      net.estimateSinglePose(videoFeed, 0.5, false, 16)
      .then(pose => {
        poses.push(pose);
        drawHands(pose)
      });

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

    measureMovement(left, right);
  }

  const measureMovement = (left, right) => {

    if (left.x - right.x > 300) {
      // console.log('End of swim');


      for (i = 1; i < 6; i++) {

        const left2 = poses[poses.length - i].keypoints[9].position;
        const right2 = poses[poses.length - i].keypoints[10].position;

        if(left2.x - right2.x <= 150) {
          // console.log("did begin swimming too");
          console.log("did a swim");
          break;
        }

      }

    }

  }


  const init = () => {
      setupWebcam();
      window.requestAnimationFrame(getPose);
  }

  init();
}
