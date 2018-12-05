let socket;

const sendSwim = () => {
  console.log("Swim triggered. - Event emitting");
  socket.emit(`swimToServer`, {
    swim: true,
    from: socket.id
  });
}


const init = () => {
    socket = io.connect('//:8080', {secure: true, verify: false, rejectUnauthorized : false});

    socket.on(`connect`, () => {
      document.querySelector(`.id`).innerText = `https://172.20.64.121:8080/VR.html?id=${socket.id}`;
    });
}

init();
