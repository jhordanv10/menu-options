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

    <!-- Side /Blending -->
    <v-container>
      <v-row>
        <!-- Side -->
        <v-col class="d-flex pa-4" cols="6">
          <v-select
            v-model="material_info.side"
            @change="changeSide"
            :items="items"
            :label="!!items ? 'Side' : items.text"
          ></v-select>
        </v-col>
        <!-- Blending -->
        <v-col class="d-flex pa-4" cols="6">
          <v-select
            v-model="material_info.blending"
            @change="changeBlending"
            :items="blendings"
            :label="!!blendings ? 'Blending' : blendings.text"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- Equations -->
    <v-container>
      <v-row>
        <!-- Src -->
        <v-col class="d-flex px-4 py-0" cols="6">
          <v-select
            :disabled="disabled"
            v-model="material_info.blendSrc"
            @change="changeSrc"
            :items="src"
            :label="!!src ? 'Src' : src.text"
          ></v-select>
        </v-col>
        <!-- Dts -->
        <v-col class="d-flex px-4 py-0" cols="6">
          <v-select
            :disabled="disabled"
            v-model="material_info.blendDst"
            @change="changeDts"
            :items="dts"
            :label="!!dts ? 'Dts' : dts.text"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- color -->
    <v-container class="color" v-if="this.material_info.color">
      <v-row>
        <v-col class="d-flex px-4 py-0" cols="6">
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
        <!-- Texture -->
        <v-col class="d-flex px-4 py-0" cols="6">
          <v-select
            v-model="textureSelected"
            @change="changeTexture"
            :items="this.arr"
            :label="!!this.arr ? 'Texture' : this.arr.text"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- Visible -->
    <v-container justify="center">
      <v-row>
        <v-col class="d-flex py-0 px-0 mx-0 justify-center" cols="12">
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
  props: {
    material_info: Object,
    figure: String,
    material: Object,
  },
  data() {
    let color = "#CCCCCC";

    // instantiate a texture loader
    const textureToShow = 0;

    const arr = [
      {value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_gates.jpg", text: "Img 1"},
      {value: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate1.jpg", text: "Img 2"},
      {value:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/THREE_crate2.jpg", text: "Img 3"},
    ];

    let file_select;

    return {
      color: color,
      items: [
        { value: THREE.FrontSide, text: "Front" },
        { value: THREE.BackSide, text: "Back" },
        { value: THREE.DoubleSide, text: "Double" },
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
      blendings: [
        { text: "No", value: THREE.NoBlending },
        { text: "Normal", value: THREE.NormalBlending },
        { text: "Additive", value: THREE.AdditiveBlending },
        { text: "Subtractive", value: THREE.SubtractiveBlending },
        { text: "Multiply", value: THREE.MultiplyBlending },
        { text: "Custom", value: THREE.CustomBlending },
      ],
      src: [
        { text: "Zero", value: THREE.ZeroFactor },
        { text: "One", value: THREE.OneFactor },
        { text: "SrcColor", value: THREE.SrcColorFactor },
        { text: "OneMinusSrcColor", value: THREE.OneMinusSrcColorFactor },
        { text: "SrcAlpha", value: THREE.SrcAlphaFactor },
        { text: "OneMinusSrcAlpha", value: THREE.OneMinusSrcAlphaFactor },
        { text: "DstAlpha", value: THREE.DstAlphaFactor },
        { text: "OneMinusDstAlpha", value: THREE.OneMinusDstAlphaFactor },
        { text: "DstColor", value: THREE.DstColorFactor },
        { text: "OneMinusDstColor", value: THREE.OneMinusDstColorFactor },
        { text: "SrcAlphaSaturate", value: THREE.SrcAlphaSaturateFactor },
      ],
      dts: [
        { text: "Zero", value: THREE.ZeroFactor },
        { text: "One", value: THREE.OneFactor },
        { text: "SrcColor", value: THREE.SrcColorFactor },
        { text: "OneMinusSrcColor", value: THREE.OneMinusSrcColorFactor },
        { text: "SrcAlpha", value: THREE.SrcAlphaFactor },
        { text: "OneMinusSrcAlpha", value: THREE.OneMinusSrcAlphaFactor },
        { text: "DstAlpha", value: THREE.DstAlphaFactor },
        { text: "OneMinusDstAlpha", value: THREE.OneMinusDstAlphaFactor },
        { text: "DstColor", value: THREE.DstColorFactor },
        { text: "OneMinusDstColor", value: THREE.OneMinusDstColorFactor },
      ],
    };
  },
  methods: {
    changeSide() {
      this.items.value = this.material_info.side;
    },
    changeBlending() {
      this.blendings.value = this.material_info.blending;
    },
    changeSrc() {
      this.material_info.blendEquation = THREE.AddEquation;
      this.src.value = this.material_info.blendSrc;
    },
    changeDts() {
      this.material_info.blendEquation = THREE.AddEquation;
      this.dts.value = this.material_info.blendDst;
    },
    changeVisible() {
      this.material_info.visible = !this.material_info.visible;
    },
    changeColor() {
      this.color = document.getElementById(`${this.figure}-color`).value;
      this.material_info.color.set(this.color);
    },
    changeTexture() {

      //LOAD TEXTURE and on completion apply it on SPHERE
      new THREE.TextureLoader().load(
        this.textureSelected,
        (texture) => {
          //Update Texture
          this.material_info.map = texture;
          this.material_info.needsUpdate = true;
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
  computed: {
    disabled() {
      return this.material_info.blending !== THREE.CustomBlending;
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
