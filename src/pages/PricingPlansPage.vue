<script setup>
import { ref, computed } from 'vue'
import PricingCard from '@/components/PricingCard.vue'
import SimpleDivider from '@/components/SimpleDivider.vue';

const pricingPlansRaw = [
  { name: 'Easy_2022', title: '輕鬆方案', monthlyFee: 950, features: ['商店網站', '個人網站 1 個', '使用人數 1 人', '會員數 800 位', '精準行銷模組 5 組'] },
  { name: 'Good_Deal_2022', title: '超值方案', monthlyFee: 1950, features: ['商店網站', '個人網站 5 個', '使用人數 1~5 人', '會員數無上限', '精準行銷模組 8 組', '人員分潤抽成計算'] },
  { name: 'Luxury_2022', title: '豪華方案', monthlyFee: 2950, features: ['商店網站', '個人網站 10 個', '使用人數 6~10 人', '會員數無上限', '精準行銷模組無上限', '人員分潤抽成計算'] }
]

const pricingPlansComputed = computed(() => {
  const pricingData = [...pricingPlansRaw]
  pricingData[0].current = true
  pricingData[1].promoted = true
  return pricingData
})

const selectedPlan = ref('Good_Deal_2022')

const updateSelected = (selected) => {
  selectedPlan.value = selected
}
</script>

<template>
  <div class="select-plans-section">
    <div class="select-plans-description">
      所有方案皆包含基礎預約、營運、顧客管理與精準行銷，更多方案詳細內容請至 連結 查看。
    </div>
    <div class="pricing-cards-container">
      <template 
        v-for="planData in pricingPlansComputed" 
        :key="planData.name"
      >
        <PricingCard 
          :plan-data="planData" 
          :selected="selectedPlan" 
          @update-selected="updateSelected"  
          @click="updateSelected(planData.name)"        
        />
      </template>
    </div>
    <SimpleDivider />
    <div class="card-promo">
      <label for="promo">你是否有優惠碼?</label>
      <input type="text" id="promo" name="promo">
      <label for="promo">你是否有推薦碼?</label>
      <input type="text" id="promo" name="promo">
    </div>
    <SimpleDivider />
  </div>
</template>

<style scoped>
.select-plans-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.select-plans-description {
  text-align: center;
}
.pricing-cards-container {
  display: flex;
  gap: 12px;
  max-width: 100%;
}
</style>