<template>
  <div ref="canvas" class="contenedor3D"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
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

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cube
    const geometry = new THREE.BoxBufferGeometry(1.5,1.5,1.5);
    const material = new THREE.MeshStandardMaterial({
      color:0xB25068,
    });
    let cube = new THREE.Mesh(geometry, material);

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube: cube,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Cube
    this.cube.rotation.set(0.5,1,0)
    this.scene.add(this.cube);

    //Ligth
    this.scene.add(this.AmbientalLigth);
    this.DirectionalLigth.position.set(3,3,3);
    this.scene.add(this.DirectionalLigth);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
    this.info();
  },

  methods: {
    info() {
      const info = this.cube;
      console.log(info);
    },
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedor3D {
  width: 100%;
  height: 100vh;
}
</style>