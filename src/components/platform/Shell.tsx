import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Bell, CalendarDays, ChevronDown, Fullscreen, HelpCircle, Radio, RefreshCw, UserRound, X, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import city from '@/assets/connected-city.jpg';
import { menus } from './data';

type PlatformState = { region: string; period: string; date: string; revision: number };
const PlatformContext = createContext<PlatformState>({ region:'上海市全域',period:'日',date:'2026-10-09',revision:0 });
export const usePlatform = () => useContext(PlatformContext);
export function PlatformShell({ children }: { children: ReactNode }) {
  const path = useLocation({select:location => location.pathname});
  const current = menus.find(menu => menu.path === path) ?? menus[0];
  const [region,setRegion] = useState('上海市全域');
  const [period,setPeriod] = useState('日');
  const [date,setDate] = useState('2026-10-09');
  const [revision,setRevision] = useState(0);
  const [refreshing,setRefreshing] = useState(false);
  const [notifications,setNotifications] = useState(false);
  const [help,setHelp] = useState(false);
  const [clock,setClock] = useState('15:19:00');
  useEffect(() => { const tick = () => setClock(new Date().toLocaleTimeString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false}));tick();const id=setInterval(tick,1000);return()=>clearInterval(id); },[]);
  const refresh = () => { setRefreshing(true);window.setTimeout(()=>{setRevision(value=>value+1);setRefreshing(false);toast.success('数据已刷新',{description:'当前展示为车联网演示数据'});},600); };
  const fullscreen = async () => { try { if(document.fullscreenElement) await document.exitFullscreen();else await document.documentElement.requestFullscreen(); } catch { toast.error('当前浏览器暂不支持全屏'); } };
  return <PlatformContext.Provider value={{region,period,date,revision}}><div className="platform">
    <img src={city} width={1920} height={1024} className="ambient-background" alt="" aria-hidden="true" />
    <header className="top-nav"><div className="brand"><div className="brand-mark"><Radio strokeWidth={1.8}/></div><div><h1>智慧车联网平台</h1><p>INTELLIGENT VEHICLE NETWORK</p></div></div>
      <nav className="menu-links" aria-label="一级导航">{menus.map(({path:to,label,icon:Icon})=><Button asChild variant="ghost" className="menu-link" data-active={path===to} key={to}><Link to={to} aria-current={path===to?'page':undefined}><Icon/><span>{label}</span></Link></Button>)}</nav>
      <div className="nav-tools"><div className="notification-wrap"><Button variant="ghost" size="icon" title="消息通知" aria-label="消息通知" onClick={()=>setNotifications(!notifications)}><Bell/></Button><i className="notification-dot"/>{notifications&&<div className="notification-popover"><h4>消息通知 <span className="status-pill blue">3 条新消息</span></h4><p><span className="live-dot warning"/>浦东路侧设备有 1 台离线</p><small>设备运维 · 2 分钟前</small><p><span className="live-dot"/>车队日报已生成</p><small>车辆管理 · 15 分钟前</small><p><span className="live-dot"/>系统更新 v3.2.6 已完成</p><small>系统通知 · 1 小时前</small><Button variant="link" onClick={()=>{setNotifications(false);toast.success('全部消息已标记为已读');}}>全部标为已读 <CheckCircle2/></Button></div>}</div><Button variant="ghost" size="icon" aria-label="全屏显示" title="全屏显示" onClick={fullscreen}><Fullscreen/></Button><Button variant="ghost" size="icon" title="平台信息" aria-label="平台信息" onClick={()=>setHelp(true)}><HelpCircle/></Button><Button variant="ghost" size="icon" className="avatar" title="管理员" aria-label="管理员信息" onClick={()=>setHelp(true)}><UserRound/></Button></div>
    </header>
    <main className="workspace"><div className="page-heading"><div><h2>{current.label}<span className="text-primary"> / </span><span className="text-muted-foreground text-sm font-normal">{path==='/'?'Overview':path==='/vehicles'?'Vehicles':path==='/traffic'?'Traffic':path==='/safety'?'Safety':path==='/energy'?'Energy':path==='/analytics'?'Analytics':'Devices'}</span></h2><p><span className="live-dot"/>{current.subtitle}<span className="text-muted-foreground">|</span>数据实时更新</p></div><div className="heading-actions"><select className="filter-select" aria-label="区域筛选" value={region} onChange={event=>setRegion(event.target.value)}>{['上海市全域','浦东新区','闵行区','徐汇区','黄浦区','嘉定区'].map(item=><option key={item}>{item}</option>)}</select><label className="date-control"><CalendarDays size={13}/><input type="date" aria-label="数据日期" value={date} max="2026-10-09" onChange={event=>setDate(event.target.value)}/><ChevronDown size={11}/></label><select className="filter-select" aria-label="统计周期" value={period} onChange={event=>setPeriod(event.target.value)}><option value="日">今日概览</option><option value="周">本周概览</option><option value="月">本月概览</option></select><Button variant="outline" size="icon" aria-label="刷新数据" title="刷新数据" onClick={refresh} disabled={refreshing}><RefreshCw className={refreshing?'spin':''}/></Button></div></div>
    <div key={path}>{children}</div><footer className="footer"><span><span className="live-dot"/>系统运行正常 <span>·</span> 数据更新时间 {clock} <span>·</span> 演示数据</span><span>智慧车联网平台 v3.2.6 <span>｜</span> 让连接更智慧，让出行更美好</span></footer></main>
    {help&&<div className="modal-overlay" onClick={()=>setHelp(false)}><section className="detail-modal" role="dialog" aria-modal="true" aria-label="平台信息" onClick={event=>event.stopPropagation()}><div className="modal-title"><h3>智慧车联网平台</h3><Button size="icon" variant="ghost" aria-label="关闭" onClick={()=>setHelp(false)}><X/></Button></div><div className="detail-grid"><div><small>当前用户</small><b>平台管理员</b></div><div><small>平台版本</small><b>v3.2.6</b></div><div><small>运行环境</small><b>演示环境</b></div><div><small>数据范围</small><b>上海市车联网示例数据</b></div></div><div className="modal-foot"><Button onClick={()=>setHelp(false)}>确认</Button></div></section></div>}
    <Toaster position="top-right" richColors />
  </div></PlatformContext.Provider>;
}
export function downloadCsv(title:string, headers:string[], rows:string[][]) {
  const escaped = (value:string) => `"${value.replaceAll('"','""')}"`;
  const csv = '\uFEFF'+[headers,...rows].map(row=>row.map(escaped).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const link=document.createElement('a');link.href=url;link.download=`${title}.csv`;link.click();URL.revokeObjectURL(url);toast.success('报表已导出');
}
export function ExportButton({onClick}:{onClick:()=>void}) { return <Button variant="ghost" size="sm" onClick={onClick} className="text-primary"><Download/><span>导出报表</span></Button>; }
