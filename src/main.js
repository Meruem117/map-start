import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

window.CESIUM_BASE_URL = 'https://localhost:3000'

loadFonts()

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
