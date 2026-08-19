<template>
  <div class="profile-view">
    <!-- 狀態 1：載入中提示 -->
    <div v-if="!profile?.name" class="loading-state">
      <p>正在載入個人簡介...</p>
    </div>

    <!-- 狀態 2：資料載入完成 -->
    <template v-else>
      <!-- 1. 關於我區塊 (卡片化焦點呈現) -->
      <section class="content-section" v-if="profile?.bio">
        <h2 class="section-title">關於我</h2>
        <div class="bio-card">
          <p class="bio-text">{{ profile.bio }}</p>
        </div>
      </section>

      <!-- 2. 核心技能區塊 (自動匹配技術圖示) -->
      <section class="content-section" v-if="parsedSkills.length">
        <h2 class="section-title">核心技能 (Skills)</h2>
        <div class="badge-grid">
          <span 
            v-for="skill in parsedSkills" 
            :key="skill" 
            class="tech-badge"
          >
            <i :class="getSkillIcon(skill)" class="skill-icon"></i>
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- 3. 競賽經歷與成果區塊 -->
      <section class="content-section" v-if="parsedCompetitions.length">
        <h2 class="section-title">競賽經歷與成果 (Competitions & Awards)</h2>
        
        <div class="competition-list">
          <article 
            v-for="(item, index) in parsedCompetitions" 
            :key="index"
            class="competition-card"
          >
            <div class="competition-header">
              <div class="competition-title-group">
                <span class="competition-date">{{ item.date }}</span>
                <h3 class="competition-title">{{ item.title }}</h3>
              </div>
              <span v-if="item.award" class="award-badge">
                <i class="fa-solid fa-trophy"></i>
                {{ item.award }}
              </span>
            </div>

            <p class="competition-desc">{{ item.description }}</p>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ProfileView'
}
</script>

<script setup>
import { inject, computed } from 'vue'

const profile = inject('profile')

// 安全解析技能欄位
const parsedSkills = computed(() => {
  if (!profile.value?.skills) return []
  if (Array.isArray(profile.value.skills)) return profile.value.skills
  try {
    return JSON.parse(profile.value.skills)
  } catch (err) {
    console.error('解析 skills 失敗:', err)
    return []
  }
})

// 安全解析競賽欄位
const parsedCompetitions = computed(() => {
  if (!profile.value?.competitions) return []
  if (Array.isArray(profile.value.competitions)) return profile.value.competitions
  try {
    return JSON.parse(profile.value.competitions)
  } catch (err) {
    console.error('解析 competitions 失敗:', err)
    return []
  }
})

// 🌟 自動為常見技術匹配 FontAwesome 圖示
const getSkillIcon = (skillName) => {
  const name = String(skillName).toLowerCase().trim()
  if (name.includes('python')) return 'fa-brands fa-python'
  if (name.includes('javascript') || name === 'js') return 'fa-brands fa-js'
  if (name.includes('vue')) return 'fa-brands fa-vuejs'
  if (name.includes('vite')) return 'fa-solid fa-bolt'
  if (name.includes('css')) return 'fa-brands fa-css3-alt'
  if (name.includes('html')) return 'fa-brands fa-html5'
  if (name.includes('sql') || name.includes('postgres') || name.includes('database')) return 'fa-solid fa-database'
  if (name.includes('node')) return 'fa-brands fa-node-js'
  if (name.includes('git')) return 'fa-brands fa-git-alt'
  if (name.includes('docker')) return 'fa-brands fa-docker'
  return 'fa-solid fa-code' // 預設程式碼圖示
}
</script>