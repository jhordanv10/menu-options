<template>
  <div>
    <!-- x -->
    <v-container class="mb-8">
      <v-row>
        <label :class="rotationx === true ? 'green--text' : 'red--text'">{{
          rotationx === true ? "Rotation x true" : "Rotation x false"
        }}</label>
      </v-row>
      <v-row>
        <v-switch
          :class="rotationx === true ? 'text--green my-0' : 'text--red my-0'"
          @click="changeRotation('x')"
          v-model="rotationx"
          :color="rotationx === true ? 'green' : 'red'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- y -->
    <v-container class="mb-8">
      <v-row>
        <label :class="rotationy === true ? 'green--text' : 'red--text'">{{
          rotationy === true ? "Rotation x true" : "Rotation x false"
        }}</label>
      </v-row>
      <v-row>
        <v-switch
          :class="rotationy === true ? 'text--green my-0' : 'text--red my-0'"
          @click="changeRotation"
          v-model="rotationy"
          :color="rotationy === true ? 'green' : 'red'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- z -->
    <v-container class="mb-8">
      <v-row>
        <label :class="rotationz === true ? 'green--text' : 'red--text'">{{
          rotationz === true ? "Rotation x true" : "Rotation x false"
        }}</label>
      </v-row>
      <v-row>
        <v-switch
          :class="rotationz === true ? 'text--green my-0' : 'text--red my-0'"
          @click="changeRotation"
          v-model="rotationz"
          :color="rotationz === true ? 'green' : 'red'"
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
    changeRotation() {
      if (this.rotationx) {
        this.rotation.x += 0.01;
      } else {
        this.rotation.x = 0;
      }
      // this.info.rotation.y = 3
      // this.info.rotation.z = 3
    },
  },
};
</script>

<style></style>
