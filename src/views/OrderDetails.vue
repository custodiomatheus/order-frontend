<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrder } from '@/services/orders'
import BaseSkeleton from '@/components/BaseSkeleton.vue'
import OrderCard from '@/components/Order/OrderCard.vue'
import OrderHeader from '@/components/Order/OrderHeader.vue'
import OrderAddress from '@/components/Order/OrderAddress.vue'

const route = useRoute()

const order = ref({})
const isLoading = ref(true)

const onGetOrder = async () => {
  const response = await getOrder(route.params.id)

  order.value = response
}

onMounted(async () => {
  isLoading.value = true

  await onGetOrder(route.params.id)

  isLoading.value = false
})
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col gap-8">
    <OrderHeader
      :number="order.header.number"
      :serial="order.header.serial"
      :buyer="order.header.buyer"
      :contact="order.header.contact"
      :price="order.header.price"
      :status="order.header.status"
      :createdAt="order.header.createdAt"
    />

    <OrderCard
      label="Supplier"
      :code="order.supplier.code"
      :name="order.supplier.name"
      :readAt="order.supplier.readAt"
      :lastReplyAt="order.supplier.lastReplyAt"
      :document="order.supplier.document"
      :address="order.supplier.address"
      :contact="order.supplier.contact"
    />

    <OrderAddress :addresses="order.addresses" />
  </div>

  <div v-else class="flex flex-col gap-4">
    <div class="flex gap-4">
      <BaseSkeleton width="250px" height="150px" />

      <div class="w-1/2 flex flex-col gap-2">
        <BaseSkeleton width="100%" height="45px" />
        <BaseSkeleton width="100%" height="45px" />
        <BaseSkeleton width="100%" height="45px" />
      </div>

      <div class="w-1/2 flex flex-col gap-2">
        <BaseSkeleton width="100%" height="45px" />
        <BaseSkeleton width="100%" height="45px" />
        <BaseSkeleton width="100%" height="45px" />
      </div>
    </div>

    <BaseSkeleton width="100%" height="200px" />

    <BaseSkeleton width="100%" height="200px" />
  </div>
</template>
