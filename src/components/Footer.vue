<template>
  <v-footer color="primary lighten-1" padless>
    <v-row
      justify="center"
      no-gutters 
    >
      <v-btn
        v-for="childrens in this.scene.children"
        :key="childrens.id"
        color="white"
        text
        rounded
        class="my-2"
        @click="$emit('increaseBy', 1)"
      >
        {{ childrens.name }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: {
    scene: Object,
  },
  data() {
    let option = {}
    return {
        option: option
    }
  },
  mounted() {
    console.log(this.scene.children);
  },
  methods: {
    // selected(children) {
    //     this.option = children.material
    //     console.log(children.material);
    //     this.$emit('object', this.option)
    // },
  }
};
</script>

<style></style>
