<template>
  <div class="px-16 py-0">
    <!-- Wireframe -->
    <v-container>
      <v-row class="justify-center">
        <label
          :class="
            material_info.wireframe === true
              ? 'greencolor--text'
              : 'redcolor--text'
          "
          >{{
            material_info.wireframe === true
              ? "Wireframe true"
              : "Wireframe false"
          }}</label
        >
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="
            material_info.wireframe === true
              ? 'text--greencolor my-0'
              : 'text--redcolor my-0'
          "
          v-model="material_info.wireframe"
          :color="material_info.wireframe === true ? 'green' : 'red'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- Side -->
    <v-container>
      <v-row>
        <v-col class="d-flex px-16 py-0" cols="12">
          <v-select
            v-model="material_info.side"
            @change="changeSide"
            :items="items"
            :label="material_info.side === 0 ? 'Front' : 'Back'"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- Blending -->
    <v-container>
      <v-row>
        <v-col class="d-flex px-16 py-0" cols="12">
          <v-select
            v-model="material_info.blending"
            @change="changeBlending"
            :items="blendings"
            :label="blendings.text"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- color -->
    <v-container class="pa-0 color" v-if="this.material_info.color">
      <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <span class="colorPicker"
            >Color
            <div class="div-color">
              <input
                class="color"
                :id="figure + '-color'"
                type="color"
                :value="color"
                @change="changeColor"
              />
            </div>
          </span>
        </v-col>
      </v-row>
    </v-container>

    <!-- Visible -->
    <v-container justify="center">
      <v-row>
        <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
          <v-btn
            v-model="material_info.visible"
            @click="changeVisible"
            class="mx-2 mt-6"
            fab
            dark
            :color="material_info.visible === true ? 'redcolor' : 'greencolor'"
          >
            <v-icon dark>
              {{
                material_info.visible === true
                  ? "mdi-eye-off-outline"
                  : "mdi-eye-outline"
              }}</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Texture -->
    <!-- <v-container justify="center">
      <v-row>
        <v-file-input v-model="file_select" :rules="rules" accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" truncate-length="10"></v-file-input>

        <v-btn elevation="2" @click="onUpload">Upload!</v-btn>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import * as THREE from "three";
import axios from "axios";

export default {
  data() {
    let color = "#CCCCCC";

    // instantiate a texture loader
    const textureToShow = 0;

    const arr = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg",
    ];

    let file_select;

    return {
      color: color,
      items: [
        { value: THREE.FrontSide, text: "Front" },
        { value: THREE.BackSide, text: "Back" },
      ],
      // The textures to use
      arr: arr,
      textureToShow: textureToShow,
      selectedFile: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      file_select: file_select,
      blendings : [
					{ text: 'No', value: THREE.NoBlending, },
					{ text: 'Normal', value: THREE.NormalBlending },
					{ text: 'Additive', value: THREE.AdditiveBlending },
					{ text: 'Subtractive', value: THREE.SubtractiveBlending },
					{ text: 'Multiply', value: THREE.MultiplyBlending }
				],
    };
  },
  props: {
    material_info: Object,
    figure: String,
    material: Object,
  },
  mounted() {
    this.changeTexture();
  },
  methods: {
    changeSide() {
        this.material_info.side = items.value;
    },
    changeBlending1() {
        material_info.blending =  blendings.value;
    },
    changeVisible() {
      this.material_info.visible = !this.material_info.visible;
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
          (texture) => {
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
          (xhr) => {
            //Download Progress
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
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
      const formData = new FormData();

      // let self = this;
      // let reader = new FileReader();
      // reader.onload = function (e) {
      //   self.uploadedPhoto = e.target.result;
      // }
      // reader.readAsDataURL(e.target.files[0]);

      formData.append("myFile", this.file_select, this.file_select.name);
      axios
        .post("http://localhost:8080/file-upload/", formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });

      console.log("file::", formData);
    },
  },
};
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
