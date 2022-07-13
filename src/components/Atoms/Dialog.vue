<template>
  <v-col>
    <v-btn
      color="greencolor"
      class="ma-auto"
      dark
      fab
      center
      @click="openDialog = true"
    >
      <Icon  icon="mdi-plus" class="white--text" width="24" />
    </v-btn>
    <v-dialog v-model="openDialog" max-width="500px">
      <v-card>
        <v-card-actions>
          <v-btn color="bluedark" text @click="closeDialog" class="btn-close">
            <Icon icon="mdi-close" width="24" />
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
          <v-btn color="bluedark" text @click="createFigure"> Crear </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import * as THREE from "three";
import { Icon } from "@iconify/vue2";
export default {
  props: {
    scene: Object,
    isMesh: Array,
  },
  data() {
    return {
      openDialog: false,
      valid: true,
      name: "",
      select: [{ text: "Circulo" }, { text: "Cono" }, { text: "Cubo" }],
      selectedItem: "Circulo",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 15) || "Name must be less than 15 characters",
        (v) =>
          !this.isMesh.filter(function (elem) {
            if (elem.name.toLowerCase() == v.toLowerCase()) return 1;
          }).length || "El nombre ya existe",
      ],
    };
  },
  components: {
    Icon
  },
  methods: {
    createFigure() {
      let maxX = Math.random() * (4 - -3) + -3;
      let maxY = Math.random() * (3 - -3) + -3;
      let maxZ = Math.random() * (1 - -3) + -3;

      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      if (this.$refs.form.validate()) {
        //Sphere
        if (this.selectedItem == "Circulo") {
          const geometry = new THREE.SphereGeometry(0.8, 16, 16);
          const material = new THREE.MeshBasicMaterial({ color: color });
          let sphere = new THREE.Mesh(geometry, material);
          sphere.name = this.name;
          sphere.position.set(maxX, maxY, maxZ);
          this.scene.add(sphere);
        }
        //Cube
        else if (this.selectedItem == "Cubo") {
          const geometry1 = new THREE.BoxBufferGeometry(1, 1, 1);
          const material1 = new THREE.MeshBasicMaterial({ color: color });
          let cube = new THREE.Mesh(geometry1, material1);
          cube.position.set(maxX, maxY, maxZ);
          cube.name = this.name;
          this.scene.add(cube);
        }
        //   Cone
        else if (this.selectedItem == "Cono") {
          const geometry2 = new THREE.ConeGeometry(1.5, 2, 3);
          const material2 = new THREE.MeshBasicMaterial({ color: color });
          let cone = new THREE.Mesh(geometry2, material2);
          cone.position.set(maxX, maxY, maxZ);
          cone.name = this.name;
          this.scene.add(cone);
        }

        this.closeDialog();
      }
    },
    closeDialog() {
      this.openDialog = false;
      this.name = "";
    },
  },
};
</script>

<style scoped>
button.ma-auto.v-btn {
  top: 55px;
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
