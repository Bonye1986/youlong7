<template>
  <div class="dhead">
    <span>设备管理</span><small>{{ list.length }}/{{ MAX_DEVICES }}</small>
  </div>
  <div v-if="hint" class="dhint" role="status"><MsIcon name="info" size="14" />{{ hint }}</div>
  <ul class="dlist" :class="{ withhint: hint }">
    <li v-for="d in list" :key="d.id">
      <button
        class="drow"
        :class="[d.status, { sel: d.id === selected }]"
        :aria-label="`${d.name}，${d.sub}`"
        @click="onTap(d)"
        @pointerdown="startPress(d)"
        @pointerup="cancelPress"
        @pointerleave="cancelPress"
        @contextmenu.prevent
      >
        <img src="/img/device.png" alt="" class="dthumb" />
        <span class="dtext">
          <b>{{ d.name }}</b>
          <small><i class="dot" />{{ d.sub }}</small>
        </span>
        <MsIcon v-if="d.status === 'cur'" name="check_circle" fill size="16" class="dcheck" />
      </button>
    </li>
  </ul>
  <RouterLink class="addbtn" to="/connect"><MsIcon name="add" size="14" />添加新设备</RouterLink>
  <div class="toast bad" :class="{ show: toastShow }" role="status">
    <MsIcon name="error" /><span>{{ toastText }}</span>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DEVICES, MAX_DEVICES } from '../data/devices.js'
import MsIcon from './MsIcon.vue'

const props = defineProps({
  hint: String,
  selected: String,
  missingCurrent: Boolean,
  interactive: Boolean,
})

const router = useRouter()

const list = computed(() =>
  props.missingCurrent
    ? DEVICES.map((d) => (d.status === 'cur' ? { ...d, status: 'off', sub: '不在附近 · 刚刚' } : d))
    : DEVICES,
)

const toastText = ref('')
const toastShow = ref(false)
let toastTimer = null
let pressTimer = null
let longPressed = false

function showToast(text) {
  toastText.value = text
  toastShow.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastShow.value = false), 1400)
}

function startPress() {
  if (!props.interactive) return
  longPressed = false
  clearTimeout(pressTimer)
  pressTimer = setTimeout(() => {
    longPressed = true
    navigator.vibrate?.(15)
    router.push({ path: '/devices', query: { s: 'menu' } })
  }, 600)
}

function cancelPress() {
  clearTimeout(pressTimer)
}

function onTap(d) {
  if (!props.interactive || longPressed) return
  if (d.status === 'cur') router.push('/control')
  else if (d.status === 'near') router.push({ path: '/devices', query: { s: 'confirm' } })
  else showToast('设备不在附近')
}

onBeforeUnmount(() => {
  clearTimeout(toastTimer)
  clearTimeout(pressTimer)
})
</script>
