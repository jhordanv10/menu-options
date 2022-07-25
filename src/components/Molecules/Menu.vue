<template>
  <div id="nav" class="nav rounded-lg" ref="one" @mousedown="mousedown">
    <v-row id="menu" class="py-6 px-4">
      <!-- Options -->
      <v-col cols="12" class="pt-2 pb-8 px-0 d-flex justify-center">
        <v-btn-toggle v-model="text" tile color="bluecolor accent-3" group>
          <v-btn
            class="rounded-lg px-2  mx-0"
            v-for="{ id, name } in properties"
            :key="id"
            @click="sendData(name)"
          >
            {{ name }}
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="12" class="pa-0">
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
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import Main from "../Atoms/Main.vue";
import Material from "../Atoms/Material.vue";
import Rotation from "../Atoms/Rotation.vue";
import Position from "../Atoms/Position.vue";
import Scale from "../Atoms/Scale.vue";

export default {
  props: {
    figure: String,
    info: Object,
    material: Object,
    scene: Object,
  },
  data() {
    //Drags
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

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
      text: 'Material',
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
      this.el.style.top = this.el.offsetTop - this.pos2 + "px";
      this.el.style.left = this.el.offsetLeft - this.pos1 + "px";
    },
    mouseup() {
      window.removeEventListener("mousemove", this.mousemove);
      window.removeEventListener("mouseup", this.mouseup);
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
  mounted() {
    console.log('info::', this.info);
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
}
#nav {
  position: absolute;
  top: 1.5%;
  left:0.5%;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  z-index: 10;
  width: 400px;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
