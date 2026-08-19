<template>
  <div class="layout-container">
    <!-- 左側側邊欄 -->
    <aside class="sidebar">
      <!-- 1. 個人資訊標頭 (包含頭像、姓名與一句話介紹) -->
      <div class="profile-header">
        <!-- 頭像容器 -->
        <div class="avatar-container">
          <img 
            v-if="profile?.avatar_url && !imageLoadError" 
            :src="profile.avatar_url" 
            :alt="profile?.name || 'User Avatar'"
            class="avatar-img"
            @error="handleAvatarError"
          />
          <div v-else class="avatar-placeholder">
            <span>{{ profile?.name ? profile.name.slice(0, 2).toUpperCase() : 'ME' }}</span>
          </div>
        </div>

        <!-- 姓名與一句話介紹 -->
        <div class="profile-meta">
          <h1 class="profile-name">{{ profile?.name || '開發者' }}</h1>
          <p class="profile-title">{{ profile?.title || '全端工程師' }}</p>
        </div>
      </div>

      <!-- 2. 導覽選單 -->
      <nav class="nav-menu">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
          exact-active-class="active"
        >
          <span class="nav-text">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- 3. 底部社群連結 -->
      <div class="sidebar-footer">
        <!-- GitHub 外部連結 -->
        <a
          :href="profile?.github_url || '#'"
          :class="['social-button', { 'is-disabled': !profile?.github_url }]"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i class="fa-brands fa-github social-icon"></i>
          <span class="social-tooltip">GitHub</span>
        </a>

        <!-- 點擊一鍵複製 Email -->
        <button
          type="button"
          :class="['social-button', { 'is-disabled': !profile?.email }]"
          :aria-label="profile?.email ? `複製 Email: ${profile.email}` : 'Email'"
          @click="copyEmail"
        >
          <i :class="['social-icon', isCopied ? 'fa-solid fa-check copy-success-icon' : 'fa-solid fa-envelope']"></i>
          <span class="social-tooltip">
            {{ isCopied ? '已複製信箱！' : (profile?.email ? '點擊複製 Email' : 'Email') }}
          </span>
        </button>
      </div>
    </aside>

    <!-- 右側主內容區 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'

// 🌟 1. 精準對齊資料庫欄位結構
const profile = ref({
  name: '',
  title: '',
  bio: '',
  skills: [],
  avatar_url: '',
  github_url: '',
  email: ''
})

const imageLoadError = ref(false)
const isCopied = ref(false)

const handleAvatarError = () => {
  console.warn('頭像載入失敗，切換至文字占位')
  imageLoadError.value = true
}

const copyEmail = async () => {
  if (!profile.value?.email) return
  try {
    await navigator.clipboard.writeText(profile.value.email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

const navItems = [
  { path: '/', label: '個人簡介' },
  { path: '/projects', label: '專案介紹' }
]

// 🌟 共享 profile 給 Profile.vue 等視圖
provide('profile', profile)

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
    const res = await fetch(`${apiUrl}/api/profile`)
    if (res.ok) {
      const data = await res.json()
      profile.value = Array.isArray(data) ? data[0] : data
      imageLoadError.value = false
    }
  } catch (error) {
    console.error('Profile API 載入失敗:', error)
  }
})
</script>