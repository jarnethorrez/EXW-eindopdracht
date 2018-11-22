let socket;


const sendSwim = () => {
  console.log("Swim triggered. - Event emitting");
  socket.emit(`swimToServer`, {
    swim: true,
    from: socket.id
  });
}


const init = () => {
    socket = io.connect('/');

    socket.on(`connect`, () => {
      document.querySelector(`.id`).innerText = `http://localhost:8080/VR.html?id=${socket.id}`;
    });
}

init();
