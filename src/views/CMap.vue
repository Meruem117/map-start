<template>
    <div class="page">
        <div class="map-box">
            <div id="c-map" class="map"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { shallowRef } from 'vue'

export default {
    name: 'CMap',
    setup() {
        const map = shallowRef(null)
        const city = {
            name: '常州市',
            center: []
        }
        return {
            map,
            city
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {

        },
    }
}
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;

    .map-box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        .map {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
