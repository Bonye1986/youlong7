<template>
  <div ref="el" class="card" :class="{ active }">
    <div class="watch">
      <span class="hw up" />
      <span class="hw dn" />
      <div class="screen" :class="{ tappable: to }" v-bind="to ? tapAttrs : {}">
        <slot />
      </div>
    </div>
    <div class="cap">
      <h3>{{ title }}<template v-if="tag">&nbsp;<span class="tag">{{ tag }}</span></template></h3>
      <p>{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ title: String, tag: String, desc: String, active: Boolean, to: String })
const router = useRouter()
const el = ref(null)

const go = () => router.push(props.to)
const tapAttrs = {
  role: 'link',
  tabindex: 0,
  'aria-label': `${props.title}，点击跳转`,
  onClick: go,
  onKeydown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), go()),
}

onMounted(() => {
  if (props.active) el.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
})
</script>
