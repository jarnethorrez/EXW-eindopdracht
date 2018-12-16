let poses = [];
let startedExperience =  false;
let $btn;
{

  const ctx = document.querySelector(`#canvas`).getContext(`2d`);
  const videoFeed = document.querySelector(`#videoElement`);
  let $rightWrist;
  let $leftWrist;

  const handleStartClick = () => {

    if(!startedExperience) {

      $btn.querySelector(`p`).innerText = 'Stop Experience';
      startedExperience = true;

    } else {
      $btn.querySelector(`p`).innerText = 'Start Experience';
      startedExperience = false;
    }

  }

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
    if(startedExperience) {
      if (left.x - right.x > 300) {

        for (i = 1; i < 6; i++) {

          const left2 = poses[poses.length - i].keypoints[9].position;
          const right2 = poses[poses.length - i].keypoints[10].position;

          if(left2.x - right2.x <= 150) {
            sendSwim(); // Defined in index.js;
            break;
          }

        }

      }
    }

  }

  const isMobileDevice = () => {
     return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  const init = () => {

      if (!isMobileDevice()) {
        // Desktop
        setupWebcam();
        window.requestAnimationFrame(getPose);
      } else {

      }

      $btn = document.querySelector(`.start-button`);
      $btn.addEventListener(`click`, handleStartClick);
  }

  init();
}
