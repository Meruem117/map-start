<template>
    <div class="page">
        <div class="map-box">
            <div id="c-map" class="map"></div>
        </div>
    </div>
</template>

<script>
import { shallowRef } from '@vue/reactivity'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { accessToken } from '../key'

export default {
    name: 'CMap',
    setup() {
        const viewer = shallowRef(null)
        return {
            viewer,
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            Cesium.Ion.defaultAccessToken = accessToken
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
