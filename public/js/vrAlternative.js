let socket;
let index = 0;
let amountOfFish = 7;

const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const showSwimReceived = () => {
  console.log('swim');
  if( !(index + 1 >= amountOfFish) ) {
    document.querySelector(`#F${index}`).classList.add('hidden');
    index++;
    document.querySelector(`#F${index}`).classList.remove('hidden');
  } else {
    console.log('not enough fish.');
  }

  document.querySelector(`.darkness`).style.backgroundColor = `rgba(0, 0, 0, ${0 + index / 10})`;
}

const setupSocket = () => {
  socket = io.connect('/');

  let targetId = getUrlParameter(`id`);

  socket.on(`connect`, () => {
    console.log(`connected ${socket.id}`);
    console.log(`Listening to: ${targetId}`);
  });

  socket.on(`swimToClient`, data => {

    if(data.from == targetId) {
      showSwimReceived();
    }
  });
}

const init = () => {

    setupSocket();

}

init();
