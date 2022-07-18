<template>
  <div class="px-16 py-0">
    <!-- x -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationx ? 'greencolor--text' : 'redcolor--text'">Rotation x</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationx ? 'text--greencolor my-0' : 'text--redcolor my-0'"
          v-model="rotationx"
          @click="changeRotation(rotationx)"
          :color="rotationx ? 'greencolor' : 'redcolor'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- y -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationy ? 'greencolor--text' : 'redcolor--text'">Rotación y</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationy ? 'text--green my-0' : 'text--red my-0'"
          v-model="rotationy"
          @click="changeRotation(rotationy)"
          :color="rotationy ? 'greencolor' : 'redcolor'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- z -->
    <v-container class="mb-8">
      <v-row class="justify-center">
        <label :class="rotationz ? 'greencolor--text' : 'redcolor--text'">Rotation z</label>
      </v-row>
      <v-row class="justify-center">
        <v-switch
          :class="rotationz ? 'text--greencolor my-0' : 'text--redcolor my-0'"
          v-model="rotationz"
          @click="changeRotation(rotationz)"
          :color="rotationz ? 'greencolor' : 'redcolor'"
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
  },
  mounted() {
    console.log(this.rotation.x);
  },
  data() {

    return {
      rotationx: 0,
      rotationy: 0,
      rotationz: 0,
    };
  },
  methods: {
    changeRotation(rot) {
      if (rot) {
        this.animatex();
        this.animatey();
        this.animatez();
      }
    },

    animatex() {
      if (this.rotationx) {
        this.rotation.x += 0.003;
        requestAnimationFrame(this.animatex);
      }
    },
    animatey() {
      if (this.rotationy) {
        this.rotation.y += 0.003;
        requestAnimationFrame(this.animatey);
      }
    },
    animatez() {
      if (this.rotationz) {
        this.rotation.z += 0.003;
        requestAnimationFrame(this.animatez);
      }
    },
  },
};
</script>

<style>

</style>
