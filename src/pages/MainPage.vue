<script setup>
import { useRoute, RouterView } from 'vue-router'
import StepperNav from '@/components/StepperNav.vue'
import { computed } from 'vue'

const route = useRoute()
const progressCount = computed(() => {
  if (route.name === 'pricing') {
    return 1
  } else if (route.name === 'registration') {
    return 2
  } else if (route.name === 'checkout') {
    return 3
  }

  return 1
})

console.log()
</script>

<template>
  <div class="main">
    <div class="logo-container">
      QLiEER
    </div>
    <div class="content">
      <div>
        <h2 class="header">
          申請「客立樂 Pro」
        </h2>
        <div class="header-description">
          請選擇你想要的方案類型
        </div> 
      </div>
      <StepperNav 
        class="stepper-container" 
        :active="progressCount"
      />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main {
  background: var(--color-white-100);
  padding: 80px 0;
  height: 100%;
}
.logo-container {
  text-align: center;
  width: 720px;
  margin: auto;
}
.content {
  background: var(--color-white);
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  margin: auto;
  padding: 2.5rem;
}
.header {
  font-size: 1.5rem;
  font-weight: 700;
}

.header-description {
  font-size: 1rem;
  font-weight: 400;
}

.stepper-container {
  width: 212px;
}

@media (max-width: 420px) {
  .main {
    padding: 0;
  }

  .logo-container {
    display: none;
  }
}
</style>