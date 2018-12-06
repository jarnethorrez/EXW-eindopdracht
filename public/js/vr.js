let socket;
let scene;
let camera;

const createScene = () => {

  scene = document.querySelector('a-scene').object3D;

  scene.background = new THREE.Color(0x202FFB);

  const fog = new THREE.Fog(0x202FFB, 10, 2000);
  scene.fog = fog;
}

const createWater = () => {

  // scene.background = new THREE.Color('rgba(54, 73, 174)');
  // Load from C4D model.
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('../assets/objects/');
  mtlLoader.setPath('../assets/objects/');
  mtlLoader.load('UnderwaterLand.mtl', (materials) => {
    materials.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../assets/objects/');
    objLoader.load('UnderwaterLand.obj', (object) => {

      scene.add(object);
    });
  });

}

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

const setupSocket = () => {
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

const init = () => {
    setupSocket();
    createScene();
    createWater();
}

init();
