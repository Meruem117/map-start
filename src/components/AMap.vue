<template>
  <div class="page">
    <div class="map-box">
      <div id="a-map" class="map"></div>
    </div>
    <div class="operate-box">
      <v-radio-group inline v-model="operate" @change="changeOperate">
        <v-radio label="Marker" value="1" color="secondary"></v-radio>
        <v-radio label="Polygon" value="2" color="secondary"></v-radio>
        <v-radio label="Rect" value="3" color="secondary"></v-radio>
      </v-radio-group>
      <v-btn variant="outlined" @click="clearMap">
        Clear
      </v-btn>
    </div>
    <v-card variant="outlined" class="info-box" v-show="operate">
      <div v-show="operate === '1'">
        {{ markerData.lng }}, {{ markerData.lat }}
      </div>
      <div v-show="operate === '2'">
        {{ polygonData.pointsStr }}
      </div>
    </v-card>
  </div>
</template>

<script>
import { shallowRef, ref, reactive } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
import { apiKey } from '../key'

export default {
  name: 'AMap',
  setup() {
    const map = shallowRef(null)
    const mouseTool = shallowRef(null)
    const operate = ref('')
    const marker = shallowRef(null)
    const markerData = reactive({
      lng: '',
      lat: ''
    })
    const polygon = shallowRef(null)
    const polygonData = reactive({
      points: [],
      pointsStr: ''
    })
    return {
      map,
      mouseTool,
      operate,
      marker, markerData,
      polygon, polygonData
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: apiKey,
        version: "2.0",
        plugins: ['AMap.MouseTool'],
      }).then(AMap => {
        this.map = new AMap.Map("a-map", {
          viewMode: "3D",
          zoom: 10,
          center: [119.974092, 31.811313],
          mapStyle: 'amap://styles/blue'
        })
        this.initMarker(AMap)
        this.initMouseTool(AMap)
      }).catch(e => {
        console.error(e)
      })
    },
    changeOperate() {
      let that = this
      if (this.operate === '1') {
        this.map.add(this.marker)
        this.map.on('click', function (e) {
          let lng = e.lnglat.getLng()
          let lat = e.lnglat.getLat()
          that.markerData.lng = lng
          that.markerData.lat = lat
          that.marker.setPosition([lng, lat])
        })
      }
      if (this.operate === '2') {
        this.mouseTool.polygon()
        this.mouseTool.on('draw', function (e) {
          let arr = e.obj.getPath()
          let points = arr.map(item => {
            return [item.lng, item.lat]
          })
          that.polygonData.points = points
          that.polygonData.pointsStr = JSON.stringify(points)
        })
      }
    },
    initMarker(AMap) {
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(119.974092, 31.811313)
      })
    },
    initMouseTool(AMap) {
      this.mouseTool = new AMap.MouseTool(this.map)
    },
    clearMap() {
      this.map.clearMap()
      this.operate = ''
      this.markerData = {}
      this.polygonData = {}
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

  .operate-box {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .info-box {
    position: absolute;
    top: 50px;
    right: 100px;
    width: 300px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    font-size: 20px;
  }
}
</style>
