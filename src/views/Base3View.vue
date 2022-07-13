<template>
  <div class="main">
    <Menu
      v-if="item === 'Mesh'"
      figure="cone"
      :info="this.infoChildren"
      :material="this.material"
    />
    <v-row>
      <v-col cols="9">
        <div ref="canvas" class="contenedor3D"></div>
      </v-col>
      <v-col cols="3" class="pa-0">
        <MenuLeft
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
import MenuLeft from "../components/Molecules/MenuLeft.vue";

export default {
  components: {
    Menu,
    MenuLeft,
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
    camera.name = "Perspective";

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cone
    const geometry = new THREE.ConeGeometry(1.5, 2, 4);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      flatShading: true,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.5,
    });
    const cone = new THREE.Mesh(geometry, material);
    cone.name = "cone";

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    AmbientalLigth.name = "Ambiental";
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);
    DirectionalLigth.name = "Directional";

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      material: material,
      cone: cone,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      material: material,
      option: {},
      infoChildren: {},
      item: "Mesh",
    };
  },
  created() {
    //Camera
    this.camera.name = "Perspective";
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Cone
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
    },
    infoHijo(value) {
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
