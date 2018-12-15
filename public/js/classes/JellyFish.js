//import FBXLoader from '../lib/fbxLoader.js';

export default class JellyFish {

  constructor() {
    this.mixers = [];
    console.log("Jellyfish");
  }

  loadFBX(fbxLoader, scene) {

    fbxLoader.load('../assets/fbx/kwal3.fbx', function(object) {
      object.mixer = new THREE.AnimationMixer(object);
      mixers.push(object.mixer);
      var action = object.mixer.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(object);
    });
  console.log('Fbx jellyfish');
  }

  swim() {
    requestAnimationFrame(this.swim);
    if(mixers.length > 0) {
      for (var i = 0; i < mixers.length; i ++) {
        mixers [i].update(clock.getDelta());
      }
    }
    renderer.render(scene, camera);
    stats.update();
  }

}
