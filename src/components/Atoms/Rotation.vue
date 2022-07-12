<template>
  <div class="px-16 py-0">
    <!-- x -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationx === true ? 'greencolor--text' : 'redcolor--text'">{{
          rotationx === true ? "Rotation x true" : "Rotation x false"
        }}</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationx === true ? 'text--greencolor my-0' : 'text--redcolor my-0'"
          v-model="rotationx"
          @click="changeRotation(rotationx)"
          :color="rotationx === true ? 'greencolor' : 'redcolor'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- y -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationy === true ? 'greencolor--text' : 'redcolor--text'">{{
          rotationy === true ? "Rotation y true" : "Rotation y false"
        }}</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationy === true ? 'text--green my-0' : 'text--red my-0'"
          v-model="rotationy"
          @click="changeRotation(rotationy)"
          :color="rotationy === true ? 'greencolor' : 'redcolor'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- z -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationz === true ? 'greencolor--text' : 'redcolor--text'">{{
          rotationz === true ? "Rotation z true" : "Rotation z false"
        }}</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationz === true ? 'text--greencolor my-0' : 'text--redcolor my-0'"
          v-model="rotationz"
          @click="changeRotation(rotationz)"
          :color="rotationz === true ? 'greencolor' : 'redcolor'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    rotation: Object,
    figure: String,
  },
  data() {
    return {
      rotationx: false,
      rotationy: false,
      rotationz: false,
    };
  },
  methods: {
    changeRotation(rot) {
      if (rot === true) {
        this.animatex();
        this.animatey();
        this.animatez();
      }
    },

    animatex() {
      if (this.rotationx === true) {
        this.rotation.x += 0.003;
        requestAnimationFrame(this.animatex);
      }
    },
    animatey() {
      if (this.rotationy === true) {
        this.rotation.y += 0.003;
        requestAnimationFrame(this.animatey);
      }
    },
    animatez() {
      if (this.rotationz === true) {
        this.rotation.z += 0.003;
        requestAnimationFrame(this.animatez);
      }
    },
  },
};
</script>

<style>

</style>
