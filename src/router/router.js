import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/amap',
        name: 'amap',
        component: () => import('../views/AMap.vue'),
    },
    {
        path: '/bmap',
        name: 'bmap',
        component: () => import('../views/BMap.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
