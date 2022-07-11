<template>
  <v-card-text class="px-16 py-0">
    <h3>Scale X</h3>
    <v-slider
      v-model="valueX"
      step="1"
      min="1"
      max="5"
      thumb-label
      ticks
      @change="changeScale"
    ></v-slider>
    <h3>Scale Y</h3>
    <v-slider
      v-model="valueY"
      step="1"
      min="1"
      max="5"
      thumb-label
      ticks
      @change="changeScale"
    ></v-slider>
    <h3>Scale Z</h3>
    <v-slider
      v-model="valueZ"
      step="1"
      min="1"
      max="5"
      thumb-label
      ticks
      @change="changeScale"
    ></v-slider>
  </v-card-text>
</template>

<script>
export default {
  data() {
    let valueX = 1;
    let valueY = 1;
    let valueZ = 1;

    return {
      valueX: valueX,
      valueY: valueY,
      valueZ: valueZ,
    };
  },
  props: {
    scale: Object,
    figure: String,
  },
  methods: {
    changeScale() {
      this.scale.set(this.valueX, this.valueY, this.valueZ);
    },
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
