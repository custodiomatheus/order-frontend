<script setup>
import { computed } from 'vue'
import BaseIconText from '../BaseIconText.vue'
import { IdCard, MapPin, UserRound, Mail, Phone, Printer, Eye } from 'lucide-vue-next'

const props = defineProps({
  label: String,
  name: String,
  code: String,
  address: String,
  contact: { type: Object, default: () => ({ name: '', email: '', phone: '', fax: '' }) },
  readAt: String,
  document: { type: Object, default: () => ({ type: '', value: '' }) },
})

const documentText = computed(() => {
  if (props.document.type || props.document.value) {
    return `${props.document.type} ${props.document.value}`
  }

  return ''
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4 rounded-lg shadow-[0px_4px_8px_0px_#00000014]">
    <div class="flex flex-col gap-1">
      <p class="text-neutral-500 text-xs">{{ label }}</p>

      <h5 class="text-neutral-700 text-sm font-bold">
        {{ name }} <span v-if="code" class="text-primary-500 bg-primary-50 p-1">#{{ code }}</span>
      </h5>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-500 text-xs">
      <div class="flex flex-col gap-1">
        <BaseIconText v-if="documentText" :text="documentText" class="mb-2 md:mb-1">
          <template #icon-left>
            <IdCard :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <BaseIconText v-if="address" :text="address" class="mb-2 md:mb-1">
          <template #icon-left>
            <MapPin :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <BaseIconText v-if="contact.name" :text="contact.name" class="mb-2 md:mb-1">
          <template #icon-left>
            <UserRound :size="12" color="#566574" />
          </template>
        </BaseIconText>
      </div>

      <div class="flex flex-col gap-1">
        <BaseIconText v-if="contact.email" :text="contact.email" class="mb-2 md:mb-1">
          <template #icon-left>
            <Mail :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <BaseIconText v-if="contact.phone" :text="contact.phone" class="mb-2 md:mb-1">
          <template #icon-left>
            <Phone :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <BaseIconText v-if="contact.fax" :text="contact.fax" class="mb-2 md:mb-1">
          <template #icon-left>
            <Printer :size="12" color="#566574" />
          </template>
        </BaseIconText>

        <BaseIconText v-if="readAt" :text="readAt" class="mb-2 md:mb-1">
          <template #icon-left>
            <Eye :size="12" color="#566574" />
          </template>
        </BaseIconText>
      </div>
    </div>
  </div>
</template>
