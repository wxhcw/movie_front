import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')

// 请求拦截器, 每次请求都会在请求头中携带token
axios.interceptors.request.use((config) => {
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization')
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})