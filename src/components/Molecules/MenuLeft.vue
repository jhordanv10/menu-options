<template>
  <v-footer color="#fff" class="menuLeft pa-0" padless>
    <v-col cols="12" class="mx-0 my-0" justify="center" no-gutters>
      <v-btn-toggle v-model="text" tile color="bluedark accent-3" group>
        <v-btn
          class="rounded-lg"
          v-for="childrens in optionsInfo"
          :key="childrens.id"
          @click="selected(childrens)"
          :value="childrens.name"
        >
          {{ childrens.name }}
        </v-btn>
      </v-btn-toggle>
      <v-btn
        color="bluedark"
        class="ma-auto"
        dark
        fab
        center
        @click="dialog2 = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title> Dialog 2 </v-card-title>
          <v-card-text>
            <v-btn color="primary" dark @click="dialog3 = !dialog3">
              Open Dialog 3
            </v-btn>
            <v-select
              :items="select"
              label="A Select List"
              item-value="text"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  props: {
    scene: Object,
  },
  data() {
    let option = {};
    return {
      option: option,
      value: "cube",
      text: "cube",
    };
  },
  mounted() {
    console.log(this.scene.children);
  },
  methods: {
    selected(children) {
      this.option = children;
      this.$emit("escucharHijo", this.option);
      // console.log(this.option.material);
    },
  },
  computed: {
    optionsInfo() {
      return this.scene.children.filter((i) => i.isMesh === true);
    },
  },
};
</script>

<style scoped>
.menuLeft {
  height: 100vh;
}

.v-item-group {
  display: grid;
<<<<<<< HEAD
  align-items: center;
=======
  aling-items: center;
}

button.ma-auto.v-btn {
  bottom: 53px;
  position: absolute;
  left: 0;
  right: 0;
>>>>>>> DevelopDaniela
}
</style>
