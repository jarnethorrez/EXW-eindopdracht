//import FBXLoader from '../lib/fbxLoader.js';

export default class GoblinShark {

  constructor() {

    console.log("Sharkin away");

  }

  loadObj(objLoader, mtlLoader, scene) {

    mtlLoader.setTexturePath('../assets/objects/');
    mtlLoader.setPath('../assets/objects/');
    mtlLoader.load('sharklein.mtl', (materials) => {
      materials.preload();

      objLoader.setMaterials(materials);
      objLoader.setPath('../assets/objects/');
      objLoader.load('sharklein.obj', (object) => {
        // object.scale = {x: 0.5, y: 0.5, z: 0.5}
        this.object = object;
        scene.add(object);
      });
    });

  }

  loadFBX(fbxLoader, scene) {
    // Haha, doesn't really work.
  //   fbxLoader.load('../assets/fbx/sharklein.fbx', object => {
  //
  //     console.log(object);
  //     object.mixer = new THREE.AnimationMixer( object );
  //     object.push( object.mixer );
  //
  //     let action = object.mixer.clipAction( object.animations[ 0 ] );
	// 		action.play();
  //     scene.add(object);
  //   });
  //

  console.log('Fbx werkt niet.');
  }

  swim() {
    
  }

}
