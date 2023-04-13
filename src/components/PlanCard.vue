<script setup>
import { computed } from 'vue'
import SimpleDivider from '@/components/SimpleDivider.vue'

const props = defineProps({ 
  planData: { 
    type: Object, 
    required: true
  },
  selected: {
    type: Object,
    default() {
      return { 
        name: '', 
        title: '', 
        monthlyFee: 0, 
        features: [] 
      }
    }
  }
})

const isSelected = computed(() => {
  return props.selected.name === props.planData.name
})

const tagEffect = computed(() => {
  if (props.planData.current) return 'dark'
  return 'light'
})

const radioIconSrc = computed(() => {
  if (isSelected.value) {
    return 'https://image.qlieer.app/icon/ic-beauty-checked-radio.svg'
  }

  return 'https://image.qlieer.app/icon/ic-beauty-empty-radio.svg'
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
      <img :src="radioIconSrc">
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
  border: 4px solid var(--color-muted-200);
  border-radius: 12px;
  min-width: 205.33px;
  padding: 1rem;
}

.selected {
  border-color: var(--color-primary-300);
}

.card-features-list {
  list-style-type: none;
}
</style>