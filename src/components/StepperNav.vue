<script setup>
const props = defineProps({ 
  active: { 
    type: Number, 
    default: 1 
  },
  steps: {
    type: Array,
    default(rawProps) {
      return [
        { id: 'pricingPlans', title: '方案選擇' },
        { id: 'registration', title: '申請資料' },
        { id: 'checkout', title: '付款確認' }
      ]
    }
  }
})

</script>

<template>
  <el-steps 
    :active="active" 
    align-center 
  >
    <template 
      v-for="step in steps" 
      :key="step.id"
    >
      <el-step :title="step.title" />
    </template>
  </el-steps>
</template>


