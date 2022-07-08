<template>
  <v-navigation-drawer v-model="drawer" app>
    <div id="nav" class="nav" ref="one" @mousedown="mousedown"></div>
    <v-row id="menu">
      <v-col cols="12" class="mt-2 ml-2 text-center">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
      <v-col cols="4" class="mt-2">
        <v-col
          class="option mx-3 my-4 py-0"
          v-for="{ id, icon, name } in properties"
          :key="id"
          @click="sendData(name)"
        >
          <v-avatar size="30" class="d-block text-center mx-auto my-1">
            <Icon :icon="icon" class="icon grey--text"> </Icon>
          </v-avatar>
          <p class="title">{{ name }}</p>
        </v-col>
      </v-col>
      <v-col cols="7" class="mt-6">
        <!-- -------------------------------- Principal --------------------------------------->
        <Main v-if="getName === ''" />

        <!-- -------------------------------- Material --------------------------------------->
        <Material
          v-if="getName === 'Material'"
          :material_info="info.material"
          :figure="figure"
          :material="material"
        />

        <!-- -------------------------------- Rotation --------------------------------------->
        <Rotation
          v-if="getName === 'Rotation'"
          :rotation="info.rotation"
          :figure="figure"
        />

        <!-- -------------------------------- Position --------------------------------------->
        <Position
          v-if="getName === 'Position'"
          :position="info.position"
          :figure="figure"
        />

        <!-- -------------------------------- Scale --------------------------------------->
        <Scale
          v-if="getName === 'Scale'"
          :scale="info.scale"
          :figure="figure"
        />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from "@iconify/vue2";
import Main from "../components/Atoms/Main.vue";
import Material from "../components/Atoms/Material.vue";
import Rotation from "../components/Atoms/Rotation.vue";
import Position from "../components/Atoms/Position.vue";
import Scale from "../components/Atoms/Scale.vue";

export default {
  props: {
    figure: String,
    info: Object,
    material: Object,
  },
  data() {
    //Drags
    let prevX = 0;
    let prevY = 0;

    let getName = "";

    return {
      drawer: true,
      getName: getName,
      properties: [
        { id: 1, name: "Material", icon: "mdi-palette-swatch" },
        { id: 2, name: "Rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "Position", icon: "mdi-chart-ppf" },
        { id: 4, name: "Scale", icon: "mdi-relative-scale" },
      ],
      rect: {},
      el: {},
      prevX: prevX,
      prevY: prevY,
    };
  },
  components: {
    Icon,
    Main,
    Material,
    Rotation,
    Position,
    Scale,
  },
  created() {},
  beforeCreate() {},
  methods: {
    sendData(name) {
      this.getName = name;
    },
    mousedown(e) {
      window.addEventListener("mousemove", this.mousemove);
      window.addEventListener("mouseup", this.mouseup);
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    },
    mousemove(e) {
      this.el = document.querySelector(".nav");
      this.rect = this.el.getBoundingClientRect();
      console.log(this.el);
      console.log(this.rect);

      let newX = this.prevX - e.clientX;
      let newY = this.prevY - e.clientY;
      console.log({ newX, newY });
      console.log(this.rect.left);

      document
        .getElementsByClassName("nav")[0]
        .setAttribute(
          "style",
          `left:${this.rect.left - newX}px; top:${this.rect.top - newY}px`
        );
      // this.el.style.left = this.rect.left - newX + "px";
      // this.el.style.top = this.rect.top - newY + "px";
      // console.log(e.clientX);
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    },
    mouseup() {},
  },
  mounted() {
    // console.log(this.info);
  },
};
</script>

<style lang="scss" scoped>
#nav {
  position: absolute;
  cursor: move;
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
#nav {
  cursor: move;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: red;
  z-index: 1000;
}
</style>
