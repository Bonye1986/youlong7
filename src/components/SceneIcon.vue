<template>
  <b v-if="scene.kg" class="kg">{{ scene.kg }}<small>kg</small></b>
  <MsIcon v-else :name="scene.i" :size="size" />
</template>

<script setup>
import MsIcon from './MsIcon.vue'

defineProps({
  scene: { type: Object, required: true },
  size: [String, Number],
})
</script>
