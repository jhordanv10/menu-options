<template>
  <div class="home">
    <!-- <Loading /> -->
    <v-col ref="home">
      <v-row justify="center">
        <figure class="img">
          <img src="../assets/FreepikLogo.png" alt="" />
        </figure>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-parallax
            class="paralax"
            src="https://www.calamoycran.com/sites/default/files/images/edicion-de-video.jpg"
          >
            <!-- <v-row align="top" class="px-4 py-16" justify="center">
              <v-col class="text-rigth" cols="12">
                <h1 class="text-h4 font-weight-thin mb-4 black--text" >Graphic Market</h1>
                <h4 class="subheading black--text">Build your application today!</h4>
              </v-col>
            </v-row> -->
          </v-parallax>
        </v-col>
      </v-row>
      <v-row justify="center">
        <a
          v-for="{ id, path, icon } in links"
          :key="id"
          class="text-center icon"
          :href="path"
          target="_blank"
        >
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
import Loading from '../components/Atoms/Loafing.vue'

export default {
  name: "Home",
  components: {
    Icon,
    Loading,
  },
  data() {
    return {
      links: [
        {
          id: 1,
          icon: "mdi-instagram",
          path: "https://instagram.com/freepik?igshid=NmZiMzY2Mjc=",
        },
        {
          id: 2,
          icon: "mdi-facebook",
          path: "https://www.facebook.com/Freepik/",
        },
        {
          id: 3,
          icon: "mdi-twitter",
          path: "https://twitter.com/freepik?s=11&t=H90R7yfwCAUw08B4eQCDdg",
        },
        {
          id: 4,
          icon: "mdi-linkedin",
          path: "https://www.linkedin.com/company/freepik-company/",
        },
      ],
    };
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
    margin-top: -95px;
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
.paralax {
  margin: -110px 300px 0px 300px;
  border-radius: 30px;
  opacity: 80%;
}
</style>
