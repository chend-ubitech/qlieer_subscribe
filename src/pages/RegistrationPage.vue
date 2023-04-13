<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import MethodCard from '@/components/MethodCard.vue'
import SimpleDivider from '@/components/SimpleDivider.vue';

const router = useRouter()
const registrationFormRef = ref(null)

const registrationValidationRules = reactive({
  name: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  id: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  companyName: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  companyTaxId: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ],
  companyAddress: [
    { required: true, message: 'Field required', trigger: 'blur' }
  ]
})

const methodsDataRaw = [
  { name: 'business', title: '公司帳號申請', icon: 'https://image.qlieer.app/icon/ic-beauty-form-send.svg' },
  { name: 'personal', title: '個人帳號申請', icon: 'https://image.qlieer.app/icon/ic-beauty-form-send.svg' },
]

const methodsData = ref(methodsDataRaw)

const selectedMethod = ref()

const updateSelectedMethod = (selected) => {
  const method = methodsData.value.find(item => item.name === selected)
  registrationData.value = prepareData(selected)
  resetFormValidation()
  selectedMethod.value = method
}

const prepareData = (schemaKey) => {
  const schema = formSchemas[schemaKey]
  const data = {}

  for (const prop in schema) {
    data[prop] = ''
  }

  data.agreeToTerms = false

  return data
}

const resetFormValidation = () => {
  if (!registrationFormRef.value) return
  registrationFormRef.value.resetFields()
}

const registrationData = ref({})

const formSchemas = {
  business: {
    name: {
      label: '負責人姓名',
      required: true,
      rules: []
    },
    phone: {
      label: '負責人手機號碼',
      required: true,
      rules: []
    },
    email: {
      label: '負責人信箱',
      required: true,
      rules: []
    },
    id: {
      label: '負責人身分證號',
      required: true,
      rules: []
    },
    companyName: {
      label: '公司登記名稱',
      required: true,
      rules: []
    },
    companyTaxId: {
      label: '統一編號',
      required: true,
      rules: []
    },
    companyAddress: {
      label: '公司登記地址',
      required: true,
      rules: []
    }
  },
  personal: {
    name: {
      label: '負責人姓名',
      required: true,
      rules: []
    },
    phone: {
      label: '負責人手機號碼',
      required: true,
      rules: []
    },
    email: {
      label: '負責人信箱',
      required: true,
      rules: []
    },
    id: {
      label: '負責人身分證號',
      required: true,
      rules: []
    }
  }
}

const currentSchema = computed(() => {
  if (!selectedMethod.value) return {}

  return formSchemas[selectedMethod.value.name]
})

const toPricingPage = () => {
  router.push({ name: 'pricing', params: {} })
}

const toCheckoutPage = async () => {
  if (!registrationFormRef.value) return
  console.log(registrationFormRef.value)
  await registrationFormRef.value.validate((valid, fields) => {
    if (valid) {
      router.push({ name: 'checkout', params: {} })
    } else {
      console.log('missing fields:', fields)
    }
  })
}
</script>

