<template>
  <div class="main">
    <Menu
      v-if="this.option !== ''"
      figure="sphere"
      :info="this.infoChildren"
      :material="this.material"
    />
    <v-row>
      <v-col cols="9">
        <div ref="canvas" class="contenedor3D" @click="onClick"></div>
      </v-col>
      <v-col cols="3" class="pa-0">
        <MenuLeft
          @listenChildren="meshChildren"
          @escucharHijo="infoHijo"
          :scene="this.scene"
          :active="this.infoChildren.name"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Menu from "../components/Molecules/Menu.vue";
import MenuLeft from "../components/Molecules/MenuLeft.vue";

export default {
  name: "Base1",
  components: {
    Menu,
    MenuLeft,
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
    camera.name = "Perspective";

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16);
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
    });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.name = "sphere";

    //Cube
    const geometry1 = new THREE.BoxBufferGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    let cube = new THREE.Mesh(geometry1, material1);
    cube.name = "cube";

    //Cone
    const geometry2 = new THREE.ConeGeometry(1.5, 2, 3);
    const material2 = new THREE.MeshBasicMaterial({
      color: 0x018adf,
    });
    let cone = new THREE.Mesh(geometry2, material2);
    cone.name = "cone";

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    AmbientalLigth.name = "Ambiental";
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);
    DirectionalLigth.name = "Directional";

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var objects = this.isMesh;
    // instantiate a texture loader
    const textureToShow = 0;

    const arr = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg",
    ];

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      cube: cube,
      cone: cone,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      material: material,
      option: "",
      infoChildren: this.$store.state.childrens,
      item: "Mesh",
      raycaster: raycaster,
      mouse: mouse,
      objects: objects,
      intersects: [],
      selected: sphere,
      // The textures to use
      arr: arr,
      textureToShow: textureToShow,
      children: {},
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Sphere
    this.scene.add(this.sphere);

    //Cube
    this.cube.position.set(-2, -2, 0);
    this.scene.add(this.cube);

    //Cone
    this.cone.position.set(3, 3, -2);
    this.scene.add(this.cone);

    //Ligth
    this.scene.add(this.AmbientalLigth);
    this.DirectionalLigth.position.set(3, 3, 3);
    this.scene.add(this.DirectionalLigth);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.infoChildren =
      JSON.stringify(this.$store.state.childrens) === undefined
        ? ""
        : this.$store.state.childrens;
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
      this.option = value;
      this.infoChildren =
        JSON.stringify(this.$store.state.childrens) === undefined
          ? value
          : this.$store.state.childrens;
    },
    meshChildren(value) {
      this.item = value;
      console.log(this.item);
    },
    onClick(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObjects(this.isMesh, true);
      if (this.intersects.length) {
        this.infoChildren = this.intersects[0].object;
        this.option = this.infoChildren;
        // console.log(this.infoChildren.name);
      }
    },
  },
  computed: {
    isMesh() {
      return this.scene.children.filter((i) => i.isMesh === true);
    },
  },
};
</script>

<style lang="scss">
.contenedor3D {
  width: 100%;
  height: 92vh;
}
.main {
  background-color: #f0f0f0;
  position: absolute;
}
</style>

//LOAD TEXTURE and on completion apply it on SPHERE new
THREE.TextureLoader().load( this.arr[this.textureToShow], (texture) => {
//Update Texture this.infoChildren.material.map = texture;
this.infoChildren.material.needsUpdate = true; // Update the next texture to
show this.textureToShow++; // Have we got to the end of the textures array if
(this.textureToShow > this.arr.length - 1) { this.textureToShow = 0; } }, (xhr)
=> { //Download Progress console.log((xhr.loaded / xhr.total) * 100 + "%
loaded"); }, (error) => { //Error CallBack console.log("An error happened" +
error); } );
