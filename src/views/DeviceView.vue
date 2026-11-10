<template>
  <BoardLayout title="5 · 设备信息与全局浮层" sub="主控制页上滑进入设备信息；断连与操作提示在任意页面出现。">
    <WatchCard title="设备信息页" desc="型号、蓝牙编号，以及电量、时长、温度、里程。">
      <div
        class="dring"
        :style="{ '--p': battery }"
        role="meter"
        aria-label="设备电量"
        :aria-valuenow="battery"
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <div class="center dinfo">
        <div class="dbat"><span class="ms" aria-hidden="true">battery_5_bar</span>{{ battery }}%</div>
        <img class="dimg" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div class="dname">如影 SD-H Plus</div>
        <div class="dbt">BT 3A:7F:21:C4</div>
        <dl class="dstat">
          <div v-for="s in stats" :key="s.l">
            <dt>{{ s.l }}</dt>
            <dd>{{ s.v }}</dd>
          </div>
        </dl>
        <div class="dacts">
          <RouterLink class="dact" to="/devices?s=list"><span class="ms" aria-hidden="true">swap_horiz</span>切换</RouterLink>
          <RouterLink class="dact off" to="/connect"><span class="ms" aria-hidden="true">link_off</span>断开</RouterLink>
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

const battery = 78

const stats = [
  { v: '2h', l: '时长' },
  { v: '35°C', l: '温度' },
  { v: '10km', l: '里程' },
]
</script>
