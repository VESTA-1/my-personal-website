<template>
  <div class="profile-container">
    <div v-if="isLoading">資料載入中... ⏳</div>
    
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    
    <div v-else-if="profileInfo">
      <h2>{{ profileInfo.name }}</h2>
      <p>{{ profileInfo.bio }}</p>
    </div>
    
    <div v-else>目前還沒有建立個人資料喔！</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true); 
const profileInfo = ref(null);
const errorMessage = ref(null);

const userInfo = ref({
  name: '',
  title: '',
  bio: '',
  skills: []
});

onMounted(async () => {
  try {
    // 💡 讀取環境變數中的後端網址
    const apiUrl = import.meta.env.VITE_API_URL; 
    
    // 呼叫後端 API
    const response = await fetch(`${apiUrl}/api/profile`);
    
    if (!response.ok) {
      throw new Error(`伺服器錯誤: ${response.status}`);
    }
    
    const data = await response.json();
    profileInfo.value = data; // 將抓到的資料塞給變數
    
  } catch (error) {
    console.error('取得個人資料失敗:', error);
    errorMessage.value = '目前無法載入個人資料，請稍後再試。';
  } finally {
    isLoading.value = false; // 載入結束，關閉 loading 狀態
  }
});
</script>

<style scoped>
/* 幫你的個人資訊加上一點基礎的排版與設計 */
.profile-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  font-family: sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.loading-state {
  color: #666;
  padding: 40px 0;
}

.name {
  font-size: 2rem;
  color: #333;
  margin-bottom: 5px;
}

.title {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.bio {
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.skill-tag {
  background-color: #42b883; /* Vue 的經典綠色 */
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>