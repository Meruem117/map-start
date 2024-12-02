<template>
    <v-app>
        <v-app-bar>
            <v-btn v-for="link in links" :key="link.path" @click="changeTab(link.path)">
                {{ link.text }}
            </v-btn>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { ref } from 'vue'
import router from './router/router'

export default {
    name: 'App',
    setup() {
        const links = ref([
            { text: 'AMap', path: 'amap' },
            { text: 'BaiduMap', path: 'bmap' },
            { text: 'CesiumMap', path: 'cmap' },
            { text: 'EchartsMap', path: 'emap' },
        ])

        return {
            links
        }
    },
    methods: {
        changeTab(path) {
            router.replace(path)
        }
    }
}
</script>
