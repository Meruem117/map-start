<template>
  <div class="page">
    <div id="a-map" class="map"></div>
  </div>
</template>

<script>
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
import { apiKey } from '../key'

export default {
  name: 'AMap',
  setup() {
    const map = shallowRef(null)
    return {
      map,
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
      }).then((AMap) => {
        this.map = new AMap.Map("a-map", {
          viewMode: "3D",
          zoom: 5,
          center: [105.602725, 37.076636],
        })
      }).catch(e => {
        console.error(e)
      })
    },
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 0px;
  margin: 0px;
  width: 100vh;
  height: 100vh;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
