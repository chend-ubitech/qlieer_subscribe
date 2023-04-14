import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSignupInfoStore = defineStore('signupInfo', () => {
  const selectedPlan = ref({})

  const updateSelectedPlan = (plan) => {
    selectedPlan.value = plan
  }

  const invoiceTotal = computed(() => {
    return '$1900'
  })

  return { selectedPlan, updateSelectedPlan, invoiceTotal }
})