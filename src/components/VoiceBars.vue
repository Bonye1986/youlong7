<template>
  <div class="vring" aria-hidden="true">
    <div v-for="b in bars" :key="b.i" class="vb" :style="{ transform: `rotate(${b.rot}deg)` }">
      <div class="vi" :style="{ height: `${b.len}px`, animationDelay: `${b.delay}s` }" />
    </div>
  </div>
</template>

<script setup>
const N = 60
const bars = Array.from({ length: N }, (_, i) => ({
  i,
  rot: (i * 360) / N,
  len: 6 + Math.round(Math.abs(Math.sin(i * 1.7)) * 9 + Math.random() * 3),
  delay: (Math.random() * 0.8).toFixed(2),
}))
</script>
