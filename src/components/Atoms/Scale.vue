<template>
  <v-card-text class="px-16 py-0">
    <!-- Scale x -->
    <h3>Scale X</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="number"
      v-model="valueX"
      @change="changeScale"
    >
    </v-text-field>

    <!-- Scale y -->
    <h3>Scale Y</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="number"
      v-model="valueY"
      @change="changeScale"
    >
    </v-text-field>

    <!-- Scale z -->
    <h3>Scale Z</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="number"
      v-model="valueZ"
      @change="changeScale"
    >
    </v-text-field>
  </v-card-text>
</template>

<script>
export default {
  data() {
    let valueX = this.scale.x;
    let valueY = this.scale.y;
    let valueZ = this.scale.z;
    return {
      valueX: valueX,
      valueY: valueY,
      valueZ: valueZ,
      number: 0,
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
