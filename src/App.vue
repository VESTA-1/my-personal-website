<template>
  <div id="app">
    <nav class="sidebar">
      <div class="sidebar-header">
        <div class="hamburger-static">
          <span></span><span></span><span></span>
        </div>
      </div>

      <ul class="nav-links">
        <li>
          <router-link to="/">
            <span class="icon">👤</span>
            <span class="text">個人簡介</span>
          </router-link>
        </li>
        <li>
          <router-link to="/projects">
            <span class="icon">💼</span>
            <span class="text">專案作品</span>
          </router-link>
        </li>
        <li>
          <router-link to="/games">
            <span class="icon">🎮</span>
            <span class="text">遊戲網頁</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      
      <footer class="footer"><p>&copy; 2026 {{ title }}</p></footer>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = "我的傳送門"
</script>

<style>
/* 全域重設 */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #ffffff; }

#app { display: flex; min-height: 100vh; }

/* --- 側邊欄核心樣式 --- */
.sidebar {
  position: fixed; /* 固定在左側 */
  left: 0;
  top: 0;
  height: 100vh;
  width: 70px;      /* 初始寬度：只夠放圖示 */
  background: #1a1a1a;
  color: white;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden; /* 隱藏超出寬度的文字 */
  z-index: 1000;
  padding: 20px 0;
}

/* 滑鼠移入時，側邊欄變寬 */
.sidebar:hover {
  width: 200px;
  box-shadow: 10px 0 30px rgba(0,0,0,0.1);
}

/* 頂部漢堡圖示樣式 */
.sidebar-header {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  transition: opacity 0.3s;
}

/* 側邊欄展開時隱藏漢堡選單 */
.sidebar:hover .sidebar-header {
  opacity: 0;
  pointer-events: none;
}

.hamburger-static {
  width: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.hamburger-static span {
  display: block;
  width: 100%;
  height: 2px;
  background: white;
}

/* 選單連結樣式 */
.nav-links { list-style: none; }
.nav-links li { width: 100%; }

.nav-links a {
  display: flex;
  align-items: center;
  height: 60px;
  color: #ccc;
  text-decoration: none;
  transition: 0.3s;
  padding: 0 23px; /* 讓圖示居中 */
  white-space: nowrap;
}

.nav-links a:hover {
  background: #333;
  color: white;
}

/* 圖示樣式 */
.icon {
  font-size: 1.5rem;
  min-width: 24px;
  margin-right: 30px; /* 文字與圖示的距離 */
}

/* 文字樣式：初始透明度為 0 */
.text {
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 1.1rem;
  font-weight: 500;
}

/* 當 sidebar hover 時，文字顯現 */
.sidebar:hover .text {
  opacity: 1;
}

/* --- 主要內容區 --- */
.main-content {
  flex: 1;
  margin-left: 70px; /* 重要：保持跟側邊欄初始寬度一致，內容就不會動 */
  padding: 60px 40px;
  min-width: 0; /* 防止 flex 爆開 */
}

/* 切換動畫 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.footer {
  position: fixed;        /* 絕對定位 */
  bottom: 0;              /* 貼齊底部 */
  left: 70px;             /* 避開側邊欄收合時的寬度 */
  right: 0;               /* 寬度撐滿右側剩餘空間 */
  text-align: center;
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.8); /* 半透明背景，更有質感 */
  backdrop-filter: blur(5px);           /* 背景模糊效果 */
  border-top: 1px solid #eee;
  color: #999;
  font-size: 0.9rem;
  z-index: 900;           /* 確保在內容之上，但在側邊欄之下 */
  transition: left 0.3s;  /* 跟隨側邊欄連動 */
}
</style>