let socket;
let $PNC;

const sendSwim = () => {
  console.log("Swim triggered. - Event emitting");
  socket.emit(`swimToServer`, {
    swim: true,
    from: socket.id
  });
}

const handleOpenClick = e => {
  console.log(`open`);
  const $PNV = document.querySelector(`.poseNet-DevView`);

  if($PNV.classList.contains(`hide`)) {

    $PNC.classList.remove(`open`);
    $PNC.classList.add(`close`);
    $PNC.innerText = `close posenet`;

    $PNV.classList.remove(`hide`);
  } else {

    $PNC.classList.remove(`close`);
    $PNC.classList.add(`open`);
    $PNC.innerText = `open posenet`;

    $PNV.classList.add(`hide`);
  }
}

const init = () => {

    socket = io();

    // IN DEVELOPMENT@
    // socket.on(`ipAddress`, ipAddress => {
    //   document.querySelector(`.id`).innerText = `https://${ipAddress}:8080/vrAlternative.html?id=${socket.id}`;
    // });
    socket.on('connect', () => {
      document.querySelector(`.id`).innerText = `https://okeanos.herokuapp.com/VRAlternative.html?id=${socket.id}`;
    });


    $PNC = document.querySelector(`.open`);
    $PNC.addEventListener(`click`, handleOpenClick);
}

init();
