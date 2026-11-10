<template>
  <BoardLayout title="5 · 设备信息与全局浮层" sub="主控制页上滑进入设备信息；断连与操作提示在任意页面出现。">
    <WatchCard title="设备信息页" desc="型号、蓝牙编号，以及电量、时长、温度、里程。">
      <div class="center" style="padding-top: 4px">
        <img class="devthumb" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div style="font-size: 13px; font-weight: 600; margin-top: 2px">如影 SD-H Plus</div>
        <div class="small">BT 3A:7F:21:C4</div>
        <div class="stats">
          <div v-for="s in stats" :key="s.l" class="stat"><b>{{ s.v }}</b><span>{{ s.l }}</span></div>
        </div>
        <div class="btns">
          <RouterLink class="gbtn" to="/devices?s=list">切换设备</RouterLink>
          <RouterLink class="obtn" to="/connect">断开</RouterLink>
        </div>
      </div>
    </WatchCard>

    <WatchCard title="断连浮层" desc="控制区变灰不可用，重连成功后自动恢复。">
      <div class="dim"><MainControl :m="0" :s="5" :level="4" /></div>
      <div class="banner" role="alert"><span class="mini" />设备已断开，正在重连</div>
    </WatchCard>

    <WatchCard title="操作提示" desc="切换模式或场景后的轻量反馈，1.4 秒后消失。">
      <MainControl :m="1" :s="1" :level="6" toast="已切换到 抗阻 · 5kg" />
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import MainControl from '../components/MainControl.vue'

const stats = [
  { v: '78%', l: '电量' },
  { v: '2h', l: '工作时长' },
  { v: '35°C', l: '温度' },
  { v: '10km', l: '里程' },
]
</script>
