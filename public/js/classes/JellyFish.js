//import FBXLoader from '../lib/fbxLoader.js';

export default class JellyFish {

  constructor() {
    this.mixers = [];
    console.log("Jellyfish");
  }

  loadObj(objLoader, mtlLoader, scene) {

    mtlLoader.setTexturePath('../assets/objects/');
    mtlLoader.setPath('../assets/objects/');
    mtlLoader.load('kwal3.mtl', (materials) => {
      materials.preload();

      objLoader.setMaterials(materials);
      objLoader.setPath('../assets/objects/');
      objLoader.load('kwal3.obj', (object) => {
        // object.scale = {x: 0.5, y: 0.5, z: 0.5}
        this.object = object;
        object.position.y = 80;
        object.position.x = -30;
        object.position.z = -30;
        object.scale.x = 0.1;
        object.scale.y = 0.1;
        object.scale.z = 0.1;
        scene.add(object);
      });
    });

  }

  // loadFBX(fbxLoader, scene) {
  //
  //   fbxLoader.load('../assets/fbx/kwal3.fbx', function(object) {
  //     object.mixer = new THREE.AnimationMixer(object);
  //     mixers.push(object.mixer);
  //     var action = object.mixer.clipAction(object.animations[0]);
  //     action.play();
  //     object.traverse(function(child) {
  //       if (child.isMesh) {
  //         child.castShadow = true;
  //         child.receiveShadow = true;
  //       }
  //     });
  //     scene.add(object);
  //     //console.log(object);
  //   });
  // console.log('Fbx jellyfish');
  // }

  swim() {
    // if(this.mixers.length > 0); {
    //   for (var i = 0; i < this.mixers.length; i ++) {
    //     mixers [i].update(clock.getDelta());
    //   }
    // }
    // renderer.render(scene, camera);
    // stats.update();
    // requestAnimationFrame(this.swim);
  }

}
