<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-row>
      <v-col cols="4" class="mt-16">
        <v-col
          class="option mx-1 my-4 py-0"
          v-for="{ id, icon, name } in properties"
          :key="id"
        >
          <v-avatar size="30" class="d-block text-center mx-auto my-1">
            <Icon :icon="icon" class="icon grey--text"> </Icon>
          </v-avatar>
          <p class="title">{{ name }}</p>
        </v-col>
      </v-col>
      <v-col cols="8" class="mt-2">
        <h1 class="mt-1">Propiedades</h1>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  data() {
    return {
      drawer: true,
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
  mounted() {},
  methods: {
    drawer() {
        this.drawer = !this.drawer
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
