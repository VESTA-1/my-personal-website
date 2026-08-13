<template>
  <div class="project-container">
    <h2>我的作品集</h2>
    
    <div v-if="isLoading">專案載入中... ⏳</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    
<div v-else-if="projects.length > 0" class="card-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <!-- 卡片上方裝飾發光條 -->
        <div class="card-glow"></div>
        
        <div class="card-content">
          <!-- 專案圖示 -->
          <div class="card-icon">{{ project.icon || '💻' }}</div>
          
          <!-- 專案標題 -->
          <h3 class="card-title">{{ project.title }}</h3>
          
          <!-- 專案描述 -->
          <p class="card-desc">{{ project.description }}</p>
          
          <!-- 技術標籤 (支援陣列) -->
          <div class="tech-tags" v-if="project.tech_stack && project.tech_stack.length > 0">
            <span v-for="(tech, index) in project.tech_stack" :key="index" class="tech-tag">
              {{ typeof tech === 'object' ? tech.name : tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else>目前還沒有上傳任何專案喔！</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]); // 預設為空陣列
const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/project`); // 注意這裡的路由可能是複數 projects
    
    if (!response.ok) throw new Error(`伺服器錯誤: ${response.status}`);
    
    const data = await response.json();
    // 確保後端回傳的是陣列，如果後端回 null 則轉為空陣列
    projects.value = data || []; 
    
  } catch (error) {
    console.error('取得專案列表失敗:', error);
    errorMessage.value = '目前無法載入專案，請稍後再試。';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* ==========================================
   簡約科技風 (Minimalist Tech Style)
   ========================================== */

.page-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace, sans-serif;
}

.hero {
  text-align: left;
  margin-bottom: 40px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
}

.title-gradient {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
  /* 移除花俏漸層，改用純粹的極深色科技感 */
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
}

.subtitle {
  color: #64748b;
  font-size: 1rem;
}

.status-message {
  font-family: monospace;
  color: #64748b;
  padding: 20px 0;
}

/* 網格排版 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* 專案卡片 */
.project-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

/* 移除光暈裝飾，改用簡約風格 */
.card-glow {
  display: none; 
}

.card-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-desc {
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

/* 技術標籤 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  background: #f1f5f9;
  color: #334155;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: background 0.2s;
}

.tech-tag:hover {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

.tech-tag:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
