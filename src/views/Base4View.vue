<template>
  <div class="main">
    <Loading v-if="!this.scene" />
    <Menu
      v-if="this.option !== ''"
      figure="torus"
      :info="this.infoChildren"
      :material="this.material"
    />
    <v-row>
      <v-col cols="9">
        <div ref="canvas" class="contenedor3D" @mousemove="onPointer"></div>
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
import { gsap } from "gsap";
import Menu from "../components/Molecules/Menu.vue";
import MenuRight from "../components/Molecules/MenuRight.vue";
import Loading from '../components/Atoms/Loading.vue'

export default {
  name: "Base4",
  components: {
    Menu,
    MenuRight,
    Loading,
  },
  data() {
    //Emit

    //Global Var
    let meshCurrent = null;
    let meshCurrentClick = null;

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

    //Torus
    const geometry = new THREE.TorusGeometry(1.1, 0.5, 20, 100);
    const material = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
    });
    let torus = new THREE.Mesh(geometry, material);
    torus.name = "torus";

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    AmbientalLigth.name = "Ambiental";
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2);
    DirectionalLigth.name = "Directional";

    //Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      torus: torus,
      controls: [],
      AmbientalLigth: AmbientalLigth,
      DirectionalLigth: DirectionalLigth,
      meshCurrent: meshCurrent,
      meshCurrentClick: meshCurrentClick,
      raycaster: raycaster,
      pointer: pointer,
      gsap: gsap,
      material: material,
      option: "",
      infoChildren: {},
      item: "Mesh",
    };
  },

  created() {
    //Camera
    this.camera.position.z = 6;
    this.scene.add(this.camera);

    //Torus1
    this.scene.add(this.torus);

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
    // console.log(this.torus);
  },

  methods: {
    //Objects for collitions
    objectForCollitions() {
      return [this.torus];
    },

    onPointer(event) {
      try {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        //Raycaster Setup
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const collitions = this.objectForCollitions();
        const intersects = this.raycaster.intersectObjects(collitions, true);
        //Mouse onleave
        if (this.meshCurrent) {
          this.gsap.to(this.meshCurrent.material.color, {
            r: 1,
            g: 1,
            b: 1,
            overwrite: true,
            duration: 0.3,
          });
        }
        //Mouse hover and Click
        if (intersects.length) {
          this.meshCurrent = null;
          this.meshCurrent = intersects[0].object;
          this.meshCurrentClick = intersects[0].object;
          this.gsap.to(this.meshCurrent.material.color, {
            r: 0,
            g: 1,
            b: 1,
            overwrite: true,
            duration: 0.3,
          });
        } else if (this.meshCurrent) {
          this.gsap.to(this.meshCurrent.material.color, {
            r: 1,
            g: 1,
            b: 1,
            overwrite: true,
            duration: 0.5,
          });
        }
      } catch (error) {}
    },
    onClick() {
      try {
        switch (this.meshCurrentClick.name) {
          case "Torus 1":
            return console.log("torus 1");
          default:
            return null;
        }
      } catch (error) {}
    },
    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    },

    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
    infoHijo(value) {
      this.option = value;
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
