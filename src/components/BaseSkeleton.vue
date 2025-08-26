<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: [String, Number], default: null },
  height: { type: [String, Number], default: null },
  radius: { type: [String, Number], default: 8 },
  animated: { type: Boolean, default: true },
  className: { type: String, default: '' },
})

const styleVars = computed(() => {
  const style = {}
  const toUnit = (v) => (typeof v === 'number' ? `${v}px` : v)

  if (props.width) style.width = toUnit(props.width)
  if (props.height) style.height = toUnit(props.height)
  if (props.radius !== null && props.radius !== undefined) style.borderRadius = toUnit(props.radius)

  return style
})
</script>

<template>
  <component
    :is="'div'"
    :class="['relative overflow-hidden skeleton-shimmer bg-gray-200 dark:bg-gray-300', className]"
    :style="styleVars"
    aria-hidden="true"
  />
</template>

<style scoped>
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
