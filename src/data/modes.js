export const MODES = [
  {
    name: '运动模式',
    short: '运动',
    scenes: [
      { n: '步行', i: 'directions_walk' },
      { n: '山地', i: 'landscape' },
      { n: '上下梯', i: 'stairs' },
      { n: '骑行', i: 'directions_bike' },
      { n: '碎石路', i: 'grain' },
      { n: '雪地', i: 'ac_unit' },
      { n: '山丘', i: 'terrain' },
    ],
  },
  {
    name: '抗阻模式',
    short: '抗阻',
    scenes: [
      { n: '2.5kg', kg: '2.5' },
      { n: '5kg', kg: '5' },
      { n: '7.5kg', kg: '7.5' },
      { n: '10kg', kg: '10' },
    ],
  },
  {
    name: '放松模式',
    short: '放松',
    scenes: [
      { n: '持续震动', i: 'vibration' },
      { n: '上下震动', i: 'swap_vert' },
      { n: '高频按摩', i: 'bolt' },
      { n: '快慢综合', i: 'airwave' },
    ],
  },
]

export const RING_START = 215
export const MAX_LEVEL = 6
export const levelPercent = (level) => (level < 1 ? 0 : 25 + (level - 1) * 15)
export const RING_SEG = 290 / MAX_LEVEL

function hex(h) {
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
}

function mix(a, b, t) {
  const A = hex(a)
  const B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`
}

export const RING_SWEEP = 290

export function levelFromPercent(pct) {
  return Math.min(MAX_LEVEL, Math.max(1, Math.round((pct - 25) / 15) + 1))
}

export function ringBackground(level) {
  const fill = (levelPercent(level) / 100) * RING_SWEEP
  const end = mix('#8FB4E3', '#5A5FB0', fill / RING_SWEEP)
  return `conic-gradient(from ${RING_START}deg, #8FB4E3 0deg, ${end} ${fill}deg, #1E2330 ${fill}deg ${RING_SWEEP}deg, transparent ${RING_SWEEP}deg 360deg)`
}

export function knobAngle(level) {
  return RING_START + (levelPercent(level) / 100) * RING_SWEEP
}
