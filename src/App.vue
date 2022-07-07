<template>
  <v-app>
    <Bar />
    <v-main class="px-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Bar from "./components/Bar.vue";
export default {
  name: "App",
  components: {
    Bar,
  },
};
</script>
<style lang="scss">

</style>
