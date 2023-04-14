<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SimpleDivider from '@/components/SimpleDivider.vue';

const router = useRouter()

const tempVal = ref('')
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
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
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
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.checkout-page {
  width: 100%;
}
.wrap-form-item-content {
  display: flex;
  flex-direction: column;
}

.checkout-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid var(--color-muted-200);
  padding: 1rem;
  border-radius: 12px;
}
</style>