<template>
  <div
    class="face"
    :class="{ live: interactive }"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="pointer = null"
    @click.capture="onClickCapture"
  >
    <LevelRing :level="state.level" />
    <div class="top">
      <button class="devbtn" data-act="devices" aria-label="当前设备 如影-A3F2，点击管理设备" @click="goDevices">
        <MsIcon name="bluetooth" size="14" class="ok" /><span>如影-A3F2</span><MsIcon name="expand_more" size="14" />
      </button>
      <span class="devbat" title="设备电量" aria-label="设备电量 78%">
        <MsIcon name="battery_5_bar" size="14" class="devbat-ic" aria-hidden="true" /><span aria-hidden="true">78%</span>
      </span>
    </div>
    <div class="center">
      <button class="micmain" data-act="mic" aria-label="AI 语音" @click="goVoice"><MsIcon name="mic" /></button>
      <button
        class="statchip"
        data-act="scene"
        :aria-label="`${mode.name}，${scene.n}，助力等级 ${levelPercent(state.level)}%，点击切换场景`"
        @click="goScene"
      >
        <SceneIcon :scene="scene" size="14" />
        <span>{{ mode.name.replace('模式', '') }} · {{ scene.n }}</span>
        <i class="sep" aria-hidden="true" />
        <b>{{ levelPercent(state.level) }}%</b>
        <MsIcon name="chevron_right" size="14" />
      </button>
      <span class="dots"><i v-for="(_, i) in MODES" :key="i" :class="{ on: i === state.m }" /></span>
    </div>
    <div class="toast" :class="{ show: toastShow }" role="status">
      <MsIcon name="check_circle" /><span>{{ toastText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { MODES, RING_START, RING_SWEEP, levelPercent, levelFromPercent } from '../data/modes.js'
import LevelRing from './LevelRing.vue'
import MsIcon from './MsIcon.vue'
import SceneIcon from './SceneIcon.vue'

const props = defineProps({
  m: { type: Number, default: 0 },
  s: { type: Number, default: 0 },
  level: { type: Number, default: 4 },
  toast: { type: String, default: '' },
  interactive: Boolean,
})

const router = useRouter()
const state = reactive({ m: props.m, s: props.s, level: props.level })
const mode = computed(() => MODES[state.m])
const scene = computed(() => mode.value.scenes[state.s])

const toastText = ref(props.toast)
const toastShow = ref(Boolean(props.toast))
let toastTimer = null
if (props.toast && props.interactive) {
  toastTimer = setTimeout(() => (toastShow.value = false), 1400)
}
function showToast(text) {
  toastText.value = text
  toastShow.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastShow.value = false), 1400)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const pointer = ref(null)

function geo(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const dx = e.clientX - r.left - r.width / 2
  const dy = e.clientY - r.top - r.height / 2
  return { dx, dy, d: Math.hypot(dx, dy), R: r.width / 2 }
}

function setFromAngle(g) {
  const ang = ((Math.atan2(g.dx, -g.dy) * 180) / Math.PI + 360) % 360
  let rel = (ang - RING_START + 360) % 360
  if (rel > 360 - 25) rel = 0
  else if (rel > RING_SWEEP + 20) return
  const lv = levelFromPercent((Math.min(rel, RING_SWEEP) / RING_SWEEP) * 100)
  if (lv !== state.level) {
    state.level = lv
    navigator.vibrate?.(8)
  }
}

const SWIPE_MIN = 32
let suppressClick = false

function onDown(e) {
  if (!props.interactive) return
  const onAct = Boolean(e.target.closest('[data-act]'))
  const g = geo(e)
  const ring = !onAct && g.d > g.R * 0.86
  pointer.value = { x: e.clientX, y: e.clientY, ring }
  // Capturing on a button would retarget its click to the face, so only capture outside buttons.
  if (!onAct) e.currentTarget.setPointerCapture(e.pointerId)
  if (ring) setFromAngle(g)
}

function onMove(e) {
  if (pointer.value?.ring) setFromAngle(geo(e))
}

function onClickCapture(e) {
  if (suppressClick) {
    e.stopPropagation()
    e.preventDefault()
    suppressClick = false
  }
}

function switchedTo() {
  showToast(`已切换到 ${mode.value.short} · ${scene.value.n}`)
}

function onUp(e) {
  const p = pointer.value
  if (!p) return
  const dx = e.clientX - p.x
  const dy = e.clientY - p.y
  if (p.ring) {
    showToast(`已同步 · 助力 ${levelPercent(state.level)}%`)
  } else if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
    state.m = (state.m + (dx < 0 ? 1 : MODES.length - 1)) % MODES.length
    state.s = 0
    suppressClick = true
    setTimeout(() => (suppressClick = false), 0)
    navigator.vibrate?.(10)
    switchedTo()
  }
  pointer.value = null
}

function goScene() {
  if (props.interactive) router.push({ path: '/scene', query: { m: state.m, s: state.s } })
}
function goDevices() {
  if (props.interactive) router.push({ path: '/devices', query: { s: 'list' } })
}
function goVoice() {
  if (props.interactive) router.push('/voice')
}
</script>
