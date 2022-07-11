<template>
  <div class="home">
    <div class="progressive">
      <v-row justify="center">
        <img class="img" src="../assets/FreepikLogo.png" alt="" />
      </v-row>
      <v-row justify="center">
        <Icon color="#4881cb" class="icon" icon="mdi-rotate-3d" />
      </v-row>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: "Home",
   components: {
    Icon
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
  display: flex;
  justify-content: center;

  img {
    width: 300px;
    height: 300px;
  }
  
  .icon {
    margin-top: -70px;
    width: 50px;
    height: 50px;
  }
}
</style>
