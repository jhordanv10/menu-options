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
      <v-btn
        color="bluedark"
        class="ma-auto"
        dark
        fab
        center
        @click="openDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="openDialog" max-width="500px">
        <v-card>
          <v-card-actions>
            <v-btn color="bluedark" text @click="closeDialog" class="btn-close">
              <v-icon>mdi-close </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title class="justify-center"> Agregar </v-card-title>
          <v-form ref="form" class="mx-2" v-model="valid" lazy-validation>
            <v-card-text class="px-16 py-6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
              <v-select
                :items="select"
                class="mt-10"
                v-model="selectedItem"
                label="Selecciona tipo de figura"
                item-value="text"
              >
              </v-select>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn color="primary" text @click="createFigure"> Crear </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-footer>
</template>

<script>
import * as THREE from "three";

export default {
  props: {
    scene: Object,
  },
  data() {
    let option = {};
    return {
      valid: true,
      name: "",
      option: option,
      value: "cube",
      text: "cube",
      openDialog: false,
      select: [{ text: "Circulo" }, { text: "Cono" }, { text: "Cubo" }],
      selectedItem: "Circulo",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 15) || "Name must be less than 15 characters",
        (v) =>
          !this.optionsInfo.filter(function (elem) {
            if (elem.name.toLowerCase() == v.toLowerCase()) return 1;
          }).length || "El nombre ya existe",
      ],
    };
  },
  mounted() {},
  methods: {
    selected(children) {
      this.option = children;
      this.$emit("escucharHijo", this.option);
    },
    createFigure() {
      if (this.$refs.form.validate()) {
        if (this.selectedItem == "Circulo") {
          const geometry = new THREE.SphereGeometry(0.8, 16, 16);
          const material = new THREE.MeshNormalMaterial({
            flatShading: true,
          });
          let sphere = new THREE.Mesh(geometry, material);
          sphere.name = this.name;
          this.scene.add(sphere);
        }
      }
    },
    closeDialog() {
      openDialog = false;
      this.$refs.form.reset();
    },
  },
  computed: {
    optionsInfo() {
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
  aling-items: center;
}

button.ma-auto.v-btn {
  bottom: 53px;
  position: absolute;
  left: 0;
  right: 0;
}

button.btn-close {
  position: absolute;
  right: 0;
  top: 15px;
}

button.v-btn.v-btn--text {
  position: absolute;
  right: 15px;
  bottom: 10px;
}
</style>
