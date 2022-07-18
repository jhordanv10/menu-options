<template>
  <div class="main">
    <Menu
      v-if="item === 'Mesh'"
      figure=""
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
          :children="this.children"
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
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";

export default {
  components: {
    Menu,
    MenuLeft,
  },
  data() {
    //Scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // //Camera
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

    //Ligths
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    ambientLight.name = "Ambiental";
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.name = "Directional";
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: [],
      item: "Mesh",
      infoChildren: {},
      children:[],
      material: {},
      mockup: {},
    };
  },

  created() {
    //Camera
    //this.camera.position.z = -10;
    this.scene.add(this.camera);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.colladaRender();
  },

  async mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
    console.log("Children", this.infoChildren);
  },

  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.update();
    },
    infoHijo(value) {
      this.infoChildren =
        JSON.stringify(this.$store.state.childrens) === undefined
          ? value
          : this.$store.state.childrens;
      console.log('InfoChildren',this.infoChildren);
    },
    meshChildren(value) {
      this.item = value;
      // console.log(this.item);
    },
    colladaRender() {
      const texture = new THREE.TextureLoader().load(
        require("../assets/texture.png")
      );
      const loader = new ColladaLoader();
      let camera2 = null;
      let scene = this.scene;
      let camera = this.camera;
      let mockup = this.mockup;
      loader.load("./collada.dae", function (collada) {
        mockup = collada.scene;
        mockup.traverse(async function (node) {
          if (node.isMesh) {
            // console.log(node)
            node.material.color = new THREE.Color(0x0078AA);
            node.material.blending = THREE.NoBlending;
            node.material.alphaTest = 0.5;
            node.material.transparent = false;
            // node.material.side = THREE.DoubleSide; // Enable back-faces
            if (node.material.name == "pet-label") {
              // node.material.map = texture;
            }
          }
        });
        scene.add(mockup);
        camera = camera;
        let camera2 = scene.getObjectByName("Camera");
        // console.log(camera2)

        if (!camera2) {
          console.error({ message: "Camera not found" });
        }

        camera2.aspect = 5000 / 3333;
        if (camera2.type == "OrthographicCamera") {
          camera2.zoom = scene.getObjectByName("zoom").position.x * 100 || 20;
          camera2.left = -camera2.aspect;
          camera2.right = camera2.aspect;
          camera2.top = 1;
          camera2.bottom = -1;
        }
        camera2.updateProjectionMatrix();
        camera2.position.set(1, -0.5, 0.5);
        camera2.name = "Orthographic";
        scene.add(camera2);
      });
      setTimeout(() => {
        // console.log(camera2)
        // console.log(this.scene)
        // console.log(this.camera)
        this.infoChildren = this.scene.children[3].children[1]
        this.children = this.scene.children[3].children
        // console.log(this.infoChildren);
        this.camera = this.scene.children[4];
      }, 500);
      // console.log("Camera 2")
    },
  },
};
</script>
