<template>
  <v-footer color="#f0f0f0" class="footer" padless>
    <v-row justify="center" no-gutters>
      <v-btn-toggle  v-model="text" tile color="bluedark accent-3" group>
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
      value: "cube",
      text: 'cube',
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
.footer {
  height: 10vh;
}

.v-bottom-navigation.v-item-group.theme--light {
  background: #f0f0f0;
  height: auto;
  border: none;
}
.v-item-group.v-bottom-navigation {
  box-shadow: none;
}
</style>
