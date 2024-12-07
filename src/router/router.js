import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/amap',
        name: 'amap',
        component: () => import('../views/AMap.vue')
    },
    {
        path: '/bmap',
        name: 'bmap',
        component: () => import('../views/BaiduMap.vue')
    },
    // {
    //     path: '/cmap',
    //     name: 'cmap',
    //     component: () => import('../views/CMap.vue')
    // },
    // {
    //     path: '/emap',
    //     name: 'emap',
    //     component: () => import('../views/EMap.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
