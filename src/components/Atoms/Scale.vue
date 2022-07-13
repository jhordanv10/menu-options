<template>
  <v-card-text class="px-16 py-0">
    <!-- Scale x -->
    <h3 class="text-center">Scale X</h3>
    <v-text-field
      :color="scale.x <= 0 ? 'redcolor' : 'greencolor'"
      class="px-16"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="scale.x"
      v-model="scale.x"
      @change="changeScale"
    >
    </v-text-field>

    <!-- Scale y -->
    <h3 class="text-center">Scale Y</h3>
    <v-text-field
      class="px-16"
      :color="scale.y <= 0 ? 'redcolor' : 'greencolor'"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="scale.y"
      v-model="scale.y"
      @change="changeScale"
    >
    </v-text-field>

    <!-- Scale z -->
    <h3 class="text-center">Scale Z</h3>
    <v-text-field
      class="px-16"
      :color="scale.z <= 0 ? 'redcolor' : 'greencolor'"
      type="number"
      step="any"
      min="0"
      ref="input"
      v-model.number="scale.z"
      v-model="scale.z"
      @change="changeScale"
    >
    </v-text-field>
  </v-card-text>
</template>

<script>
export default {
  data() {
   
    return {
      
    };
  },
  props: {
    scale: Object,
    figure: String,
  },
  methods: {
    changeScale() {
      this.scale.set(this.scale.x, this.scale.y, this.scale.z);
    },
  },
};
</script>

<style>

</style>
