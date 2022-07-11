<template>
  <div id="nav" class="nav" ref="one" @mousedown="mousedown">
    <v-row id="menu">
      <v-col cols="12" class="mt-2 ml-2 text-center">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
      <v-col cols="4" class="mt-2">
        <v-col class="option mx-3 my-4 py-0" v-for="{ id, icon, name } in properties" :key="id" @click="sendData(name)">
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
        <Material v-if="getName === 'Material'" :material_info="info.material" :figure="figure" :material="material" />

        <!-- -------------------------------- Rotation --------------------------------------->
        <Rotation v-if="getName === 'Rotation'" :rotation="info.rotation" :figure="figure" />

        <!-- -------------------------------- Position --------------------------------------->
        <Position v-if="getName === 'Position'" :position="info.position" :figure="figure" />

        <!-- -------------------------------- Scale --------------------------------------->
        <Scale v-if="getName === 'Scale'" :scale="info.scale" :figure="figure" />
      </v-col>
      <button @click="infor()">Hoal</button>
    </v-row>
  </div>
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
    scene: Object,
  },
  data() {
    //Drags
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

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
      pos1: pos1,
      pos2: pos2,
      pos3: pos3,
      pos4: pos4,
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
  created() { },
  beforeCreate() { },
  methods: {
    sendData(name) {
      this.getName = name;
    },
    mousedown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      document.onmouseup = this.mouseup;
      // call a function whenever the cursor moves:
      document.onmousemove = this.mousemove;

      window.addEventListener("mousemove", this.mousemove);
      window.addEventListener("mouseup", this.mouseup);

    },
    mousemove(e) {
      this.el = document.getElementById("nav");
      this.rect = this.el.getBoundingClientRect();

      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      // set the element's new position:
      this.el.style.top = (this.el.offsetTop - this.pos2) + "px";
      this.el.style.left = (this.el.offsetLeft - this.pos1) + "px";
    },
    mouseup() {
      window.removeEventListener('mousemove', this.mousemove);
      window.removeEventListener('mouseup', this.mouseup);
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    },
    infor() {
      console.log(this.scene);
    }
  },
  mounted() {
    console.log(this.info);
  },
};
</script>

<style lang="scss" scoped>
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
  position: absolute;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  padding: 10px;
  cursor: move;
  z-index: 10;
}
</style>
