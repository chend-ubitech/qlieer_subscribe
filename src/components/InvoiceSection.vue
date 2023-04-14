<script setup>
import { useSignupInfoStore } from '@/stores/signupInfo';
import { toDollar } from '@/utils.js'
import SimpleDivider from '@/components/SimpleDivider.vue';

const signupInfoStore = useSignupInfoStore()
</script>

<template>
  <div class="payment-details-container">
    <div class="payment-details-row">
      <span>{{ signupInfoStore.selectedPlan.title }}</span>
      <span>{{ toDollar(signupInfoStore.selectedPlan.monthlyFee) }}</span>
    </div>
    <div class="payment-details-row">
      <span>小計</span>
      <span>{{ signupInfoStore.invoiceTotal }}</span>
    </div>
    <div class="payment-details-row">
      <span>推薦代碼 #LASK721(獨角獸)</span>
    </div>
    <div class="payment-details-row">
      <span>優惠碼 #12345 (九折,贈送模組,贈送2月)</span>
      <span>-$213</span>
    </div>
    <SimpleDivider />
    <div class="payment-details-row payment-details-total">
      <span>總金額</span>
      <span class="wrap-total-details">
        <span class="total">$1,950</span>
        <span>方案加上加購項目再乘以 12 個月計算</span>
      </span>
    </div>
    <SimpleDivider />
  </div>
</template>

<style scoped>

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

</style>