<template>
  <div class="projects-view">
    <!-- 頁面標題 -->
    <header class="section-header">
      <h2 class="section-title">專案介紹</h2>
    </header>

    <!-- 載入中狀態 -->
    <div v-if="isLoading" class="loading-state">
      <p>正在載入專案資料...</p>
    </div>

    <!-- 連線錯誤提示 -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <!-- 空資料提示 -->
    <div v-else-if="projects.length === 0" class="empty-state">
      <p>目前尚無任何專案展示。</p>
    </div>

    <!-- 專案卡片網格 -->
    <div v-else class="project-grid">
      <article 
        v-for="project in projects" 
        :key="project.id || project.title" 
        class="project-card"
      >
        <!-- 專案預覽圖 (若資料庫有提供 image_url) -->
        <div v-if="project.image_url" class="project-image-container">
          <img 
            :src="project.image_url" 
            :alt="project.title"
            class="project-image"
            loading="lazy"
            @error="onImageError"
          />
        </div>

        <div class="card-body">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>

          <!-- 動態技術標籤 -->
          <div v-if="getTechStack(project).length" class="card-tech-stack">
            <span 
              v-for="tech in getTechStack(project)" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- 外部連結 -->
        <div class="card-footer" v-if="project.github_url || project.demo_url">
          <a 
            v-if="project.github_url" 
            :href="project.github_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="project-link"
          >
            <i class="fa-brands fa-github"></i>
            <span>原始碼</span>
          </a>

          <a 
            v-if="project.demo_url" 
            :href="project.demo_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="project-link demo-link"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>即時預覽</span>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
let cachedProjects = null
</script>

<script setup>

import { ref, onMounted } from 'vue'

const projects = ref([])
const isLoading = ref(true)
const error = ref(null)

const onImageError = (event) => {
  const container = event.target.closest('.project-image-container')
  if (container) {
    container.style.display = 'none'
  }
}

const getTechStack = (project) => {
  if (!project.tech_stack) return []
  if (Array.isArray(project.tech_stack)) return project.tech_stack
  try {
    return JSON.parse(project.tech_stack)
  } catch {
    return []
  }
}
const fetchProjects = async () => {
  // 如果記憶體已有快取，直接使用，不再發送網路請求
  if (cachedProjects && cachedProjects.length > 0) {
    projects.value = cachedProjects
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    error.value = null

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
    const res = await fetch(`${apiUrl}/api/projects`)

    if (!res.ok) {
      throw new Error(`無法取得專案列表 (狀態碼: ${res.status})`)
    }

    const data = await res.json()
    projects.value = data
    // 寫入快取
    cachedProjects = data
  } catch (err) {
    console.error('專案 API 載入失敗:', err)
    error.value = '無法載入專案資料，請確認後端伺服器是否正常運行。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>