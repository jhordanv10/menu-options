<template>
  <div class="main">
    <!-- <Menu
      v-if="item === 'Mesh'"
      figure="cube"
      :info="this.infoChildren"
      :material="this.material"
    /> -->
    <v-row>
      <v-col cols="9">
        <div ref="canvas" class="contenedor3D"></div>
      </v-col>
      <v-col cols="3" class="pa-0">
        <!-- <MenuLeft
          @listenChildren="meshChildren"
          @escucharHijo="infoHijo"
          :scene="this.scene"
        /> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Menu from "../components/Molecules/Menu.vue";
import MenuLeft from "../components/Molecules/MenuLeft.vue";

import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";

export default {
  components: {
    Menu,
    MenuLeft,
  },
  data() {
    let elf;
    //Scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.name = "Persective";

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cube
    const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xb25068,
    });
    let cube = new THREE.Mesh(geometry, material);
    cube.name = "cube";

    // loading manager
    const loadingManager = new THREE.LoadingManager(function () {
      scene.add(elf);
    });

    const loader = new ColladaLoader(loadingManager);
    loader.load("../../public/collada/collada.dae", function (collada) {
      elf = collada.scene;
    });

    //Ligths
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube: cube,
      controls: [],
    };
  },

  created() {
    //Camera
    this.camera.position.z = -10;
    this.scene.add(this.camera);

    //Cube
    this.scene.add(this.cube);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },

  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
  },
};
</script>
