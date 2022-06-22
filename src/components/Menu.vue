<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-row>
      <v-col cols="12" class="mt-2 ml-2 text-center">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
      <v-col cols="4" class="mt-2">
        <v-col
          class="option mx-1 my-4 py-0"
          v-for="{ id, icon, name } in properties"
          :key="id"
          @click="sendData(name)"
        >
          <v-avatar size="30" class="d-block text-center mx-auto my-1">
            <Icon :icon="icon" class="icon grey--text"> </Icon>
          </v-avatar>
          <p class="title">{{ name }}</p>
        </v-col>
      </v-col>
      <v-col cols="6" class="mt-6">
        <!-- Estoy en la propiedad: {{ getName }} del {{ figure }} -->

        <!-- -------------------------------- Principal --------------------------------------->
        <div v-if="getName === ''">
          <h1>Principal</h1>
        </div>

        <Material v-if="getName === 'Material'" :info="info" :figure="figure" />



        <!-- -------------------------------- Rotation --------------------------------------->
        <div v-if="getName === 'Rotation'">
          <h1>Rotation</h1>
        </div>

        <!-- -------------------------------- Position --------------------------------------->
        <div v-if="getName === 'Position'">
          <h1>Position</h1>
        </div>

        <!-- -------------------------------- Scale --------------------------------------->
        <div v-if="getName === 'Scale'">
          <h1>Scale</h1>
        </div>


      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import * as THREE from "three";
import { Icon } from "@iconify/vue2";
import Material from "../components/Atoms/Material.vue"

export default {
  props: {
    figure: String,
    info: Object,
  },
  data() {
    let getName = "";
    return {
      drawer: true,
      getName: getName,
      properties: [
        { id: 1, name: "Material", icon: "mdi-palette-swatch" },
        { id: 2, name: "Rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "Position", icon: "mdi-chart-ppf" },
        { id: 4, name: "Scale", icon: "mdi-relative-scale" },
      ],
      
    };
  },
  components: {
    Icon,
    Material,
  },
  methods: {
    sendData(name) {
      this.getName = name;
    },
  },
  mounted() {
    console.log(this.info.material);
  },

};
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
}
.v-application {
  .title {
    font-size: 0.8rem !important;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0.0125em !important;
    font-family: "Roboto", sans-serif !important;
    text-align: center;
  }
}

.option {
  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.8s all ease;

  &:hover {
    transform: scale(1.05);
    background: #efefef;
  }
}
</style>
