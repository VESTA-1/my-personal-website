<template>
  <div class="game-container">
    <h2>遊戲專區</h2>
    
    <div v-if="isLoading">遊戲載入中... ⏳</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    
    <div v-else-if="games.length > 0">
      <div v-for="game in games" :key="game.id" class="game-card">
        <h3>{{ game.name }}</h3>
        <p>分數: {{ game.score }}</p>
      </div>
    </div>
    
    <div v-else>尚未有遊戲紀錄。</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const games = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/games`); 
    
    if (!response.ok) throw new Error(`伺服器錯誤: ${response.status}`);
    
    const data = await response.json();
    games.value = data || [];
    
  } catch (error) {
    console.error('取得遊戲資料失敗:', error);
    errorMessage.value = '目前無法載入遊戲紀錄，請稍後再試。';
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.subtitle {
  color: #888;
  font-size: 1.1rem;
}

.game-section {
  max-width: 500px;
  margin: 0 auto 60px;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.game-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.game-card:hover {
  transform: scale(1.03) translateY(-5px);
}

.game-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  z-index: 0;
}

.game-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%);
  z-index: 1;
}

.game-content {
  position: relative;
  z-index: 2;
  padding: 40px 30px;
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.game-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.game-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #fff;
}

.game-desc {
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
  font-size: 0.95rem;
}
</style>