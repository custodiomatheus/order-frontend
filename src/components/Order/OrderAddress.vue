<script setup>
import { ChevronUp } from 'lucide-vue-next'
import OrderCard from './OrderCard.vue'

defineProps({
  addresses: { type: Array, default: () => [] },
})
</script>

<template>
  <div>
    <h4 class="text-neutral-700 text-lg font-bold flex items-center gap-2">
      <ChevronUp :size="20" color="#1052e0" fill="#edf3ff" />
      Addresses
    </h4>

    <div class="flex flex-col gap-4 lg:flex-row">
      <OrderCard
        v-for="address in addresses"
        :key="address.label"
        :label="address.label"
        :name="address.name"
        :code="address.code"
        :address="address.address"
        :contact="address.contact"
      />
    </div>
  </div>
</template>
