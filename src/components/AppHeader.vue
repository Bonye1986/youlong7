<template>
  <header>
    <h1>如影 SD-H Plus · 圆形手表端 UI</h1>
    <p>
      深色 OLED 底，沿用手机 APP 的钢蓝到靛蓝渐变。标志性元素是外圈的 6 格档位环，其余保持安静。图标使用 Material
      Symbols 字体图标，设备图为位图，全部不使用 SVG。
    </p>
    <div class="keys">
      <div v-for="k in keys" :key="k.b" class="key">
        <b>{{ k.b }}</b><span>{{ k.s }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
const keys = [
  { b: '上键', s: '短按返回 / 主页亮熄屏 · 长按回主控制页' },
  { b: '下键', s: '长按说话，松开发送' },
  { b: '手势', s: '左右滑切模式 · 右滑边缘返回' },
]
</script>
