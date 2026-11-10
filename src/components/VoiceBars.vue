<template>
  <div v-for="b in bars" :key="b.i" class="vb" :style="{ transform: `rotate(${b.rot}deg)` }">
    <div class="vi" :style="{ height: `${b.len}px`, animationDelay: `${b.delay}s` }" />
  </div>
</template>

<script setup>
const N = 60
const bars = Array.from({ length: N }, (_, i) => ({
  i,
  rot: (i * 360) / N,
  len: 8 + Math.round(Math.abs(Math.sin(i * 1.7)) * 12 + Math.random() * 4),
  delay: (Math.random() * 0.8).toFixed(2),
}))
</script>
