<template>
  <v-footer color="#fff" class="menuLeft pa-0" padless>
    <v-col cols="12" class="mx-0 my-0" justify="center" no-gutters>
        <v-btn-toggle v-model="text" tile color="bluedark accent-3" group>
          <v-btn
            class="rounded-lg"
            v-for="childrens in optionsInfo"
            :key="childrens.id"
            @click="selected(childrens)"
            :value="childrens.name"
          >
            {{ childrens.name }}
          </v-btn>
        </v-btn-toggle>
    </v-col>
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
      value: "cube",
      text: "cube",
    };
  },
  mounted() {
    console.log(this.scene.children);
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
      return this.scene.children.filter((i) => i.isMesh === true);
    },
  },
};
</script>

<style>
.menuLeft {
  height: 100vh;
}
.v-item-group {
  display: grid;
  aling-items: center;
}

</style>
