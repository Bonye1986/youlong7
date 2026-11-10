<template>
  <div class="ring" :style="{ background: ringBackground(level) }" />
  <div class="knob" :style="knobStyle" />
</template>

<script setup>
import { computed } from 'vue'
import { ringBackground, knobAngle } from '../data/modes.js'

const props = defineProps({ level: { type: Number, required: true } })

const knobStyle = computed(() => {
  const rad = (knobAngle(props.level) * Math.PI) / 180
  return {
    left: `calc(50% + ${Math.sin(rad).toFixed(4)} * (50% - 9px))`,
    top: `calc(50% - ${Math.cos(rad).toFixed(4)} * (50% - 9px))`,
  }
})
</script>
