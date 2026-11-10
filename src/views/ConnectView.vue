<template>
  <BoardLayout title="1 · 启动与连接" sub="首次进入自动扫描；有缓存设备时直接重连。共 7 个状态。">
    <WatchCard title="启动页" desc="品牌光环旋转，读取缓存设备 ID 后自动跳转。">
      <div class="glow" />
      <div class="center">
        <div class="brand">如影</div>
        <div class="small" style="margin-top: 6px">优龙机器人</div>
        <div class="small" style="position: absolute; bottom: 34px">SD-H Plus</div>
      </div>
    </WatchCard>

    <WatchCard title="重连中" desc="有缓存设备时，外圈进度环旋转，直接尝试重连。">
      <div class="arc" />
      <div class="center">
        <img class="devimg" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div class="t1" style="margin-top: 6px">正在重连</div>
        <div class="t2">如影 SD-H Plus</div>
      </div>
    </WatchCard>

    <WatchCard title="扫描中" desc="无缓存设备时，雷达扫描附近设备。">
      <div class="rings" />
      <div class="radar" />
      <div class="center">
        <div class="ic"><MsIcon name="bluetooth_searching" /></div>
        <div class="t1">正在搜索设备</div>
        <div class="t2">请将设备开机并靠近手表</div>
      </div>
    </WatchCard>

    <WatchCard title="发现设备 · 自动连接" desc="扫描到设备后自动发起连接，无需点击。">
      <div class="center">
        <img class="devimg" src="/img/device.png" alt="如影 SD-H Plus 设备" />
        <div class="t1" style="margin-top: 6px">发现 如影 SD-H Plus</div>
        <div class="t2">自动连接中…</div>
        <div class="bar"><i /></div>
      </div>
    </WatchCard>

    <WatchCard title="连接成功" tag="点击跳转" desc="打勾动画约 1 秒后进入主控制页。" to="/control">
      <div class="center">
        <div class="ic grad"><MsIcon name="check" fill /></div>
        <div class="t1">连接成功</div>
        <div class="t2">即将进入控制页</div>
      </div>
    </WatchCard>

    <WatchCard title="蓝牙未开启" desc="提示开启蓝牙，点击重试重新检测。">
      <div class="center">
        <div class="ic err"><MsIcon name="bluetooth_disabled" /></div>
        <div class="t1">蓝牙未开启</div>
        <div class="t2">请在手表设置中打开蓝牙</div>
        <button class="pbtn">重试</button>
      </div>
    </WatchCard>

    <WatchCard title="未发现设备" desc="扫描超时后显示，可重新扫描。">
      <div class="center">
        <div class="ic"><MsIcon name="search_off" /></div>
        <div class="t1">未发现设备</div>
        <div class="t2">确认设备已开机且电量充足</div>
        <button class="pbtn">重新扫描</button>
      </div>
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import MsIcon from '../components/MsIcon.vue'
</script>
