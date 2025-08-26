<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-1">
    <slot name="icon-left" />

    <span class="text-neutral-500 text-xs flex-1">{{ text }}</span>

    <slot name="icon-right" />
  </div>
</template>
