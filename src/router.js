import { createRouter, createWebHashHistory } from 'vue-router'
import { BOARDS } from './data/boards.js'

const routes = [
  { path: '/', component: () => import('./views/OverviewView.vue'), meta: { title: '总览' } },
  ...BOARDS.map((b) => ({ path: b.path, component: b.component, meta: { title: b.name } })),
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · 如影 SD-H Plus 手表端 UI`
})

export default router
