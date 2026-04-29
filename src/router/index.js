// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Projects from '../views/Projects.vue'
import Games from '../views/Games.vue'

// 定義網址路徑 (path) 與對應的元件 (component)
const routes = [
  { path: '/', name: 'Profile', component: Profile },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/games', name: 'Games', component: Games }
]

const router = createRouter({
  // 使用 HTML5 的 History 模式，讓網址看起來更乾淨
  history: createWebHistory(),
  routes
})

export default router