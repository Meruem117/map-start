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
          zoom: 10,
          center: [119.974092, 31.811313],
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
  width: 100%;
  height: 900px;
  padding: 0px;
  margin: 0px;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
