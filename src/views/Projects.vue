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
.page-view {
  padding-bottom: 80px;
}

.hero {
  text-align: center;
  margin-bottom: 50px;
}

.title-gradient {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.subtitle {
  color: #888;
  font-size: 1.1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  padding: 30px;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.card-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  color: #555;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
}

.tech-tag:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
