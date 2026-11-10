<template>
  <BoardLayout title="3 · 场景选择页" sub="场景沿圆环排列，点选立即下发并返回主控制页。可点击试选。">
    <WatchCard
      v-for="c in cards"
      :key="`${c.m}-${c.s}`"
      :title="c.title"
      tag="可交互"
      :desc="c.desc"
      :active="c.m === picked?.m"
    >
      <SceneRing :m="c.m" :s="c.s" />
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MODES } from '../data/modes.js'
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import SceneRing from '../components/SceneRing.vue'

const BASE = [
  { m: 0, s: 5, title: '运动场景 · 7 个', desc: '步行、山地、上下梯、骑行、碎石路、雪地、山丘。' },
  { m: 1, s: 1, title: '抗阻场景 · 4 个', desc: '2.5kg、5kg、7.5kg、10kg。' },
  { m: 2, s: 2, title: '放松场景 · 4 个', desc: '持续震动、上下震动、高频按摩、快慢综合。' },
]

const route = useRoute()
const picked = computed(() => {
  const m = Number(route.query.m)
  const s = Number(route.query.s)
  if (!MODES[m]?.scenes[s]) return null
  return { m, s }
})

const cards = computed(() => BASE.map((c) => (picked.value?.m === c.m ? { ...c, s: picked.value.s } : c)))
</script>
