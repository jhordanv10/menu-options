<template>
  <div>
    <!-- Wireframe -->
    <v-container>
      <v-row>
        <label :class="wireframe === true ? 'green--text' : 'red--text'">{{
            wireframe === true ? "Wireframe true" : "Wireframe false"
        }}</label>
      </v-row>
      <v-row>
        <v-switch :class="wireframe === true ? 'text--green my-0' : 'text--red my-0'" @click="changeWireframe"
          v-model="wireframe" :color="wireframe === true ? 'green' : 'red'" hide-details></v-switch>
      </v-row>
    </v-container>

    <!-- Side -->
    <v-container>
      <v-row>
        <v-col class="d-flex px-0" cols="12">
          <v-select v-model="side" @change="changeSide" :items="items" label="Side"></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- color -->
    <v-container class="pa-0 color" v-if="this.material.color">
      <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <span class="colorPicker">Color
            <div class="div-color">
              <input class="color" :id="figure + '-color'" type="color" :value="color" @change="changeColor" />
            </div>
          </span>
        </v-col>
      </v-row>

      <!-- <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <v-color-picker
            hide-canvas
            hide-mode-switch
            mode="hexa"
            swatches-max-height="100"
            :id="figure+'-color'"
            v-model="color"
            :color="color"
            @change="changeColor"
          ></v-color-picker>
        </v-col>
      </v-row> -->
    </v-container>

    <!-- Visible -->
    <v-container justify="center">
      <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <v-btn v-model="visible" @click="changeVisible" class="mx-2 mt-6" fab dark
            :color="visible === true ? 'red' : 'green'">
            <v-icon dark>
              {{
                  visible === true ? "mdi-eye-off-outline" : "mdi-eye-outline"
              }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as THREE from "three";

export default {

  data() {
    let color = '#007BFF';

    // instantiate a texture loader
    var loader = new THREE.TextureLoader();
    var textureToShow = 0;

    return {
      wireframe: false,
      side: null,
      visible: true,
      color: color,
      items: [
        { value: "0", text: "Font" },
        { value: "1", text: "Back" },
      ],
      loader: loader,
      // The textures to use
      arr: [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg'
      ],
      textureToShow: textureToShow,
    };
  },
  props: {
    material: Object,
    figure: String,
    scene: THREE.Scene,
    cone: THREE.Mesh,
  },
  mounted() {
    this.changeTexture()
  },
  methods: {
    changeWireframe() {
      if (this.wireframe === true) {
        this.material.wireframe = true;
      } else {
        this.material.wireframe = false;
      }
    },
    changeSide() {
      if (this.side === "0") {
        this.material.side = 0;
      } else if (this.side === "1") {
        this.material.side = 1;
      }
    },
    changeVisible() {
      this.visible = !this.visible;

      if (this.visible === true) {
        this.material.visible = true;
      } else {
        this.material.visible = false;
      }
    },
    changeColor() {
      this.color = document.getElementById(`${this.figure}-color`).value;
      this.material.color.set(this.color);
    },
    changeTexture() {

    const texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg');

      //allow cross origin loading
      this.loader.crossOrigin = '';


      // Then load the texture
      this.loader.load(arr[this.textureToShow], function (tex) {
        // Once the texture has loaded
        // Asign it to the material
        this.material.map = tex;
        // Update the next texture to show
        this.textureToShow++;
        // Add the mesh into the scene
        this.scene.add(this.cone);
      });



      // Click interaction
      var canvas = document.getElementsByTagName("canvas")[0];

      this.canvas.addEventListener("click", function () {

        this.loader.load(this.arr[this.textureToShow], function (tex) {
          // Once the texture has loaded
          // Asign it to the material
          this.material.map = tex;
          // Update the next texture to show
          this.textureToShow++;
          // Have we got to the end of the textures array
          if (this.textureToShow > this.arr.length - 1) {
            this.textureToShow = 0;
          }
        });
      });
    }
  },
}
</script>

<style lang="scss">
.div-color {
  width: 70px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 5px;
}

[type="color"] {
  border: 0;
  padding: 0;
  width: 200%;
  height: 200%;
  cursor: pointer;
  transform: translate(-25%, -25%);
}

.color {
  margin: 0 auto;
}

.colorPicker {
  text-align: center;
}

// .v-color-picker__controls {
//   .v-color-picker__preview {
//     display: block;
//     .v-color-picker__dot {
//       margin: 0 auto;
//       margin-bottom: 24px;
//     }
//   }
// }
// .v-color-picker__controls {
//   padding: 0px;
// }
</style>
