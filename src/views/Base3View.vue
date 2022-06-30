<template>
  <v-container>
    <div ref="canvas" class="contenedor3D"></div>
    <Menu figure="cone" :info="this.cone"></Menu>
  </v-container>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Menu from "../components/Menu.vue";


export default {


  components: {
    Menu,
  },
  data: function () {
    //Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cone
    const geometry = new THREE.ConeGeometry(1.5, 2, 4);

    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      flatShading: true,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.5,
    });
    // const texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg');
    // const material = new THREE.MeshStandardMaterial({
    //   map: texture,
    // });

    const cone = new THREE.Mesh(geometry, material);

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);


    // instantiate a texture loader
    const textureToShow = 0;

    const arr = [
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg'
    ];

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      material: material,
      cone: cone,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      geometry: geometry,
      // The textures to use
      arr: arr,
      textureToShow: textureToShow,
    };
  },

  mounted() {
    this.created();
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
    this.changeTexture()
  },

  methods: {
    created() {
      //Camera
      this.camera.position.z = 6;
      this.scene.add(this.camera);

      //Cone
      this.cone.rotation.set(0.5, 1, 0);
      this.scene.add(this.cone);

      //Ligth
      this.scene.add(this.AmbientalLigth);
      this.DirectionalLigth.position.set(3, 3, 3);
      this.scene.add(this.DirectionalLigth);

      //Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
    },
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
    changeTexture() {
      // Click interaction
      var canvas = document.getElementsByTagName("canvas")[0];
      var material = this.material;
      var arr = this.arr;
      var textureToShow= this.textureToShow;
      canvas.addEventListener("click", function () {
        //LOAD TEXTURE and on completion apply it on SPHERE
        new THREE.TextureLoader().load(
          arr[textureToShow],
          texture => {
            //Update Texture
            material.map = texture;
            material.needsUpdate = true;
            // Update the next texture to show
            textureToShow++;
            // Have we got to the end of the textures array
            if (textureToShow > arr.length - 1) {
              textureToShow = 0;
            }
          },
          xhr => {
            //Download Progress
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          error => {
            //Error CallBack
            console.log("An error happened" + error);
          }
        );
      });

      this.material = material;
      this.textureToShow= textureToShow;
      this.cone = new THREE.Mesh(this.geometry, this.material);
      this.created();
    }
  },
};
</script>

<style lang="scss" scoped>
.contenedor3D {
  width: 100%;
  height: 100vh;
}
</style>
