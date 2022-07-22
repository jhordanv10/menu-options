<template>
  <div class="main">
    <Loading v-if="!this.scene" />
    <Menu
      v-if="this.option !== ''"
      figure="cube"
      :info="this.infoChildren"
      :material="this.material"
    />
    <v-row>
      <v-col cols="9">
        <div ref="canvas" class="contenedor3D"></div>
      </v-col>
      <v-col cols="3" class="pa-0">
        <MenuRight
          @listenChildren="meshChildren"
          @escucharHijo="infoHijo"
          :scene="this.scene"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Menu from "../components/Molecules/Menu.vue";
import MenuRight from "../components/Molecules/MenuRight.vue";
import Loading from "../components/Atoms/Loafing.vue";

export default {
  name: "Base2",
  components: {
    Menu,
    MenuRight,
    Loading,
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
    camera.name = 'Persective'

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

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    AmbientalLigth.name = 'Ambiental'
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);
    DirectionalLigth.name = 'Directional'

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube: cube,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      material: material,
      option: '',
      infoChildren: {},
      item: "Mesh",
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Cube
    this.scene.add(this.cube);

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
    },
    infoHijo(value) {
      this.option = value
      this.infoChildren = value;
      // console.log(this.infoChildren);
    },
    meshChildren(value) {
      this.item = value;
      // console.log(this.item);
    },
  },
};
</script>
