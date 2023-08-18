<template>
    <div class="page">
        <div class="map-box">
            <div id="e-map" class="map" @click="resetMap"></div>
        </div>
    </div>
</template>

<script>
import { shallowRef } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import * as geoJson from '../assets/json/china.json'
import { cityCode } from '../assets/js/cityCode'

export default {
    name: 'EMap',
    setup() {
        const chart = shallowRef(null)
        return {
            chart,
            hasClick: false,
            timer: null
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            echarts.registerMap('china', geoJson)
            this.chart = echarts.init(document.getElementById('e-map'))
            let data = [
                { name: '江苏', value: 100 }
            ]
            let option = this.getOption(data, 'china')
            this.chart.setOption(option, true)
            this.chart.on('click', (param) => {
                this.hasClick = true
                let city = cityCode.find(item => {
                    return param.name.indexOf(item.name) !== -1
                })
                if (city && city.adcode) {
                    this.loadChart(city.adcode, param.name)
                } else {
                    this.hasClick = false
                }
            })
        },

        resetMap() {
            if (this.hasClick) return
            let data = [
                { name: '江苏', value: 100 }
            ]
            let option = this.getOption(data, 'china')
            this.chart.setOption(option, true)
        },

        loadChart(code, name) {
            axios({
                url: `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`,
                method: 'get'
            }).then(res => {
                echarts.registerMap(name, res.data)
                let data = [
                    { name: '常州市', value: 100 }
                ]
                let option = this.getOption(data, name)
                this.chart.setOption(option, true)
                this.hasClick = false
            })
        },

        getOption(data, name) {
            let option = {
                grid: {
                    top: '10%',
                    right: '10%',
                    bottom: '10%',
                    left: '10%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                geo: [{
                    map: name,
                    zoom: 1,
                    silent: true,
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '100%',
                    roam: false,
                    itemStyle: {
                        normal: {
                            borderColor: '#1ef8ef',
                            borderWidth: 5,
                            shadowColor: '#1ef8ef',
                            shadowBlur: 10,
                        },
                    },
                }],
                series: [{
                    map: name,
                    type: 'map',
                    zoom: 1,
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '100%',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#fff',
                            },
                            borderColor: '#3dabce',
                            borderWidth: 1.5,
                            areaColor: {
                                type: 'linear-gradient',
                                x: 0,
                                y: 1000,
                                x2: 0,
                                y2: 0,
                                colorStops: [
                                    { offset: 0.5, color: '#030c18' },
                                    { offset: 1, color: '#273557' },
                                ],
                                global: true,
                            },
                        },
                    },
                    data: data,
                }],
            }
            return option
        },
    }
}
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;

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
