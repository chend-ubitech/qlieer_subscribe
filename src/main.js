import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import 'element-plus/dist/index.css'
import './assets/scss/index.scss'
import ElementPlus from 'element-plus'

import './assets/css/reset.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')

