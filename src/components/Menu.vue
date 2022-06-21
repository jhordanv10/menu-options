<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-row>
      
      <v-col cols="12" class="mt-2 ml-2">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
      <v-col cols="4" class="mt-2">
        <v-col
          class="option mx-1 my-4 py-0"
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
    <v-col cols="6" class="mt-2">
      Estoy en la propiedad: {{this.getName}} del {{figure}}
    
       <!-- {{inf}} -->

      <span class="colorPicker"><input id="cone-color" type="color" value="#ff0000" onchange="this.changeColor()"/><br/>Color</span>

      {{this.color}}
    </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import * as THREE from "three";
import { Icon } from "@iconify/vue2";

export default {
  props: {
    figure: String,
    inf: Array,
    material: THREE.MeshBasicMaterial,
  },
  data() {
    let getName='';
    let color= '';
    return {
      drawer: true,
      properties: [
        { id: 1, name: "Material", icon: "mdi-palette-swatch" },
        { id: 2, name: "Rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "Position", icon: "mdi-chart-ppf" },
        { id: 4, name: "Scale", icon: "mdi-relative-scale" },
      ],
      getName: getName,
      color: color,
    };
  },
  components: {
    Icon,
  },
  mounted() {
    // this.setMaterial();
  },
  methods: {
    drawer() {
        this.drawer = !this.drawer
    },
    sendData(name){
      this.getName= name;
    },
    changeColor(){
      // var guiControls = new function() {
      //   this.color = material.color.getStyle();
      // }();

      // var gui = new dat.GUI();
      // gui
      //   .addColor(guiControls, "color")
      //   .listen()
      //   .onChange(function(e) {
      //     selected.material.color.setStyle(e);
      //   });


      // const colorInput = document.getElementById( 'cone-color' );
				// colorInput.addEventListener( 'input', function () {
          this.color=document.getElementById("cone-color").value;
					material.color.set(this.color);

				// } );

      
    }
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
</style>
