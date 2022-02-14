<template>
  <div id="container"></div>
</template>

<script>
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'AMap',
  props: {
    msg: String
  },
  setup() {
    const map = shallowRef(null)
    return {
      map,
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "1bef5e6bc5ac9412518943a96c8a1f28",
        version: "2.0",
        plugins: [''],
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          viewMode: "3D",
          zoom: 5,
          center: [105.602725, 37.076636],
        })
      }).catch(e => {
        console.log(e)
      })
    },
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
