//import FBXLoader from '../lib/fbxLoader.js';

export default class DumboOctopus {

  constructor() {

    console.log("Dumbo octo");

  }

  loadObj(objLoader, mtlLoader, scene) {

    mtlLoader.setTexturePath('../assets/objects/');
    mtlLoader.setPath('../assets/objects/');
    mtlLoader.load('dumbooctopus.mtl', (materials) => {
      materials.preload();

      objLoader.setMaterials(materials);
      objLoader.setPath('../assets/objects/');
      objLoader.load('dumbooctopus.obj', (object) => {

        this.object = object;
        object.position.y = 100;
        object.position.x = 100;
        object.position.z = 100;
        object.scale.x = 0.1;
        object.scale.y = 0.1;
        object.scale.z = 0.1;
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
