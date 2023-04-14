<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SimpleDivider from '@/components/SimpleDivider.vue';
import InvoiceSection from '@/components/InvoiceSection.vue'

const router = useRouter()

const tempVal = ref('')

const paymentOptions = [
  {
    name: 'creditCard',
    label: '信用卡',
    tooltip: '支援 Visa, JCB, Master',
    icon: ''
  },
  {
    name: 'ATM',
    label: 'ATM 轉帳',
    tooltip: '透過銀行轉帳金額',
    icon: ''
  }
]
const receiptOptions = [
  {
    name: 'eBusinessReceipt',
    label: '營業人電子發票',
    tooltip: '需要統一編號成立發票'
  },
  {
    name: 'eMemberReceipt',
    label: '會員載具',
    tooltip: '客立樂將直接申請為會員並存入載具'
  },
  {
    name: 'mobileCodeReceipt',
    label: '手機條碼載具',
    tooltip: '需要你提供手機條碼'
  }
]
</script>

<template>
  <div class="checkout-page">
    <el-form class="checkout-form">
      <el-form-item>
        <div class="wrap-form-item-content">
          <div class="form-section-header">
            你偏好哪一種付款方式？
          </div>
          <el-radio-group 
            v-model="tempVal"
            class="checkout-radio-group"
          >
            <div 
              v-for="option in paymentOptions"
              :key="option.name"
              class="radio-option-row"
            >
              <el-radio :label="option.name">
                <div class="custom-radio-label">
                  <div class="checkout-label-left">
                    <div class="option-label">{{ option.label }}</div>
                    <div class="option-tooltip">{{ option.tooltip }}</div>
                  </div>
                  <div class="custom-label-right">
                    🐳
                  </div>                
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item
        class="checkout-form-item"
      >
        <div class="wrap-form-item-content">
          <div class="checkout-section-header">
            你需要哪一種電子發票？
          </div>
          <el-radio-group 
            v-model="tempVal"
            class="checkout-radio-group"
          >
            <div 
              v-for="option in receiptOptions"
              :key="option.name"
              class="radio-option-row"
            >
              <el-radio :label="option.name">
                <div class="custom-radio-label">
                  <div class="checkout-label-left">
                    <div class="option-label">{{ option.label }}</div>
                    <div class="option-tooltip">{{ option.tooltip }}</div>
                  </div>               
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
    <InvoiceSection />
  </div>
</template>

<style scoped>
.checkout-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.checkout-form {
}
.wrap-form-item-content {
  display: flex;
  flex-direction: column;
  width: 95%
}

.checkout-radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-option-row {
  display: flex;
  align-items: center;
  border: 2px solid var(--color-muted-200);
  padding: 1rem 1rem 1rem 1.5rem;
  border-radius: 12px;
  width: 100%;
}

.el-radio {
  display: flex;
  width: 100%;
}

:deep(.el-radio__input) {
  flex: 1;
}

:deep(.el-radio__label) {
  width: 100%;
}

.custom-radio-label {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkout-label-left {
  padding-left: 0.5rem;
}

.option-label {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.375rem;
}

.option-tooltip {
  line-height: 1.25rem;
}

.custom-label-right {
  font-size: 1.25rem;
}
</style>
