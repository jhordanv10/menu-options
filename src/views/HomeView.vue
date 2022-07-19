<template>
  <div class="home">
    <v-col>
      <v-row justify="center">
        <figure class="img">
          <img src="../assets/FreepikLogo.png" alt="" />
        </figure>
      </v-row>
      <v-row justify="center">
        <a v-for="{id, path, icon} in links" :key="id" class="text-center icon" :href="path" target="_blank">
          <v-btn class="mx-2" fab dark color="#748DA6">
            <Icon :icon="icon" width="24" dark />
          </v-btn>
        </a>
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
  data() {
    return {
      links: [
        {id:1, icon:"mdi-instagram", path:"https://instagram.com/freepik?igshid=NmZiMzY2Mjc=", },
        {id:2, icon:"mdi-facebook", path:"https://www.facebook.com/Freepik/",},
        {id:3, icon:"mdi-twitter", path:"https://twitter.com/freepik?s=11&t=H90R7yfwCAUw08B4eQCDdg", },
        {id:4, icon:"mdi-linkedin", path:"https://www.linkedin.com/company/freepik-company/", },
      ]
    }
  }
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
a {
  text-decoration: none;
}
</style>
