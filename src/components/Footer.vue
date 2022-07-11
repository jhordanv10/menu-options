<template>
  <v-footer color="#374957" padless>
    <v-row justify="center" no-gutters>
      <v-bottom-navigation v-model="value">
        <v-btn v-for="childrens in optionsInfo" :key="childrens.id" color="white" text rounded :value="childrens.name"
          @click="selected(childrens)">
          {{ childrens.name }}
        </v-btn>
      </v-bottom-navigation>
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
      value: 'cube',
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

button.v-btn.v-btn--rounded.v-btn--text.theme--light.v-size--default.white--text {
    height: auto;
}

button.v-btn.v-btn--active.v-btn--rounded.v-btn--text.theme--light.v-size--default.white--text {
    background: #395265;
    height: auto;
}

.v-bottom-navigation.v-item-group.theme--light {
  background: #ccc;
  height: auto;
}
</style>
