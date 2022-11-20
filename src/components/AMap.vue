<template>
  <div class="page">
    <div class="map-box">
      <div id="a-map" class="map"></div>
    </div>
    <div class="operate-box">
      <div class="menu-box">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
          @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef, ref } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
import { apiKey } from '../key'

export default {
  name: 'AMap',
  components: {
  },
  setup() {
    const map = shallowRef(null)
    const isCollapse = ref(false)
    return {
      map,
      isCollapse
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
        this.map = new AMap.Map("a-map", {
          viewMode: "3D",
          zoom: 10,
          center: [119.974092, 31.811313],
          mapStyle: 'amap://styles/blue'
        })
        this.initMarker(AMap)
      }).catch(e => {
        console.error(e)
      })
    },
    initMarker(AMap) {
      let marker = new AMap.Marker({
        position: new AMap.LngLat(119.974092, 31.811313),
        title: '常州'
      })
      this.map.add(marker)
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

  .operate-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;

    .menu-box {
      width: 15%;
    }
  }
}
</style>
