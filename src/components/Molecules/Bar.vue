<template>
  <div>
    <v-bottom-navigation v-model="value">
      <v-app-bar app color="#374957">
        <v-toolbar-title class="px-4 d-flex justify-center">
          <v-img class="img mx-4" src="../../assets/FreepikLogo1.png"></v-img>
          <v-img class="imgGraphic" src="../../assets/graphicMarket.png"></v-img>
        </v-toolbar-title>
        <v-row justify="center">
          <v-btn
            class="rounded-lg"
            @click="pushRoute(path)"
            v-for="{ id, path, icon } in routes"
            :key="id"
            text
            grow
            :value="path"
          >
            <Icon width="24" :icon="icon" class="icon" />
          </v-btn>
        </v-row>
      </v-app-bar>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  data() {
    return {
      routes: [
        { id: 1, name: "Home", path: "/", icon: "mdi-home" },
        { id: 2, name: "Base 1", path: "/base1", icon: "mdi-sphere" },
        // { id: 3, name: "Base 2", path: "/base2", icon: "mdi-cube" },
        // { id: 4, name: "Base 3", path: "/base3", icon: "mdi-cone" },
        { id: 5, name: "Base 4", path: "/base4", icon: "mdi-record-circle-outline" },
        { id: 6, name: "Pet", path: "/pet", icon: "mdi-plus" },
        { id: 7, name: "Gloves", path: "/gloves", icon: "mdi-mixed-martial-arts" },
        { id: 8, name: "Hoddie", path: "/hoddie", icon: "mdi-hanger" },
        { id: 9, name: "Eyeliner", path: "/eyeliner", icon: "mdi-eye" },
      ],
      properties: [
        { id: 1, name: "Material", icon: "mdi-palette-swatch" },
        { id: 2, name: "Rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "Position", icon: "mdi-chart-ppf" },
        { id: 4, name: "Scale", icon: "mdi-relative-scale" },
      ],
      value: this.$router.currentRoute.path,
    };
  },
  components: {
    Icon,
  },
  methods: {
    pushRoute(path) {
      this.$router.push(path).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  height: 10vh;
}
.img {
  width: 30px;
  height: 30px;
  align-items: center;
}
.imgGraphic {
  width: 30px;
  height: 30px;
  align-items: center;
  opacity: 50%;
}

.icon {
  width: 40px;
  height: 40px;
  color: #869fb2;
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
