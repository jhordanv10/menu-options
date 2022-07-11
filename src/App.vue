<template>
  <v-app class="app">
    <Bar />
    <v-main class="px-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Bar from "./components/Molecules/Bar.vue";
export default {
  name: "App",
  components: {
    Bar,
  },
};
</script>
<style lang="scss">
.app {
  height: 100vh;
  overflow: hidden;
}
</style>
