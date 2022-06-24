<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-row>
      <v-col cols="12" class="mt-2 ml-2 text-center">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
      <v-col cols="4" class="mt-2">
        <v-col
          class="option mx-3 my-4 py-0"
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
      <v-col cols="7" class="mt-6">
        <!-- -------------------------------- Principal --------------------------------------->
        <Main v-if="getName === ''" />

        <!-- -------------------------------- Material --------------------------------------->
        <Material
          v-if="getName === 'Material'"
          :material="info.material"
          :figure="figure"
          :scene="scene" 
          :cone="cone"
          :texture="texture"
        />

        <!-- -------------------------------- Rotation --------------------------------------->
        <Rotation
          v-if="getName === 'Rotation'"
          :rotation="info.rotation"
          :figure="figure"
        />

        <!-- -------------------------------- Position --------------------------------------->
        <Position
          v-if="getName === 'Position'"
          :position="info.position"
          :figure="figure"
        />

        <!-- -------------------------------- Scale --------------------------------------->
        <Scale
          v-if="getName === 'Scale'"
          :scale="info.scale"
          :figure="figure"
        />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from "@iconify/vue2";
import Main from "../components/Atoms/Main.vue";
import Material from "../components/Atoms/Material.vue";
import Rotation from "../components/Atoms/Rotation.vue";
import Position from "../components/Atoms/Position.vue";
import Scale from "../components/Atoms/Scale.vue";
import * as THREE from "three";

export default {
  props: {
    figure: String,
    info: Object,
    scene: Object,
    cone: Object,
    texture: Object,
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
    Main,
    Material,
    Rotation,
    Position,
    Scale,
  },
  methods: {
    sendData(name) {
      this.getName = name;
    },
  },
  mounted() {
    console.log(this.info);
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
