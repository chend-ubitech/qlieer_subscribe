<script setup>
import { computed } from 'vue'
import SimpleDivider from '@/components/SimpleDivider.vue'

const emit = defineEmits(['update-selected'])

const props = defineProps({ 
  planData: { 
    type: Object, 
    required: true
  },
  selected: {
    type: String,
    default: ''
  }
})

const isSelected = computed(() => {
  return props.selected === props.planData.name
})

const tagEffect = computed(() => {
  if (props.planData.current) return 'dark'
  return 'light'
})

const computedSelected = computed({
  get() {
    return props.selected
  },
  set(newValue) {
    emit('update-selected', newValue)
  }
})

const formatMonthlyFee = (amount) => {
  return `$${amount}/月`
}
</script>

<template>
  <div 
    class="pricing-plan-card" 
    :class="{ selected: isSelected }"
  >
    <div class="card-header">
      <input 
        v-model="computedSelected"
        type="radio" 
        :value="planData.name"        
      >
      {{ planData.title }}
      <el-tag 
        type="info" 
        :effect="tagEffect"
      >
        <span v-if="planData.current">當前方案</span>
        <span v-else>年繳</span>
      </el-tag>
    </div>
    <div class="card-pricing">
      {{ formatMonthlyFee(planData.monthlyFee) }}
    </div>
    <SimpleDivider />
    <ul class="card-features-list">
      <li 
        v-for="feature in planData.features" 
        :key="feature"
      >
        <span>&#x2713;</span>{{ feature }}
      </li>
    </ul>
    <div v-if="isSelected">
      <SimpleDivider />
      <el-button circle>
        &nbsp;-&nbsp;
      </el-button>
      <span>申請1年</span>
      <el-button circle>
        &nbsp;+&nbsp;
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.pricing-plan-card {
  border: 4px solid #F5F5F5;
  border-radius: 12px;
  width: 205.33px;
  padding: 16px;
}

.selected {
  border-color: #76B9D9;
}

.card-features-list {
  list-style-type: none;
}
</style>