<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-row>
        <v-col cols="3" class="mt-8">
          <v-avatar
            v-for="{ id, icon } in properties"
            :key="id"
            size="30"
            class="d-block text-center mx-auto my-9"
          >
            <Icon :icon="icon" class="icon grey--text"> </Icon>
          </v-avatar>
        </v-col>
        <v-col cols="9" class="mt-2">
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

    <v-main class="py-0">
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
        { id: 1, name: "material", icon: "mdi-palette-swatch" },
        { id: 2, name: "rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "position", icon: "mdi-chart-ppf" },
        { id: 4, name: "scale", icon: "mdi-relative-scale" },
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
</style>
