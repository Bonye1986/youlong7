<template>
  <span class="ms" :class="[fill && 'fill', size && `s${size}`]" aria-hidden="true">{{ name }}</span>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  fill: Boolean,
  size: [String, Number],
})
</script>
