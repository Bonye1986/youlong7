<template>
  <button
    v-for="(sc, i) in mode.scenes"
    :key="sc.n"
    class="sc"
    :class="{ on: i === selected }"
    :aria-label="sc.n"
    :aria-pressed="i === selected"
    :style="pos(i)"
    @click="pick(i)"
  >
    <SceneIcon :scene="sc" />
  </button>
  <div class="center" style="pointer-events: none">
    <div class="small">{{ mode.name }}</div>
    <div class="scname">{{ mode.scenes[selected].n }}</div>
    <div class="small" style="margin-top: 4px">{{ sending ? '已下发，返回中…' : '点击即下发' }}</div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { MODES } from '../data/modes.js'
import SceneIcon from './SceneIcon.vue'

const props = defineProps({ m: { type: Number, required: true }, s: { type: Number, default: 0 } })
const router = useRouter()
const mode = computed(() => MODES[props.m])
const selected = ref(props.s)
const sending = ref(false)
let timer = null

const RING_RADIUS = 36
function pos(i) {
  const a = (i / mode.value.scenes.length) * Math.PI * 2
  return {
    left: `${50 + RING_RADIUS * Math.sin(a)}%`,
    top: `${50 - RING_RADIUS * Math.cos(a)}%`,
  }
}

function pick(i) {
  if (sending.value) return
  selected.value = i
  sending.value = true
  timer = setTimeout(() => {
    router.push({ path: '/control', query: { m: props.m, s: i } })
  }, 600)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
