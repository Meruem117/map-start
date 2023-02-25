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
        const centerPoint = new BMapGL.Point(119.979759, 31.792228)
        return {
            map,
            centerPoint
        }
    },
    mounted() {
        this.map = new BMapGL.Map('b-map')
        this.map.centerAndZoom(this.centerPoint, 15)
        this.map.enableScrollWheelZoom(true)
        this.map.setMapStyleV2({
            styleId: '073b242e4be0bc629bf89b95f6870c3c'
        })
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
