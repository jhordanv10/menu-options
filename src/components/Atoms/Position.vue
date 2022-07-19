<template>
  <v-card-text class="px-16 py-0">
    <!-- Posición x -->
    <h3 class="text-center">Position X</h3>
    <v-text-field
      class="px-16"
      :color="position.x >= 0 ? 'greencolor' : 'redcolor'"
      type="number"
      step="0.01"
      min="-10"
      v-model="position.x"
      @keypress="changePosition($event)"
    >
    </v-text-field>

    <!-- Posición y -->
    <h3 class="text-center">Position Y</h3>
    <v-text-field
      class="px-16"
      :color="position.y >= 0 ? 'greencolor' : 'redcolor'"
      type="number"
      step="0.01"
      min="-10"
      v-model="position.y"
      @keypress="changePosition($event)"
    >
    </v-text-field>

    <!-- Posición z -->
    <h3 class="text-center">Position Z</h3>
    <v-text-field
      class="px-16"
      :color="position.z >= 0 ? 'greencolor' : 'redcolor'"
      type="number"
      step="0.01"
      min="-10"
      v-model="position.z"
      @keypress="changePosition($event)"
    >
    </v-text-field>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      x: Math.round(this.position.x),
      y: Math.round(this.position.y),
      z: Math.round(this.position.z),
    };
  },
  props: {
    position: Object,
    figure: String,
  },
  methods: {
    changePosition() {
      let char = String.fromCharCode(e.keyCode); 
      if (/^[0-9A-Za-z]+$/.test(char)) {
        this.position.set(this.x, this.y, this.z);
        return true; 
      } else e.preventDefault(); 
    },
    mounted() {
      console.log(this.position);
    },
  },
};
</script>

<style lang="scss" scoped></style>
