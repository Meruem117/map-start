<template>
    <div class="page">
        <div class="map-box">
            <div id="e-map" class="map"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EMap',
    setup() {
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
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
