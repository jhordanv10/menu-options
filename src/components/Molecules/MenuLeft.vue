<template>
  <div color="#fff" class="menuLeft pa-0" padless>
    <v-main class="pt-6">
      <v-tabs class="tab" color="bluecolor">
        <v-tab
          v-for="{ id, icon, name } in items"
          :key="id"
          @click="getItem(name)"
        >
          <Icon :icon="icon" class="bluecolor--text" width="24" />
        </v-tab>
      </v-tabs>

      <!-- Button add mesh -->
      <Dialog v-if="this.item === 'Mesh'" :scene="scene" :isMesh="isMesh" />

      <!-- ------------------------------------------------- -->
      <!-- Meshes -->
      <v-col
        cols="12"
        class="px-16 py-12 mx-0 my-0"
        justify="center"
        no-gutters
        v-if="this.item === 'Mesh'"
      >
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

      <!-- Ligth -->
      <v-col
        cols="12"
        class="px-16 py-12 mx-0 my-0"
        justify="center"
        no-gutters
        v-if="this.item === 'Light'"
      >
        <v-btn-toggle
          class="px-16 py-4"
          v-model="text"
          tile
          color="bluedark accent-3"
          group
        >
          <v-btn
            class="rounded-lg"
            v-for="childrens in isLight"
            :key="childrens.id"
            @click="selected(childrens)"
            :value="childrens.name"
          >
            {{ childrens.name }}
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <!-- isCamera -->
      <v-col
        cols="12"
        class="px-16 py-12 mx-0 my-0"
        justify="center"
        no-gutters
        v-if="this.item ==='Camera'"
      >
        <v-btn-toggle
          class="px-16 py-4"
          v-model="text"
          tile
          color="bluedark accent-3"
          group
        >
          <v-btn
            class="rounded-lg"
            v-for="childrens in isCamera"
            :key="childrens.id"
            @click="selected(childrens)"
            :value="childrens.name"
          >
            {{ childrens.name }}
          </v-btn>
        </v-btn-toggle>
      </v-col>

    </v-main>
  </div>
</template>

<script>
import Dialog from "../Atoms/Dialog.vue";
import { Icon } from "@iconify/vue2";

export default {
  components: {
    Dialog,
    Icon,
  },
  props: {
    scene: Object,
  },
  data() {
    let option = {};
    let name = JSON.stringify(this.$store.state.childrens) === undefined  ? 'cube' :this.$store.state.childrens.name;
    return {
      item: "Mesh",
      valid: true,
      name: "",
      option: option,
      value: name,
      text: name,
       items: [
        { id: 1, name: "Mesh", icon: "mdi-playlist-check" },
        { id: 2, name: "Light", icon: "mdi-lightbulb-on-80" },
        { id: 3, name: "Camera", icon: "mdi-video-outline" },
      ],
    };
  },
  mounted() {
    console.log(this.scene.children);
  },
  methods: {
    selected(children) {
      this.$store.commit("ADD_CHILDREN", children);
      this.option = JSON.stringify(this.$store.state.childrens) === undefined  ?  children : this.$store.state.childrens;
      this.$emit("escucharHijo", this.option);
    },
    getItem(name) {
      this.item = name;
      this.$emit("listenChildren", this.item);
    },
  },
  computed: {
    isMesh() {
      return this.scene.children.filter((i) => i.isMesh === true);
    },
    isLight() {
      return this.scene.children.filter((i) => i.isLight === true);
    },
    isCamera() {
      return this.scene.children.filter((i) => i.isCamera === true);
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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #fff;
  border-radius: 10px;
}
.tab {
  display: flex;
  justify-content: center;
}
</style>
