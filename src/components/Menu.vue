<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-row>
      <v-col cols="12" class="mt-2 ml-2 text-center">
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
      <v-col cols="6" class="mt-6">
        <!-- Estoy en la propiedad: {{ getName }} del {{ figure }} -->

        <!-- Material -->
        <div>
          <!-- Wireframe -->
          <v-container>
            <v-row>
              <label
                :class="wireframe === true ? 'green--text' : 'red--text'"
                >{{
                  wireframe === true ? "Wireframe true" : "Wireframe false"
                }}</label
              >
            </v-row>
            <v-row>
              <v-switch
                :class="
                  wireframe === true ? 'text--green my-0' : 'text--red my-0'
                "
                @click="changeWireframe"
                v-model="wireframe"
                :color="wireframe === true ? 'green' : 'red'"
                hide-details
              ></v-switch>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col class="d-flex px-0" cols="12">
                <v-select
                  v-model="side"
                  @change="changeSide"
                  :items="items"
                  label="Side"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-container justify="center">
            <v-row>
              <v-col class="d-flex px-0 mx-0 justify-center" cols="12">
                <v-btn
                  v-model="visible"
                  @click="changeVisible"
                  class="mx-2"
                  fab
                  dark
                  :color="visible === true ? 'red' : 'green'"
                >
                  <v-icon dark>
                    {{
                      visible === true
                        ? "mdi-eye-off-outline"
                        : "mdi-eye-outline"
                    }}</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  props: {
    figure: String,
    info: Object,
  },
  data() {
    let getName = "";
    return {
      drawer: true,
      getName: getName,
      wireframe: false,
      side: null,
      visible: true,
      items: [
        { value: "0", text: "Font" },
        { value: "1", text: "Back" },
      ],
      properties: [
        { id: 1, name: "Material", icon: "mdi-palette-swatch" },
        { id: 2, name: "Rotation", icon: "mdi-rotate-3d-variant" },
        { id: 3, name: "Position", icon: "mdi-chart-ppf" },
        { id: 4, name: "Scale", icon: "mdi-relative-scale" },
      ],
    };
  },
  components: {
    Icon,
  },
  mounted() {
    // this.changeWireframe();
    // this.changeSide();
    // this.changeVisible();
    console.log(this.info.material);
  },

  methods: {
    sendData(name) {
      this.getName = name;
      console.log(this.getName);
    },

    changeWireframe() {
      if (this.wireframe === true) {
        this.info.material.wireframe = true;
      } else {
        this.info.material.wireframe = false;
      }
    },
    changeSide() {
      if (this.side === "0") {
        this.info.material.side = 0;
      } else if (this.side === "1") {
        this.info.material.side = 1;
      }
    },
    changeVisible() {
      this.visible = !this.visible;

      if (this.visible === true) {
        this.info.material.visible = true;
      } else {
        this.info.material.visible = false;
      }
    },
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
