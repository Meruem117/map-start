<template>
    <div class="page">
        <div class="map-box">
            <div id="b-map" class="map"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { shallowRef } from 'vue'

export default {
    name: 'BMap',
    setup() {
        const map = shallowRef(null)
        return {
            map
        }
    },
    mounted() {
        this.map = new BMapGL.Map('b-map')
        const point = new BMapGL.Point(116.404, 39.915)
        this.map.centerAndZoom(point, 15)
    },
    methods: {

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
