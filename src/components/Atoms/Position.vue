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
      v-model.number="position.x"
      v-model="x"
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
      v-model.number="position.y"
      v-model="y"
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
      v-model.number="position.z"
      v-model="z"
      @change="changePosition"
    >
    </v-text-field>
  </v-card-text>
</template>

<script>
export default {
  data() {
    let x = Math.round(this.position.x)
    let y = Math.round(this.position.y)
    let z = Math.round(this.position.z)
    return {
      x:x,
      y:y,
      z:z,
    };
  },
  props: {
    position: Object,
    figure: String,
  },
  methods: {
    changePosition() {
      this.position.set(this.x, this.y, this.z);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
