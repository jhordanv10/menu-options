<template>
  <div class="home">
    <v-col>
      <v-row justify="center">
        <figure class="img">
          <img src="../assets/FreepikLogo.png" alt="" />
        </figure>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "Home",
  components: {
    Icon,
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
  margin-right: 0px;
  margin-left: 0px;

  .img {
    width: 300px;
    height: 300px;

    img {
      width: inherit;
      height: inherit;
    }
  }
}
</style>
