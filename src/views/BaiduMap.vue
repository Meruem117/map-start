<template>
    <div class="page">
        <div class="map-box">
            <div class="map" :id="id"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
    name: 'BaiduMap',
    data() {
        return {
            id: 'b-map',
            map: null,
            city: {
                name: '常州市',
                zoom: 11,
                center: new BMapGL.Point(119.64489, 31.629129)
            }
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            this.map = new BMapGL.Map(this.id)
            this.map.centerAndZoom(this.city.center, this.city.zoom)
            this.map.enableScrollWheelZoom(true)
            // this.map.setMapStyleV2({
            //     styleId: '073b242e4be0bc629bf89b95f6870c3c'
            // })
            this.initPolygon(this.city.name)
            this.initMarker(this.city.center)
        },

        initPolygon(city) {
            let that = this
            let boundary = new BMapGL.Boundary()
            boundary.get(city, function (res) {
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
            })
        },

        initMarker(location) {
            let marker = new BMapGL.Marker(location)
            this.map.addOverlay(marker)
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    position: relative;
    width: 100%;
    height: 100%;

    .map-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .map {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
