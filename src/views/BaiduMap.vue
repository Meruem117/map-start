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
            },
            path: [{
                'lng': 116.297611,
                'lat': 40.047363
            }, {
                'lng': 116.302839,
                'lat': 40.048219
            }, {
                'lng': 116.308301,
                'lat': 40.050566
            }, {
                'lng': 116.305732,
                'lat': 40.054957
            }, {
                'lng': 116.304754,
                'lat': 40.057953
            }, {
                'lng': 116.306487,
                'lat': 40.058312
            }, {
                'lng': 116.307223,
                'lat': 40.056379
            }],
            track: null
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
            // this.addTrackAnimation()
            this.addLuShu()
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
                        fillColor: '#e0f2fe',
                        fillOpacity: 0.5,
                        strokeColor: '#0ea5e9',
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
        },

        addTrackAnimation() {
            this.map.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17)
            const points = this.path.map(item => {
                return new BMapGL.Point(item.lng, item.lat)
            })
            const line = new BMapGL.Polyline(points)
            this.track = new BMapGLLib.TrackAnimation(this.map, line, {
                overallView: true,
                tilt: 30,
                duration: 20000,
                delay: 300
            })
            setTimeout(() => {
                this.track.start()
            }, 3000)
        },

        addLuShu() {
            this.map.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17)
            const points = this.path.map(item => {
                return new BMapGL.Point(item.lng, item.lat)
            })
            let polyline = new BMapGL.Polyline(points, {
                clip: false,
                geodesic: true,
                strokeWeight: 3
            })
            let lushu = new BMapGLLib.LuShu(this.map, points, {
                geodesic: true,
                autoCenter: true,
                icon: new BMapGL.Icon(require('../assets/logo.svg'), new BMapGL.Size(10, 10)),
                enableRotation: true
            })
            this.map.addOverlay(polyline)
            setTimeout(() => {
                lushu.start()
            }, 3000)
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
