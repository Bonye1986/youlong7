<template>
  <BoardLayout
    title="6 · 设备管理与切换"
    sub="默认自动重连最近设备；最近设备不在附近或需要更换时进入列表。助力中禁止切换，防止运动中断连。共 8 个状态。"
  >
    <WatchCard
      title="设备列表"
      tag="可交互"
      desc="当前设备置顶高亮。点「在附近」设备发起切换，点不在附近的设备提示，长按打开操作菜单。"
      :active="s === 'list'"
    >
      <DeviceList interactive />
    </WatchCard>

    <WatchCard
      title="最近设备不在附近"
      desc="自动重连失败但有其他配对设备时，直接打开列表让用户选择，不自动连其他设备。"
      :active="s === 'missing'"
    >
      <DeviceList interactive missing-current hint="如影-A3F2 不在附近" />
    </WatchCard>

    <WatchCard title="切换确认" desc="已连接设备时，选另一台先确认，避免误触断开。" :active="s === 'confirm'">
      <div class="center">
        <div class="ic"><MsIcon name="swap_horiz" /></div>
        <div class="t1">切换设备？</div>
        <div class="t2">将断开 如影-A3F2<br />连接 如影-7C19</div>
        <div class="btns">
          <RouterLink class="gbtn" :to="{ path: '/devices', query: { s: 'list' } }">取消</RouterLink>
          <RouterLink class="pbtn" :to="{ path: '/devices', query: { s: 'switching' } }">切换</RouterLink>
        </div>
      </div>
    </WatchCard>

    <WatchCard
      title="助力中禁止切换"
      desc="档位大于 0 或检测到运动时拦截切换，设备同步播报「请先停止助力」。"
      :active="s === 'busy'"
    >
      <div class="center">
        <div class="ic warn"><MsIcon name="front_hand" /></div>
        <div class="t1">请先停止助力</div>
        <div class="t2">设备正在助力（4 档），运动中断开有摔倒风险</div>
        <RouterLink class="pbtn" to="/control">返回控制页</RouterLink>
      </div>
    </WatchCard>

    <WatchCard
      title="切换中"
      tag="点击跳转"
      desc="已断开旧设备，外圈进度环旋转，连接新设备。"
      :active="s === 'switching'"
      :to="'/devices?s=done'"
    >
      <div class="arc" />
      <div class="center">
        <img class="devimg" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div class="t1" style="margin-top: 6px">正在连接 如影-7C19</div>
        <div class="t2">已断开 如影-A3F2</div>
      </div>
    </WatchCard>

    <WatchCard
      title="切换成功"
      tag="点击跳转"
      desc="设备播报「已连接 如影-7C19」，手表同步显示文字，约 1 秒后进入主控制页。"
      :active="s === 'done'"
      to="/control"
    >
      <div class="center">
        <div class="ic grad"><MsIcon name="check" fill /></div>
        <div class="t1">已连接 如影-7C19</div>
        <div class="speaking"><span class="eq"><i /><i /><i /><i /></span>设备播报中</div>
      </div>
    </WatchCard>

    <WatchCard title="长按操作菜单" desc="对列表中的设备长按，可重命名或删除配对记录。" :active="s === 'menu'">
      <div class="center">
        <img class="devthumb" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div class="t1" style="margin-top: 6px">如影-7C19</div>
        <div class="menu">
          <button><MsIcon name="edit" size="16" />重命名</button>
          <button class="danger"><MsIcon name="link_off" size="16" />删除配对</button>
        </div>
        <RouterLink class="lnk" :to="{ path: '/devices', query: { s: 'list' } }">取消</RouterLink>
      </div>
    </WatchCard>

    <WatchCard title="设备已满" desc="最多保存 5 台设备，添加新设备前需先删除一台。" :active="s === 'full'">
      <div class="center">
        <div class="ic"><MsIcon name="devices" /></div>
        <div class="t1">已保存 5 台设备</div>
        <div class="t2">请先删除一台旧设备，再添加新设备</div>
        <RouterLink class="pbtn" :to="{ path: '/devices', query: { s: 'list' } }">管理设备</RouterLink>
      </div>
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import DeviceList from '../components/DeviceList.vue'
import MsIcon from '../components/MsIcon.vue'

const route = useRoute()
const s = computed(() => route.query.s)
</script>
