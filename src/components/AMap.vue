<template>
  <div class="page">
    <div class="map-box">
      <div id="a-map" class="map"></div>
    </div>
    <div class="location-box">{{ }}</div>
  </div>
</template>

<script>
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
import { apiKey } from '../key'

export default {
  name: 'AMap',
  components: {
  },
  setup() {
    const map = shallowRef(null)
    const marker = shallowRef(null)
    return {
      map,
      marker
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
        plugins: [''],
      }).then(AMap => {
        let that = this
        this.map = new AMap.Map("a-map", {
          viewMode: "3D",
          zoom: 10,
          center: [119.974092, 31.811313],
          mapStyle: 'amap://styles/blue'
        })
        this.initMarker(AMap)
        this.map.on('click', function (e) {
          let lng = e.lnglat.getLng()
          let lat = e.lnglat.getLat()
          that.marker.setPosition([lng, lat])
        })
      }).catch(e => {
        console.error(e)
      })
    },
    initMarker(AMap) {
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(119.974092, 31.811313),
        title: '常州'
      })
      this.map.add(this.marker)
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

  .location-box {
    position: absolute;
    top: 50px;
    left: 100px;
    width: 240px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
