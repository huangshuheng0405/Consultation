import { createApp } from 'vue'
import pinia from './stores/index.js'
import App from './App.vue'
import router from './router/index.js'

import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
