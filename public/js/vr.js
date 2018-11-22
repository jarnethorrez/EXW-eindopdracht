let socket;

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const showSwimReceived = () => {
  const $p = document.createElement(`p`);
  $p.innerText = `SWIM DETECTED!`;
  $p.classList.add(`swimDetected`);

  document.querySelector(`body`).appendChild($p);

  setTimeout(() => {
    const $p = document.querySelector(`.swimDetected`);
    document.querySelector(`body`).removeChild($p);
  }, 1000);
}

const init = () => {
    socket = io.connect('/');

    targetId = getUrlParameter(`id`);

    socket.on(`connect`, () => {
      console.log(`connected ${socket.id}`);
      console.log(`Listening to: ${targetId}`);
    });

    socket.on(`swimToClient`, data => {

      if(data.from == targetId) {
        console.log('Swim!!');
        showSwimReceived();
      }
    });
}

init();
