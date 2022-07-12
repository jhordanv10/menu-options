<template>
  <v-app class="app">
    <Bar />
    <v-main class="px-0 py-0">
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
html {
  overflow: hidden;
}

.app {
  height: 100vh;
}

.theme--light.v-bottom-navigation {
  background-color: #395265;
  color: #fff;
}

button.v-btn.v-btn--active.v-btn--text.theme--light.v-size--default {
  background: #263845;
}
</style>
