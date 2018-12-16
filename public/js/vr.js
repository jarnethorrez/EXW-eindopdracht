import GoblinShark from './classes/GoblinShark.js';
import JellyFish from './classes/JellyFish.js';
import DumboOctopus from './classes/DumboOctopus.js';
import TelescopeOctopus from './classes/TelescopeOctopus.js';
import Benthocodon from './classes/Benthocodon.js';
import HatchetFish from './classes/HatchetFish.js';

let socket;
let scene;
let camera;
let fbxLoader;

let mtlLoader;
let objLoader;

const createScene = () => {

  scene = document.querySelector('a-scene').object3D;

  scene.addEventListener('render-target-loaded', () => {
    console.log(scene.renderer);
  });

  scene.background = new THREE.Color(0x202FFB);

  const fog = new THREE.Fog(0x202FFB, 1, 500);
  scene.fog = fog;

  //const light = new THREE.AmbientLight( 0x202FFB );
  const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );
}

const createWater = () => {

  // Load from C4D model
  mtlLoader.setTexturePath('../assets/objects/');
  mtlLoader.setPath('../assets/objects/');
  mtlLoader.load('UnderwaterSmall1000.mtl', (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.setPath('../assets/objects/');
    objLoader.load('UnderwaterSmall1000.obj', (object) => {
      scene.add(object);
      addShark();
      addJellyFish();
      addDumbo();
      addTeleOcto();
      addBenthocodon();
      addHatchetFish();
    });
  });
}

const addShark = () => {
  const haaitje = new GoblinShark();
  haaitje.loadObj(objLoader, mtlLoader, scene);
  haaitje.swim();
}

const addDumbo = () => {
  const dumbo = new DumboOctopus();
  dumbo.loadObj(objLoader, mtlLoader, scene);
  dumbo.swim();
}

const addJellyFish = () => {
  const jelly = new JellyFish();
  jelly.loadObj(objLoader, mtlLoader, scene);
  jelly.swim();
}

const addTeleOcto = () => {
  const tele = new TelescopeOctopus();
  tele.loadObj(objLoader, mtlLoader, scene);
  tele.swim();
}

const addBenthocodon = () => {
  const bentho = new Benthocodon();
  bentho.loadObj(objLoader, mtlLoader, scene);
}

const addHatchetFish = () => {
  const hatchet = new Benthocodon();
  hatchet.loadObj(objLoader, mtlLoader, scene);
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

  let targetId = getUrlParameter(`id`);

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

  if(!getUrlParameter(`id`)) {
    window.location.replace("https://okeanos.herokuapp.com/");
  }

    mtlLoader = new THREE.MTLLoader();
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();

    setupSocket();
    createScene();
    createWater();

}

init();
