<template>
  <v-card-text class="px-16 py-0">
    <h3>Position X</h3>
    <v-slider
      class="slider"
      v-model="valueX"
      step="0.1"
      min="-10"
      max="10"
      thumb-label
      ticks
      @change="changePosition"
    >
    </v-slider>
    <h3>Position Y</h3>
    <v-slider
      v-model="valueY"
      step="0.1"
      min="-10"
      max="10"
      thumb-label
      ticks
      @change="changePosition"
    >
    </v-slider>
    <h3>Position Z</h3>
    <v-slider
      v-model="valueZ"
      step="0.1"
      min="-10"
      max="10"
      thumb-label
      ticks
      @change="changePosition"
    >
    </v-slider>
  </v-card-text>
</template>

<script>
export default {
  data() {
    let valueX = 0;
    let valueY = 0;
    let valueZ = 0;

    return {
      valueX: valueX,
      valueY: valueY,
      valueZ: valueZ,
    };
  },
  props: {
    position: Object,
    figure: String,
  },
  methods: {
    changePosition() {
      this.position.set(this.valueX, this.valueY, this.valueZ);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
