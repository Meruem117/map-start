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
        const city = {
            name: '常州市',
            center: new BMapGL.Point(119.64489, 31.629129)
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
            this.map = new BMapGL.Map('b-map')
            this.map.centerAndZoom(this.city.center, 11)
            this.map.enableScrollWheelZoom(true)
            this.map.setMapStyleV2({
                styleId: '073b242e4be0bc629bf89b95f6870c3c'
            })
            this.initPolygon(this.city.name)
        },
        initPolygon(city) {
            let that = this
            let boundary = new BMapGL.Boundary()
            boundary.get(city, function (res) {
                that.map.clearOverlays()
                res.boundaries.forEach(item => {
                    let points = item.split(';')
                    let bPoints = points.map(item2 => {
                        let loc = item2.split(',')
                        return new BMapGL.Point(parseFloat(loc[0]), parseFloat(loc[1]))
                    })
                    let polygon = new BMapGL.Polygon(bPoints, {
                        fillColor: '#024d6e',
                        strokeColor: '#adfbfd',
                        strokeWeight: 2,
                        strokeOpacity: 0.5
                    })
                    that.map.addOverlay(polygon)
                })
            });
        }
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
