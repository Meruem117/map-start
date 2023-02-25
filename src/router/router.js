import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router
