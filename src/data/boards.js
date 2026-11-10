export const BOARDS = [
  {
    path: '/connect',
    name: '启动与连接',
    count: 7,
    desc: '启动页、重连、扫描、发现设备、连接成功、蓝牙未开启、未发现设备',
    component: () => import('../views/ConnectView.vue'),
  },
  {
    path: '/control',
    name: '主控制页',
    count: 3,
    desc: '运动 / 抗阻 / 放松三种模式，外圈 1–10 档位环可拖动',
    component: () => import('../views/ControlView.vue'),
  },
  {
    path: '/scene',
    name: '场景选择页',
    count: 3,
    desc: '三种模式的场景环形选择，点选即下发',
    component: () => import('../views/SceneView.vue'),
  },
  {
    path: '/voice',
    name: 'AI 语音页',
  count: 6,
  desc: '待机、录音、识别、闲聊回复、播放音乐、设备控制',
    component: () => import('../views/VoiceView.vue'),
  },
  {
    path: '/device',
    name: '设备信息与全局浮层',
    count: 3,
    desc: '设备信息页、断连浮层、操作提示',
    component: () => import('../views/DeviceView.vue'),
  },
  {
    path: '/devices',
    name: '设备管理与切换',
    count: 8,
    desc: '设备列表、最近设备不在附近、切换确认、助力中禁止切换、切换中、切换成功、长按菜单、设备已满',
    component: () => import('../views/DevicesView.vue'),
  },
]
