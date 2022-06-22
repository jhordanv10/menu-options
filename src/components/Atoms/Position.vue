<template>
    <div>
        <v-card>
            <v-card-text>
                <h3>Value X</h3>
                <v-slider v-model="valueX" step="0.1" min="-10" max="10" thumb-label ticks @change="changePosition">
                </v-slider>
                <h3>Value Y</h3>
                <v-slider v-model="valueY" step="0.1" min="-10" max="10" thumb-label ticks @change="changePosition">
                </v-slider>
                <h3>Value Z</h3>
                <v-slider v-model="valueZ" step="0.1" min="-10" max="10" thumb-label ticks @change="changePosition">
                </v-slider>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        let valueX = 0;
        let valueY = 0;
        let valueZ = 0;

        return {
            valueX: valueX,
            valueY: valueY,
            valueZ: valueZ,
        }
    },
    props: {
        position: Object,
        figure: String,
    },
    methods: {
        changePosition() {
            this.position.set(this.valueX, this.valueY, this.valueZ);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
