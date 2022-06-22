<template>
  <!-- -------------------------------- Material --------------------------------------->
  <div >
    <!-- color -->
    <v-container v-if="this.info.material.color">

      <span class="colorPicker"
        ><input
          :id="figure + '-color'"
          type="color"
          value="#ff0000"
          @change="changeColor"
        /><br />Color</span
      >
    </v-container>

    <!-- Wireframe -->
    <v-container>
      <v-row>
        <label :class="wireframe === true ? 'green--text' : 'red--text'">{{
          wireframe === true ? "Wireframe true" : "Wireframe false"
        }}</label>
      </v-row>
      <v-row>
        <v-switch
          :class="wireframe === true ? 'text--green my-0' : 'text--red my-0'"
          @click="changeWireframe"
          v-model="wireframe"
          :color="wireframe === true ? 'green' : 'red'"
          hide-details
        ></v-switch>
      </v-row>
    </v-container>

    <!-- Side -->
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

    <!-- Visible -->
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
                visible === true ? "mdi-eye-off-outline" : "mdi-eye-outline"
              }}</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    let color = "";
    return {
      
      wireframe: false,
      side: null,
      visible: true,
      color: color,
      items: [
        { value: "0", text: "Font" },
        { value: "1", text: "Back" },
      ],
    };
  },
  props: {
    info: Object,
    figure: String,
  },
  methods: {
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
    changeColor() {
      this.color = document.getElementById(`${this.figure}-color`).value;
      this.info.material.color.set(this.color);
    },
  },
};
</script>

<style>
.color {
    display: block;
}
</style>
