<template>
  <v-footer color="#f0f0f0" class="footer" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="childrens in optionsInfo"
        :key="childrens.id"
        color="white"
        text
        rounded
        class="my-2 bluedark--text"
        @click="selected(childrens)"
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
    let option = {};
    return {
      option: option,
    };
  },
  mounted() {
    console.log(this.scene.children)
  },
  methods: {
    selected(children) {
      this.option = children;
      this.$emit("escucharHijo", this.option);
      // console.log(this.option.material);
    },
  },
  computed: {
    optionsInfo() {
      return this.scene.children.filter((i) => i.isMesh === true)
    },
  },
};
</script>

<style>
.footer {
  height: 10vh;
}
</style>
