// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Projects from '../views/Projects.vue'

// 定義網址路徑 (path) 與對應的元件 (component)
const routes = [
  { path: '/', name: 'Profile', component: Profile },
  { path: '/projects', name: 'Projects', component: Projects },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router