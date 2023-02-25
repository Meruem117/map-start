<template>
    <div class="page">
        <div class="map-box">
            <div id="b-map" class="map"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BMap',
    setup() {
        return {

        }
    },
    mounted() {

    },
    methods: {

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
