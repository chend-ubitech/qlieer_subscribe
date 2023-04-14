<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InvoiceSection from '@/components/InvoiceSection.vue'
import PlanCard from '@/components/PlanCard.vue'
import SimpleDivider from '@/components/SimpleDivider.vue';
import { useSignupInfoStore } from '@/stores/signupInfo';

const router = useRouter()
const signupInfoStore = useSignupInfoStore()

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

signupInfoStore.updateSelectedPlan(pricingPlansComputed.value[1])

const updateSelected = (selected) => {
  const plan = pricingPlansComputed.value.find(item => item.name === selected)
  signupInfoStore.updateSelectedPlan(plan)
}

const promoCode = ref('')
const referralCode = ref('')

const shoppingCartItems = [{
  name: '',
  description: '',
  cost: 0,
  discounts: { code: '', amount: 0 }
}]

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
            :selected="signupInfoStore.selectedPlan" 
            @update-selected="updateSelected"  
            @click="updateSelected(planData.name)"        
          />
        </template>
      </div>
    </div>
    <SimpleDivider />
    <div class="promo-form">
      <el-form-item>
        <div class="promo-input-label">
          你是否有優惠碼?
        </div>
        <el-input 
          v-model="promoCode" 
          type="text" 
        />
      </el-form-item>
      <el-form-item>
        <div class="promo-input-label">
          你是否有推薦碼?
        </div>
        <el-input 
          v-model="referralCode"
          type="text" 
        />
      </el-form-item>
    </div>
    <InvoiceSection />
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

.promo-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.promo-input-label {
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-dark-700);
  font-size: 1.125rem;
  font-weight: 500;
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