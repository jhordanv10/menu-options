<template>
  <v-container class="main">
    <div ref="canvas" class="contenedor3D"></div>
    <Menu figure="cone" :info="this.cone" :material="this.material"></Menu>
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

    const cone = new THREE.Mesh(geometry, material);

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);

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
    };
  },
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
  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },

  methods: {

    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    }
  },
};
</script>
