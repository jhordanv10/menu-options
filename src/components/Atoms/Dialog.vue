<template>
  <v-col>
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
          <v-btn
            color="bluecolor"
            text
            @click="openDialog = false"
            class="btn-close"
          >
            <v-icon>mdi-close </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title class="justify-center"> Agregar </v-card-title>
        <v-card-text class="px-16 py-6">
          <v-text-field
            v-model="name"
            label="Nombre"
            :rules="rules.required"
            hide-details="auto"
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
        <v-card-actions>
          <v-btn color="primary" text @click="createFigure"> Crear </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import * as THREE from "three";
export default {
  props: {
    scene: Object,
  },
  data() {
    return {
      openDialog: false,
      select: [{ text: "Circulo" }, { text: "Cono" }, { text: "Cubo" }],
      selectedItem: "Circulo",
      name: "",
      rules: [
        (value) => !!value || "Required.",
        (value) =>
          this.scene.children.name.filter((i) => i == this.name) ||
          "El nombre ya existe",
      ],
    };
  },
  methods: {
    createFigure() {
      this.openDialog = false;
      let maxX = Math.random() * (4 - -3) + -3;
      let maxY = Math.random() * (3 - -3) + -3;
      let maxZ = Math.random() * (1 - -3) + -3;

      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

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
    },
  },
};
</script>

<style scoped>
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
