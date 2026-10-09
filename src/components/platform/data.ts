import { Activity, Car, Cpu, Database, Gauge, LayoutDashboard, Leaf, Radio, Route, ShieldCheck, Signal, TrafficCone, Truck, Wifi, Zap } from 'lucide-react';
export const menus = [
  { path: '/', label: '全域总览', icon: LayoutDashboard, subtitle: '全域感知 · 智慧协同 · 实时洞察' },
  { path: '/vehicles', label: '车辆管理', icon: Car, subtitle: '车队资产 · 运行监测 · 全生命周期管理' },
  { path: '/traffic', label: '交通态势', icon: Route, subtitle: '路网感知 · 车路协同 · 智慧通行' },
  { path: '/safety', label: '安全预警', icon: ShieldCheck, subtitle: '风险识别 · 主动防护 · 闭环处置' },
  { path: '/energy', label: '能源管理', icon: Zap, subtitle: '绿色出行 · 充电协同 · 能效优化' },
  { path: '/analytics', label: '数据分析', icon: Activity, subtitle: '多维洞察 · 趋势研判 · 价值挖掘' },
  { path: '/devices', label: '设备运维', icon: Cpu, subtitle: '端云协同 · 智能运维 · 稳定连接' },
] as const;
export const overviewStats = [
  { label: '接入车辆总数', value: '28,635', unit: '辆', change: '12.8%', icon: Car, tone: 'blue' },
  { label: '实时在线车辆', value: '24,892', unit: '辆', change: '8.6%', icon: Radio, tone: 'cyan' },
  { label: '今日行驶里程', value: '186.5', unit: '万km', change: '15.2%', icon: Gauge, tone: 'green' },
  { label: '车路协同设备', value: '1,286', unit: '台', change: '6.3%', icon: Cpu, tone: 'violet' },
  { label: '今日预警事件', value: '37', unit: '起', change: '18.5%', icon: ShieldCheck, tone: 'amber', down: true },
  { label: '累计减碳量', value: '8,462', unit: '吨', change: '22.4%', icon: Leaf, tone: 'green' },
];
export const vehicleStats = [
  { label: '车辆资产总数', value: '28,635', unit: '辆', change: '12.8%', icon: Car, tone: 'blue' },
  { label: '车队在线率', value: '86.9', unit: '%', change: '3.2%', icon: Signal, tone: 'cyan' },
  { label: '今日活跃车辆', value: '21,456', unit: '辆', change: '8.5%', icon: Truck, tone: 'green' },
  { label: '平均健康评分', value: '96.8', unit: '分', change: '2.6%', icon: ShieldCheck, tone: 'violet' },
];
export const trafficStats = [
  { label: '路网通行指数', value: '1.32', unit: '', change: '8.2%', icon: Route, tone: 'cyan', down: true },
  { label: '平均通行速度', value: '42.6', unit: 'km/h', change: '12.3%', icon: Gauge, tone: 'blue' },
  { label: '协同路口', value: '328', unit: '个', change: '6.8%', icon: TrafficCone, tone: 'violet' },
  { label: '绿波通行效率', value: '92.7', unit: '%', change: '5.6%', icon: Signal, tone: 'green' },
];
export const energyStats = [
  { label: '今日充电总量', value: '128.6', unit: 'MWh', change: '16.2%', icon: Zap, tone: 'blue' },
  { label: '充电桩在线数', value: '2,156', unit: '台', change: '9.4%', icon: Radio, tone: 'cyan' },
  { label: '可再生能源占比', value: '68.2', unit: '%', change: '8.7%', icon: Leaf, tone: 'green' },
  { label: '今日减碳量', value: '86.4', unit: '吨', change: '21.3%', icon: Leaf, tone: 'violet' },
];
export const deviceStats = [
  { label: '设备接入总数', value: '1,286', unit: '台', change: '6.3%', icon: Cpu, tone: 'blue' },
  { label: '设备在线率', value: '99.8', unit: '%', change: '0.6%', icon: Wifi, tone: 'cyan' },
  { label: '平均网络延迟', value: '12', unit: 'ms', change: '15.3%', icon: Signal, tone: 'green', down: true },
  { label: '日均数据吞吐量', value: '8.6', unit: 'TB', change: '18.2%', icon: Database, tone: 'violet' },
];
export type Row = { id: string; fields: string[]; status: string; region: string };
export const vehicles: Row[] = Array.from({length:36},(_,i) => ({
  id: `VH-2026-${String(i+1).padStart(4,'0')}`,
  fields: [`沪${['A','B','D','F'][i%4]}·${['D1286','K3658','AF529','D8762','K9217','D5632'][i%6]}`, ['新能源公交','物流运输车','智能网联车','城市出租车'][i%4], ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5], `${[42.6,36.8,52.3,0,48.5,32.6][i%6]} km/h`, `${[86,72,93,58,81,67][i%6]}%`, `${[96,92,98,89,95,94][i%6]} 分`],
  status: i%11===8 ? '待检修' : i%7===3 ? '停泊中' : '行驶中', region: ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5],
}));
export const events: Row[] = Array.from({length:24},(_,i) => ({
  id: `AL-${String(10286+i)}`,
  fields: [`AL-${String(10286+i)}`, ['车辆超速预警','设备离线提醒','电池温度异常','道路拥堵预警','疲劳驾驶预警','通信延迟预警'][i%6], ['沪A·D1286','RSU-PD-082','沪D·AF529','龙阳路 / 申江路','沪B·K9217','OBU-XH-015'][i%6], ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5], `2026-10-09 ${['15:18:42','15:16:28','15:12:05','15:08:36','15:02:19','14:58:42'][i%6]}`, ['中风险','低风险','高风险'][i%3]],
  status: i%3 === 2 ? '待处理' : i%3 === 1 ? '处理中' : '已处理', region: ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5],
}));
export const devices: Row[] = Array.from({length:25},(_,i) => ({
  id: `RSU-${['PD','MH','XH','HP','JD'][i%5]}-${String(82+i).padStart(3,'0')}`,
  fields: [`RSU-${['PD','MH','XH','HP','JD'][i%5]}-${String(82+i).padStart(3,'0')}`, ['路侧单元 RSU','车载单元 OBU','边缘计算 MEC','智能摄像头'][i%4], ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5], 'v3.2.6', `${[12,8,15,10,11][i%5]} ms`, `${[38,42,36,45,39][i%5]}°C`], status: i%9 === 4 ? '离线' : i%8 === 3 ? '待升级' : '在线', region: ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5],
}));
export const roadRows: Row[] = Array.from({length:18},(_,i) => ({id:`RD-${i}`, fields:[['世纪大道','龙阳路','沪闵高架路','延安东路','嘉闵高架路','内环高架路'][i%6],['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5],`${[42.6,35.2,51.8,28.5,62.1][i%5]} km/h`,`${[1326,1852,2186,982,1685][i%5]} 辆/h`,`${[1.25,1.58,1.12,1.82,1.08][i%5]}`,`${[95,92,98,89,96][i%5]}%`],status:i%4===3?'缓行':'畅通',region:['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'][i%5]}));
