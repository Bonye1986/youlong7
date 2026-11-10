<template>
  <div class="ring" :style="{ background: ringBackground(level) }" />
  <div class="knob" :style="{ '--a': `${knobAngle(level)}deg` }" />
</template>

<script setup>
import { ringBackground, knobAngle } from '../data/modes.js'

defineProps({ level: { type: Number, required: true } })
</script>
