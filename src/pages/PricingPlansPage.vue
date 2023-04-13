<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PlanCard from '@/components/PlanCard.vue'
import SimpleDivider from '@/components/SimpleDivider.vue';
import { toDollar } from '@/utils.js'

const router = useRouter()

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

const selectedPlan = ref(pricingPlansComputed.value[1])

const updateSelected = (selected) => {
  const plan = pricingPlansComputed.value.find(item => item.name === selected)
  selectedPlan.value = plan
}

const promoCode = ref('')
const referralCode = ref('')

const shoppingCartItems = [{
  name: '',
  description: '',
  cost: 0,
  discounts: { code: '', amount: 0 }
}]

const total = computed(() => {
  return '$1900'
})

const toRegistrationPage = () => {
  router.push({ name: 'registration', params: {} })
}
</script>

<template>
  <div class="select-plan-page">
    <div class="plans-container">
      <div class="plans-description">
        所有方案皆包含基礎預約、營運、顧客管理與精準行銷，更多方案詳細內容請至 連結 查看。
      </div>
      <div class="plan-cards-container">
        <template 
          v-for="planData in pricingPlansComputed" 
          :key="planData.name"
        >
          <PlanCard 
            :plan-data="planData" 
            :selected="selectedPlan" 
            @update-selected="updateSelected"  
            @click="updateSelected(planData.name)"        
          />
        </template>
      </div>
    </div>
    <SimpleDivider />
    <div class="promo-form">
      <el-form-item label="你是否有優惠碼?">
        <el-input 
          v-model="promoCode" 
          type="text" 
        />
      </el-form-item>
      <el-form-item label="你是否有推薦碼?">
        <el-input 
          v-model="referralCode"
          type="text" 
        />
      </el-form-item>
    </div>
    <div class="payment-details-container">
      <div class="payment-details-row">
        <span>{{ selectedPlan.title }}</span>
        <span>{{ toDollar(selectedPlan.monthlyFee) }}</span>
      </div>
      <div class="payment-details-row">
        <span>小計</span>
        <span>{{ total }}</span>
      </div>
      <div class="payment-details-row">
        <span>推薦代碼 #LASK721(獨角獸)</span>
      </div>
      <div class="payment-details-row">
        <span>優惠碼 #12345 (九折,贈送模組,贈送2月)</span>
        <span>-$213</span>
      </div>
      <div class="payment-details-row payment-details-total">
        <span>總金額</span>
        <span class="wrap-total-details">
          <span class="total">$1,950</span>
          <span>方案加上加購項目再乘以 12 個月計算</span>
        </span>
      </div>
    </div>
    <SimpleDivider />
    <div class="wrap-actions">
      <el-button 
        class="to-registeration-btn" 
        type="primary"
        @click="toRegistrationPage"
      >
        填寫申請內容
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.select-plan-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.plans-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.select-plans-description {
  text-align: center;
  padding-left: 0.5rem;
}
.plan-cards-container {
  display: flex;
  gap: 12px;
  width: 100%;
}

.payment-details-container {
  padding: 0 0.5rem;
}

.payment-details-row {
  display: flex;
  justify-content: space-between;
}

.wrap-total-details {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.total {
  color: var(--color-dark-700);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.375rem;
}

.wrap-actions {
  display: flex;
  justify-content: flex-end;
}

.to-registeration-btn {
  max-width: 127px;
}

@media (max-width: 420px) {
  .plans-container {
    flex-direction: column-reverse;
  }

  .plan-cards-container {
    flex-direction: column;
  }
}
</style>