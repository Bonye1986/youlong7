<template>
  <b v-if="scene.kg" class="kg">{{ scene.kg }}<small>kg</small></b>
  <svg
    v-else-if="glyph"
    class="sic"
    :class="size && `s${size}`"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-for="(el, idx) in glyph" :key="idx">
      <circle v-if="el.c" :cx="el.c[0]" :cy="el.c[1]" :r="el.c[2]" :fill="el.fill ? 'currentColor' : 'none'" />
      <path v-else :d="el.d" :fill="el.fill ? 'currentColor' : 'none'" :opacity="el.o" />
    </template>
  </svg>
  <MsIcon v-else :name="scene.i" :size="size" />
</template>

<script setup>
import { computed } from 'vue'
import MsIcon from './MsIcon.vue'

const props = defineProps({
  scene: { type: Object, required: true },
  size: [String, Number],
})

const GLYPHS = {
  walk: [
    { c: [13.5, 4, 2], fill: true },
    { d: 'M12.5 8.5 10.5 14l-3 6.5' },
    { d: 'M10.5 14l3.5 2.5 1 4' },
    { d: 'M12.5 8.5 16 11.5l2.5-.5' },
    { d: 'M12.5 8.5 9 10l-1.5 3' },
  ],
  mountain: [
    { d: 'M2 20 9 7.5l4.5 7 2.5-3.5L22 20Z' },
    { d: 'M6.8 11.3 9 9.5l2.2 1.8', o: 0.9 },
    { d: 'M9 20c.5-2 2.5-2.5 2-4.5', o: 0.55 },
  ],
  stairs: [
    { d: 'M3 20h4.5v-4.5H12V11h4.5V6.5H21' },
    { d: 'M5 3v7' },
    { d: 'M3.3 4.7 5 3l1.7 1.7' },
    { d: 'M3.3 8.3 5 10l1.7-1.7' },
  ],
  gravel: [
    { d: 'M2 20h20' },
    { d: 'M3 20 4.5 13.5 9 12l2.5 4.5-1 3.5Z' },
    { d: 'M13 20l1.5-4 3.5-.5 1.2 4.5Z' },
    { d: 'M17.5 12.5l1.5-2.5 2.5 1-.5 2.5Z', fill: true },
    { d: 'M11.5 11.5l1-1.5 1.5.8-.6 1.4Z', fill: true },
    { d: 'M6 16.5l1.5-1', o: 0.55 },
  ],
  hill: [
    { c: [17.5, 6, 2.2] },
    { d: 'M2 19c2.5-5 6.5-6 10-2.5 2.5-3 6.5-3.5 10 2.5' },
    { d: 'M2 21h20', o: 0.55 },
  ],
}

const glyph = computed(() => GLYPHS[props.scene.i])
</script>
