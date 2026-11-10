<template>
  <nav class="nav" aria-label="页面板块">
    <RouterLink v-for="b in BOARDS" :key="b.path" :to="b.path">
      {{ b.name }}<small>{{ b.count }}</small>
    </RouterLink>
  </nav>
  <section>
    <h2>{{ title }}</h2>
    <p class="sub">{{ sub }}</p>
    <div class="grid">
      <slot />
    </div>
    <div class="pager">
      <RouterLink v-if="prev" :to="prev.path"><MsIcon name="arrow_back" size="16" />上一页 · {{ prev.name }}</RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="next.path">下一页 · {{ next.name }}<MsIcon name="arrow_forward" size="16" /></RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BOARDS } from '../data/boards.js'
import MsIcon from './MsIcon.vue'

defineProps({ title: String, sub: String })

const route = useRoute()
const index = computed(() => BOARDS.findIndex((b) => b.path === route.path))
const prev = computed(() => BOARDS[index.value - 1])
const next = computed(() => BOARDS[index.value + 1])
</script>