<template>
  <div class="select-method-page">
    <div class="selected-plan-container">
      <div class="plan-description">
        以下是你的方案
      </div>
      <div class="split-plan-info">
        <div class="plan-info-left">
          <span>
            超值方案
          </span>
          <span>
            使用者 1 ~ 5 人
          </span>
        </div>
        <div class="plan-info-right">
          <span>
            $1950 / 月
          </span>
          <span>
            付款時將以年計算總金額 $23,400 
          </span>
        </div>
      </div>
    </div>
    <div class="methods-container">
      <div class="methods-description">
        選擇你想要的申請方式
      </div>
      <div class="method-cards-container">
        <template 
          v-for="methodData in methodsData" 
          :key="methodData.name"
        >
          <MethodCard 
            :method-data="methodData" 
            :selected="selectedMethod" 
            @click="updateSelectedMethod(methodData.name)"        
          />
        </template>
      </div>      
    </div>
    <template v-if="selectedMethod">
      <SimpleDivider /> 
      <el-form 
        ref="registrationFormRef"
        class="registration-form"
        :rules="registrationValidationRules"
        :model="registrationData"
      >
        <div 
          v-for="(field, key) in currentSchema"
          :key="key"
          class="form-field"
        >
          <el-form-item 
            class="form-item"
            :prop="key"
          >
            <div 
              class="wrap-item-label"
              :class="{ 'required-label': field.required }"
            >
              <span>
                <span 
                  v-if="field.required"
                  class="required-star"
                >＊</span>{{ field.label }}                
              </span>
              <span 
                v-if="field.required"
                class="required-text"
              >
                必填
              </span>
            </div>
            <el-input 
              v-model="registrationData[key]" 
              class="form-input"
            />
          </el-form-item>
        </div>
      </el-form>
      <SimpleDivider /> 
      <div class="terms">
        <div class="terms-header">
          <div class="terms-title">
            條款及細則
          </div>
          <div class="terms-hint">
            瀏覽捲動完成條款及細則後，勾選我已閱讀並同意以上條款及細則。
          </div>
        </div>
        <div class="terms-content">客立樂依據個人資料保護法規定，向您告知以下事項：
          個人資料將用於本系統之預約商店預約功能（下稱「本系統服務」），當您向預約商店預約完成後，您同意預約商店將會提供您的個人資料予客立樂，本系統將會依據您提供之個人資料採取後續措施，包括但不限於：傳送確認簡訊、通知簡訊以及服務後滿意度調查等，以控管您於預約商店之預約情形；其他於特定目的與使用類別之範圍內，基於推廣本系統及預約商店之業務需求，而由客立樂或客立樂指定之第三方以電腦化或其他相類之數據方式處理、利用之行為；作為客立樂指定之第三方各種推播資訊之基礎，包含但不限於透過電子郵件、實體郵件、電話與簡訊等方式提供客立樂指定之第三方或其關係企業之行銷資訊。作為客立樂指定之第三方或其關係企業優化服務內容之市場調查依據，並得與其內部之管理系統結合、匯入、建檔或以一定之方式備份、留存。其他符合個資法第20條規定之利用。
        </div>
        <div class="terms-agree">
          <el-checkbox 
            v-model="registrationData.agreeToTerms" 
            label="我已閱讀並同意以上條款及細則"
          />
        </div>
      </div>
    </template>
    <SimpleDivider /> 
    <div class="wrap-actions">
      <el-button 
        class="to-pricing-btn" 
        type="default"
        @click="toPricingPage"
      >
        返回上一步
      </el-button>
      <el-button 
        class="to-checkout-btn" 
        :disabled="!selectedMethod"
        type="primary"
        @click="toCheckoutPage"
      >
        前往付款
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.select-method-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.methods-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-plan-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.methods-description {
  padding-left: 0.5rem;
  color: var(--color-dark-700);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.375rem;
}
.plan-description {
  padding-left: 0.5rem;
  color: var(--color-dark-700);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.375rem;
}

.split-plan-info {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--color-muted-200);
  border-radius: 12px;
}

.plan-info-left {
  display: flex;
  flex-direction: column;
}

.plan-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.method-cards-container {
  display: flex;
  gap: 12px;
  width: 100%;
}

.registration-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5%;
}

.form-field {
  flex: 48.5%;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.wrap-item-label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 0.5rem;
  color: var(--color-dark-700);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3125rem;
}

.required-label {
  padding-left: 0;
}

.required-text {
  color: var(--color-danger-500);
}

.form-input {
  margin-top: 0.5rem;
}

.terms {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.terms-title {
  color: var(--color-dark-700);
}

.terms-header {
  padding-left: 0.5rem;
}

.terms-hint {
  color: var(--color-dark-300);
}

.terms-content {
  padding: 1rem;
  background-color: var(--color-white-150);
  border-radius: 6px;
}

.wrap-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
