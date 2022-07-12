<template>
  <v-card-text class="px-16 py-0">
    <!-- Posición x -->
    <h3>Position X</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="-10"
      ref="input"
      v-model.number="number"
      v-model="valueX"
      @change="changePosition"
    >
    </v-text-field>

    <!-- Posición y -->
    <h3>Position Y</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="-10"
      ref="input"
      v-model.number="number"
      v-model="valueY"
      @change="changePosition"
    >
    </v-text-field>

    <!-- Posición z -->
    <h3>Position Z</h3>
    <v-text-field
      class="px-16"
      type="number"
      step="any"
      min="-10"
      ref="input"
      v-model.number="number"
      v-model="valueZ"
      @change="changePosition"
    >
    </v-text-field>
  </v-card-text>
</template>

<script>
export default {
  data() {
    let valueX = this.position.x;
    let valueY = this.position.y;
    let valueZ = this.position.z;

    return {
      valueX: valueX,
      valueY: valueY,
      valueZ: valueZ,
      number: 0,
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
