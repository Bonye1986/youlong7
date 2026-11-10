<template>
  <BoardLayout
    title="2 · 主控制页"
    sub="可直接操作：沿外圈拖动调档（1–10），中间左右滑切换模式，点场景胶囊进入场景选择页，点麦克风进入 AI 语音页。"
  >
    <WatchCard
      v-for="c in cards"
      :key="`${c.m}-${c.s}`"
      :title="c.title"
      tag="可交互"
      :desc="c.desc"
      :active="c.m === picked?.m"
    >
      <MainControl interactive :m="c.m" :s="c.s" :level="c.level" :toast="c.toast" />
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MODES } from '../data/modes.js'
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import MainControl from '../components/MainControl.vue'

const BASE = [
  { m: 0, s: 5, level: 4, title: '运动模式', desc: '外圈 10 格档位环，中心大号档位，下方是当前场景。' },
  { m: 1, s: 1, level: 6, title: '抗阻模式', desc: '场景为重量档位，胶囊直接显示 kg 数值。' },
  { m: 2, s: 2, level: 3, title: '放松模式', desc: '场景为按摩方式，档位表示强度。' },
]

const route = useRoute()
const picked = computed(() => {
  const m = Number(route.query.m)
  const s = Number(route.query.s)
  if (!MODES[m]?.scenes[s]) return null
  return { m, s }
})

const cards = computed(() =>
  BASE.map((c) => {
    if (picked.value?.m !== c.m) return c
    const s = picked.value.s
    return { ...c, s, toast: `已切换到 ${MODES[c.m].short} · ${MODES[c.m].scenes[s].n}` }
  }),
)
</script>
