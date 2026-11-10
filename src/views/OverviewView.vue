<template>
  <section>
    <h2>板块总览</h2>
    <p class="sub">共 5 个板块、21 个页面状态，每个板块是独立页面。</p>
    <div class="boards">
      <RouterLink v-for="(b, i) in BOARDS" :key="b.path" :to="b.path" class="bcard">
        <em>{{ b.path }}</em>
        <b>{{ i + 1 }} · {{ b.name }}</b>
        <span>{{ b.desc }}</span>
        <em>{{ b.count }} 个页面</em>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { BOARDS } from '../data/boards.js'
</script>
