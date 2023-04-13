<script setup>
import { computed } from 'vue'

const props = defineProps({ 
  methodData: { 
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
  return props.selected.name === props.methodData.name
})

const radioIconSrc = computed(() => {
  if (isSelected.value) {
    return 'https://image.qlieer.app/icon/ic-beauty-checked-radio.svg'
  }

  return 'https://image.qlieer.app/icon/ic-beauty-empty-radio.svg'
})
</script>

<template>
  <div 
    class="method-card"
    :class="{ selected: isSelected }"
  >
    <img 
      class="radio-icon"
      :src="radioIconSrc"
    >
    <div class="card-right">
      <img :src="methodData.icon">
      <div>{{ methodData.title }}</div>
    </div>
  </div>
</template>

<style scoped>
.method-card {
  border: 4px solid var(--color-muted-200);
  border-radius: 12px;
  min-width: 205.33px;
  padding: 0.75rem;
  display: flex;
}

.radio-icon {
  align-self: flex-start;
}

.selected {
  border-color: var(--color-primary-300);
}

.card-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}
</style>