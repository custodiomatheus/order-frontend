<script setup>
import { computed } from 'vue'
import BaseIconText from '../BaseIconText.vue'
import { UserRound, Mail, Phone, Printer, Info } from 'lucide-vue-next'

const props = defineProps({
  number: { type: Number, default: 0 },
  serial: { type: Number, default: 0 },
  buyer: { type: String, default: '' },
  contact: { type: Object, default: () => ({ name: '', email: '', phone: '', fax: '' }) },
  price: { type: Number, default: 0 },
  status: { type: String, default: '' },
  createdAt: { type: String, default: '' },
})

const createdAtDate = computed(() => props.createdAt.split('T')[0])
const createdAtTime = computed(() => props.createdAt.split('T')[1]?.split('.')[0])
</script>

<template>
  <div class="flex flex-col gap-6 lg:flex-row">
    <div class="w-full lg:w-[200px] bg-primary-500 p-4 rounded-tr-lg rounded-br-lg">
      <h5 class="text-white text-lg">Pre-Order</h5>
      <h1 class="text-white text-2xl font-bold">{{ number }}</h1>
      <span class="text-white text-xs">#ME{{ serial }}</span>
    </div>

    <div class="flex-1 flex flex-col justify-between gap-4 md:flex-row">
      <div>
        <h2 data-test="buyer" class="text-neutral-500 text-xl font-bold mb-3">{{ buyer }}</h2>
        <BaseIconText :text="contact.name" class="mb-2 md:mb-1">
          <template #icon-left>
            <UserRound :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <div class="flex flex-col gap-2 md:gap-4 md:flex-row">
          <BaseIconText :text="contact.email">
            <template #icon-left>
              <Mail :size="12" color="#566574" />
            </template>
          </BaseIconText>

          <BaseIconText :text="contact.phone">
            <template #icon-left>
              <Phone :size="12" color="#566574" />
            </template>
          </BaseIconText>

          <BaseIconText :text="contact.fax">
            <template #icon-left>
              <Printer :size="12" color="#566574" />
            </template>
          </BaseIconText>
        </div>
      </div>

      <div class="flex flex-col md:items-end gap-1">
        <h2 data-test="price" class="text-neutral-500 text-xl font-bold">USD {{ price }}</h2>
        <p class="text-success-500 text-xl font-semibold">{{ status }}</p>
        <p class="text-neutral-700 text-xs">
          <BaseIconText :text="`Created at ${createdAtDate} at ${createdAtTime}`">
            <template #icon-right>
              <Info :size="12" color="#fff" fill="#A3ACB6" />
            </template>
          </BaseIconText>
        </p>
      </div>
    </div>
  </div>
</template>
