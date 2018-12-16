let socket;
let index = 0;
let amountOfFish = 7;
let depths = ['Surface', '± 780m', '± 950m', '± 1.5km', '± 1.8km', '± 1.9km', '± 3.5km'];

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
    document.querySelector(`.darkness`).style.backgroundColor = `rgba(0, 0, 0, ${0 + index / 7})`;
    updateDepth();
  } else {
    document.querySelector(`#F${index}`).classList.add('hidden');
    document.querySelector(`.darkness`).style.backgroundColor = `rgba(0, 0, 0, 1)`;
    document.querySelector(`.depth`).classList.add('hidden');
    document.querySelector(`.end`).classList.remove('hidden');
  }
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

const updateDepth = () => {
  $amount = document.querySelector(`.amount`);
  $amount.innerText = depths[index];
  $amount.style.gridRow = `${5 + (index * 2)}`;
}

const createDepth = () => {

  const $depth = document.querySelector(`.depth`);

  $amount = document.createElement('div');
  $amount.classList.add('amount');
  $amount.innerText = depths[index];
  $depth.appendChild($amount);

}

const init = () => {

    setupSocket();
    createDepth();

}

init();
