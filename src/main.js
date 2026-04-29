// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入剛剛建立的 router

const app = createApp(App)

app.use(router) // 註冊 router
app.mount('#app')