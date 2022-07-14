<template>
  <v-footer color="#fff" class="menuLeft pa-0" padless>
    <!-- Meshes -->
    <v-col cols="12" class="px-8 mx-0 my-0" justify="center" no-gutters>
      <v-btn-toggle
        class="px-16 py-4"
        v-model="text"
        tile
        color="bluedark accent-3"
        group
      >
        <v-btn
          class="rounded-lg"
          v-for="childrens in isMesh"
          :key="childrens.id"
          @click="selected(childrens)"
          :value="childrens.name"
        >
          {{ childrens.name }}
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <!-- Add Mesh -->
    <Dialog :scene="scene" :isMesh="isMesh" />

    <!-- Isnot Mesh -->
    
  </v-footer>
</template>

<script>
import Dialog from "../Atoms/Dialog.vue";

export default {
  components: {
    Dialog,
  },
  props: {
    scene: Object,
  },
  data() {
    let option = {};
    let name = JSON.stringify(this.$store.state.childrens) === undefined  ? 'cube' :this.$store.state.childrens.name;
    return {
      valid: true,
      name: "",
      option: option,
      value: name,
      text: name,
    };
  },
  mounted() {},
  methods: {
    selected(children) {
      this.$store.commit("ADD_CHILDREN", children);
      this.option = JSON.stringify(this.$store.state.childrens) === undefined  ?  children : this.$store.state.childrens;
      this.$emit("escucharHijo", this.option);
    },
  },
  computed: {
    isMesh() {
      return this.scene.children.filter((i) => i.isMesh === true);
    },
  },
};
</script>

<style scoped>
.menuLeft {
  height: 100vh;
}

.v-item-group {
  display: grid;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
}
</style>
