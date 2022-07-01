<template>
  <div class="pt-12">
    <!-- Wireframe -->
    <v-container>
      <v-row class="justify-center">
        <label :class="wireframe === true ? 'green--text' : 'red--text'">{{
            wireframe === true ? "Wireframe true" : "Wireframe false"
        }}</label>
      </v-row>
      <v-row class="justify-center">
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
    <v-container class="pa-0 color" v-if="this.material_info.color">
      <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <span class="colorPicker">Color
            <div class="div-color">
              <input class="color" :id="figure + '-color'" type="color" :value="color" @change="changeColor" />
            </div>
          </span>
        </v-col>
      </v-row>
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

    <!-- Texture -->
    <v-container justify="center">
      <v-row>
        <v-file-input v-model="file_select" :rules="rules" accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" truncate-length="10"></v-file-input>

        <v-btn elevation="2" @click="onUpload">Upload!</v-btn>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import * as THREE from "three";
import axios from 'axios';

export default {

  data() {
    let color = '#007BFF';

    // instantiate a texture loader
    const textureToShow = 0;

    const arr = [
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg'
    ];

    let file_select;

    return {
      wireframe: false,
      side: null,
      visible: true,
      color: color,
      items: [
        { value: "0", text: "Font" },
        { value: "1", text: "Back" },
      ],
      // The textures to use
      arr: arr,
      textureToShow: textureToShow,
      selectedFile: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      file_select: file_select,
    };
  },
  props: {
    material_info: Object,
    figure: String,
    material: Object
  },
  mounted() {
    this.changeTexture()
  },
  methods: {
    changeWireframe() {
      if (this.wireframe === true) {
        this.material_info.wireframe = true;
      } else {
        this.material_info.wireframe = false;
      }
    },
    changeSide() {
      if (this.side === "0") {
        this.material_info.side = 0;
      } else if (this.side === "1") {
        this.material_info.side = 1;
      }
    },
    changeVisible() {
      this.visible = !this.visible;

      if (this.visible === true) {
        this.material_info.visible = true;
      } else {
        this.material_info.visible = false;
      }
    },
    changeColor() {
      this.color = document.getElementById(`${this.figure}-color`).value;
      this.material_info.color.set(this.color);
    },
    changeTexture() {
      // Click interaction
      var canvas = document.getElementsByTagName("canvas")[0];
      var material = this.material;
      var arr = this.arr;
      var textureToShow = this.textureToShow;
      canvas.addEventListener("click", function () {
        //LOAD TEXTURE and on completion apply it on SPHERE
        new THREE.TextureLoader().load(
          arr[textureToShow],
          texture => {
            //Update Texture
            material.map = texture;
            material.needsUpdate = true;
            // Update the next texture to show
            textureToShow++;
            // Have we got to the end of the textures array
            if (textureToShow > arr.length - 1) {
              textureToShow = 0;
            }
          },
          xhr => {
            //Download Progress
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          error => {
            //Error CallBack
            console.log("An error happened" + error);
          }
        );
      });

      this.material = material;
      this.textureToShow = textureToShow;
    },
    onUpload() {
      // upload file
      const formData = new FormData()
      formData.append('myFile', this.file_select, this.file_select.name);
      axios.post('http://localhost:8080/file-upload/', formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.response);
      });

      console.log('file::', formData);
    },
  },
}
</script>

<style lang="scss" scoped>
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

.v-select__slot label {
  left: 50px;
}
</style>
