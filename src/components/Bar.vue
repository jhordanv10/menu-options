<template>
  <div>
    <v-app-bar app color="#374957">
      <v-toolbar-title class="px-4">
        <v-img
          @click="pushRoute('/')"
          class="img"
          src="../assets/FreepikLogo1.png"
        ></v-img>
      </v-toolbar-title>
      <v-row justify="center">
        <v-btn
          @click="pushRoute(path)"
          v-for="{ id, path, icon } in routes"
          :key="id"
          text
          grow
        >
          <Icon :icon="icon" class="icon #869fb2--text" />
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-main class="py-0 px-0">
      <!--  -->
    </v-main>
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
        { id: 3, name: "Base 2", path: "/base2", icon: "mdi-cube" },
        { id: 4, name: "Base 3", path: "/base3", icon: "mdi-cone" },
        { id: 5, name: "Base 4", path: "/base4", icon: "mdi-record-circle-outline",
        },
      ],
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
  },
  methods: {
    pushRoute(path) {
      this.$router.push(path).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>

.img {
  width: 30px;
  height: 30px;
  align-items: center;
  cursor: pointer;
}

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
