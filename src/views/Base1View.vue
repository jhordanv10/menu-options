<template>
  <div class="main" @changeOption="option => console.log(option)"> 
    <Menu figure="sphere" :info="this.infoChildren" :material="this.material" />
    <div ref="canvas" class="contenedor3D"></div>
    <Footer @escucharHijo="infoHijo" :scene="this.scene" />
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Menu,
    Footer,
  },
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

    //Sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16);
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
    });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.name = "sphere"

    //Cube
    const geometry1 = new THREE.BoxBufferGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xE8AA42,
    });
    let cube = new THREE.Mesh(geometry1, material1);
    cube.name = "cube"

    //Sphere 2
    const geometry2 = new THREE.SphereBufferGeometry(0.8, 16, 16);
    const material2 = new THREE.MeshStandardMaterial({ color: 0xEB4747 });
    let sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.name = "sphere2"

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      cube: cube,
      sphere2:sphere2,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      material: material,
      option: {},
      infoChildren: {}
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Sphere
    this.scene.add(this.sphere);

    //Cube
    this.cube.position.set(-2,-2,0)
    this.scene.add(this.cube);

    //Sphere 2
    this.sphere2.position.set(2,2,0)
    this.scene.add(this.sphere2);

    //Ligth
    this.scene.add(this.AmbientalLigth);
    this.DirectionalLigth.position.set(5, 5, 5);
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
    },
    infoHijo(value) {
      this.infoChildren = value
      console.log(this.infoChildren);
    }
  },
};
</script>

<style lang="scss">
.contenedor3D {
  width: 100%;
  height: 88vh;
}
.main {
  background-color: #f0f0f0;
  position: absolute;
}
</style>
