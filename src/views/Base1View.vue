<template>
  <v-container class="main">
    <Menu figure="sphere" :info="this.sphere" />
    <div ref="one" @mousedown="mousedown" class="id"></div>
    <div ref="canvas" class="contenedor3D"></div>
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
  data() {
    //Drags
    let prevX = 0;
    let prevY = 0;

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

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      rect: {},
      el: {},
      prevX: prevX,
      prevY: prevY,
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Sphere
    this.scene.add(this.sphere);

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
    this.el = this.$refs.one;
  },

  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
    mousedown(e) {
      this.rect = this.el.getBoundingClientRect();
      console.log(this.rect);

      window.addEventListener("mousemove", this.mousemove);
      window.addEventListener("mouseup", this.mouseup);
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    },
    mousemove(e) {
      let newX = this.prevX - e.clientX;
      let newY = this.prevY - e.clientY;
      console.log({ newX });

      // document
      //   .getElementsByClassName("id")[0]
      //   .setAttribute("style", `top:${this.rect.top - newY}px`);
      // document
      //   .getElementsByClassName("id")[0]
      //   .setAttribute("style", `left:${this.rect.left - newX}px`);

      this.el.style.left = this.rect.left - newX + "px";
      this.el.style.top = this.rect.top - newY + "px";

      // console.log(e.clientX);

      // this.prevX = e.clientX;
      // this.prevY = e.clientY;
    },
    mouseup() {},
  },
};
</script>

<style lang="scss">
.contenedor3D {
  width: 100%;
  height: 100vh;
}
.main {
  background-color: #f0f0f0;
  position: absolute;
}
.id {
  cursor: move;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: red;
  z-index: 1000;
}
</style>
