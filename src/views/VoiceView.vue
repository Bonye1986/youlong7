<template>
  <BoardLayout title="4 · AI 语音页" sub="长按下键或屏幕麦克风进入。设备负责语音播报，手表同步显示文字。共 5 个状态。">
    <WatchCard title="录音中" desc="按住时边缘声波随音量跳动，上滑取消。">
      <VoiceBars />
      <div class="center">
        <div class="micbig"><MsIcon name="mic" fill /></div>
        <div class="t1" style="margin-top: 20px">正在聆听</div>
        <div class="t2">松开发送 · 上滑取消</div>
      </div>
    </WatchCard>

    <WatchCard title="识别中" desc="松开后显示思考动画。">
      <div class="center">
        <div class="think"><i /><i /><i /></div>
        <div class="t1" style="margin-top: 18px">识别中</div>
        <div class="t2">正在理解你的指令</div>
      </div>
    </WatchCard>

    <WatchCard title="闲聊回复" desc="文字可滚动，设备同步语音播报。">
      <div class="center">
        <div class="small"><MsIcon name="smart_toy" size="14" /> AI 助手</div>
        <div class="reply">
          今天户外气温 12°C，路面有积雪。建议使用运动模式的雪地场景，档位保持在 5 到 6 档，步伐放慢一些会更稳。
        </div>
        <div class="speaking"><span class="eq"><i /><i /><i /><i /></span>设备播报中</div>
      </div>
    </WatchCard>

    <WatchCard title="设备控制" desc="识别出控制指令后执行，并同步到主控制页。">
      <div class="center">
        <div class="ic grad"><MsIcon name="check" fill /></div>
        <div class="t1">已执行</div>
        <div class="cmd">切换到 <b>运动 · 雪地</b><br />档位 <b>6</b></div>
      </div>
    </WatchCard>

    <WatchCard title="识别失败" desc="可直接再次长按下键重试。">
      <div class="center">
        <div class="ic err"><MsIcon name="hearing_disabled" /></div>
        <div class="t1">没听清</div>
        <div class="t2">请按住下键再说一次</div>
      </div>
    </WatchCard>
  </BoardLayout>
</template>

<script setup>
import BoardLayout from '../components/BoardLayout.vue'
import WatchCard from '../components/WatchCard.vue'
import MsIcon from '../components/MsIcon.vue'
import VoiceBars from '../components/VoiceBars.vue'
</script>
