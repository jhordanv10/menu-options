<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-row>
        <v-col cols="4" class="mt-16">
          <v-col v-for="{ id, icon, name } in properties" :key="id">
            <v-avatar size="30" class="d-block text-center mx-auto my-1 ">
              <Icon :icon="icon" class="icon grey--text"> </Icon>
            </v-avatar>
            <p class="title">{{ name }}</p >
          </v-col>
        </v-col>
        <v-col cols="8" class="mt-2">
          <h1 class="mt-1">Propiedades</h1>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <Icon icon="mdi-pencil" class="icon grey--text"> </Icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="px-8">
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
          <Icon :icon="icon" class="icon grey--text" />
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
      drawer: false,
      routes: [
        { id: 1, name: "Home", path: "/", icon: "mdi-home" },
        { id: 2, name: "Base 1", path: "/base1", icon: "mdi-sphere" },
        { id: 3, name: "Base 2", path: "/base2", icon: "mdi-cube" },
        { id: 4, name: "Base 3", path: "/base3", icon: "mdi-cone" },
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
.v-application .title {
    font-size: 0.8rem !important;
    font-weight: 500;
    line-height: 1rem; 
    letter-spacing: 0.0125em !important; 
    font-family: "Roboto", sans-serif !important;
    text-align: center;
}

</style>
