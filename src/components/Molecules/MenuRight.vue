<template>
  <div color="#fff" class="menuRight pa-0" padless>
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
          v-model="isActive"
          tile
          color="bluedark accent-3"
          group
        >
          <v-btn
            class="rounded-lg"
            v-for="childrens in isMeshGeometry"
            :key="childrens.id"
            @click="selected(childrens)"
            :value="childrens.name"
          >
            {{ childrens.name }}
          </v-btn>
          <v-btn
            class="rounded-lg"
            v-for="childrens in isMeshModel"
            :key="childrens.id"
            @click="selected(childrens)"
            :value="childrens.name"
          >
            {{ childrens.name }}
          </v-btn>
        </v-btn-toggle>

        <!-- Button add mesh -->
        <Dialog
          v-if="this.item === 'Mesh'"
          :scene="scene"
          :isMeshGeometry="isMeshGeometry"
        />
        <!-- ------------------------------------------------- -->
      </v-col>

      <!-- isLigth -->
      <v-col
        cols="12"
        class="px-16 py-12 mx-0 my-0"
        justify="center"
        no-gutters
        v-if="this.item === 'Light'"
      >
        <v-btn-toggle
          class="px-16 py-4"
          v-model="name"
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
        v-if="this.item === 'Camera'"
      >
        <v-btn-toggle
          class="px-16 py-4"
          v-model="name"
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
    children: Array,
    active: String,
  },
  data() {
    let option = {};
    let name =
      JSON.stringify(this.$store.state.childrens) === undefined
        ? ""
        : this.$store.state.childrens.name;

    return {
      item: "Mesh",
      valid: true,
      name: name,
      option: option,
      value: name,
      items: [
        { id: 1, name: "Mesh", icon: "mdi-playlist-check" },
        { id: 2, name: "Light", icon: "mdi-lightbulb-on-80" },
        { id: 3, name: "Camera", icon: "mdi-video-outline" },
      ],
    };
  },
  // created() {
  //   this.$emit("escucharHijo", this.option);
  // },
  methods: {
    selected(children) {
      this.$store.commit("ADD_CHILDREN", children);
      this.$store.commit("ADD_OPTION_BASE1", this.option);
      this.option =
        JSON.stringify(this.$store.state.childrens) === undefined
          ? children
          : this.$store.state.childrens;
      this.$emit("escucharHijo", this.option);
    },
    getItem(name) {
      this.item = name;
      this.$emit("listenChildren", this.item);
    },
  },
  computed: {
    isMeshModel() {
      return this.children
        ? this.children.filter((i) => i.isMesh === true)
        : [];
    },
    isMeshGeometry() {
      return this.scene
        ? this.scene.children.filter((i) => i.isMesh === true)
        : {};
    },
    isLight() {
      return this.scene.children.filter((i) => i.isLight === true);
    },
    isCamera() {
      return this.scene.children.filter((i) => i.isCamera === true);
    },
    isActive: {
      get() {
        return this.active;
      },
      set(value) {
        this.value = value;
      },
    },
  },
};
</script>

<style scoped>
.menuRight {
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
