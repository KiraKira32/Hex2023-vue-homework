import { createApp } from 'vue'

// 匯入 axios
import axios from 'axios'
// 匯入 vue axios
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

// 匯入 Bootstrap
import './assets/all.scss'

const app = createApp(App)

app.use(VueAxios, axios)

app.use(router)
app.mount('#app')
