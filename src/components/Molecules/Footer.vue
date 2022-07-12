<template>
  <v-footer color="#f0f0f0" class="footer" padless>
    <v-row justify="center"  no-gutters>
      <v-bottom-navigation v-model="value">
        <v-btn
          :value="childrens.name"
          v-for="childrens in optionsInfo"
          :key="childrens.id"
          color="#f0f0f0" 
          size="24"
          class="mx-6 rounded-xl pa-6 bluedark-text"
          @click="selected(childrens)"
        >
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
      value: "cube",
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
