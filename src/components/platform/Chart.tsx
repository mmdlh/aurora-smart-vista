import { useEffect, useRef } from 'react';
import type { ECharts, EChartsOption } from 'echarts';

export type ChartKind = 'line' | 'bar' | 'mixed' | 'donut' | 'radar' | 'horizontal' | 'heatmap';
type ChartProps = { kind: ChartKind; labels?: string[] | undefined; names?: string[] | undefined; data?: number[][] | undefined; size?: string; period?: string; suffix?: string };
export function Chart({ kind, labels, names, data, size = '', period = '日', suffix = '' }: ChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<ECharts | null>(null);
  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    import('echarts').then(echarts => {
      const element = container.current;
      if (cancelled || !element) return;
      const css = getComputedStyle(document.documentElement);
      // Resolve semantic OKLCH tokens to sRGB for ECharts' color interpolation parser.
      const swatch = document.createElement('canvas');
      swatch.width = 1; swatch.height = 1;
      const context = swatch.getContext('2d');
      const token = (name: string) => {
        const value = css.getPropertyValue(name).trim();
        if (!context) return value;
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = value;
        context.fillRect(0, 0, 1, 1);
        const pixel = context.getImageData(0, 0, 1, 1).data;
        return `rgba(${pixel[0] ?? 0},${pixel[1] ?? 0},${pixel[2] ?? 0},${(pixel[3] ?? 255) / 255})`;
      };
      const colors: [string, string, string, string, string] = [token('--primary'), token('--cyan'), token('--success'), token('--violet'), token('--warning')];
      const ink = token('--foreground');
      const muted = token('--muted-foreground');
      const border = token('--border');
      const canvas = token('--popover');
      const chart = echarts.init(element, undefined, { renderer: 'canvas' });
      instance.current = chart;
      const ticks = labels ?? (period === '日' ? ['00:00','04:00','08:00','12:00','16:00','20:00','24:00'] : period === '周' ? ['周一','周二','周三','周四','周五','周六','周日'] : ['04月','05月','06月','07月','08月','09月','10月']);
      const seriesNames = names ?? ['在线车辆', '活跃车辆'];
      const values = data ?? [[4200,3900,7100,9300,8700,10800,9800],[2500,2200,5300,6800,6100,7900,6800]];
      const scaledValues = values.map(row => row.map((n,i) => period === '周' ? Math.round(n * (1.08 + i * .015)) : period === '月' ? Math.round(n * (1.16 + i * .025)) : n));
      const base: EChartsOption = {
        color: colors,
        textStyle: { fontFamily: 'Manrope, PingFang SC, Microsoft YaHei, sans-serif', color: ink, fontSize: 10 },
        animationDuration: 800,
        tooltip: { trigger: 'axis', backgroundColor: canvas, borderColor: border, textStyle: { color: ink, fontSize: 11 }, confine: true },
        legend: { top: 5, right: 18, itemWidth: 8, itemHeight: 5, icon: 'roundRect', textStyle: { color: muted, fontSize: 9 }, itemGap: 16 },
        grid: { left: 43, right: 22, top: 42, bottom: 30 },
        xAxis: { type: 'category', data: ticks, boundaryGap: kind !== 'line', axisLine: { lineStyle: { color: border } }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 9, hideOverlap: true } },
        yAxis: { type: 'value', splitNumber: 4, axisLabel: { color: muted, fontSize: 9, formatter: value => Number(value) >= 1000 ? `${Number(value)/1000}k` : `${value}${suffix}` }, splitLine: { lineStyle: { color: border, type: 'dashed' } } },
      };
      let specific: EChartsOption = {};
      if (kind === 'line' || kind === 'bar' || kind === 'mixed') {
        specific = { series: scaledValues.map((row,i) => {
          const isLine = kind === 'line' || (kind === 'mixed' && i > 0);
          const color = colors[i % colors.length] ?? colors[0];
          return {
            name: seriesNames[i] ?? `数据${i + 1}`, type: isLine ? 'line' : 'bar', data: row, smooth: true,
            symbol: 'circle', symbolSize: 5, showSymbol: false,
            lineStyle: { width: 2.5, color },
            barMaxWidth: 16, barGap: '40%',
            itemStyle: { borderRadius: isLine ? 0 : [4,4,0,0], color: isLine ? color : new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color},{offset:1,color:echarts.color.modifyAlpha(color,.25)}]), shadowColor: echarts.color.modifyAlpha(color,.18), shadowBlur: 7 },
            ...(isLine ? { areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:echarts.color.modifyAlpha(color,.18)},{offset:1,color:echarts.color.modifyAlpha(color,0)}]) } } : {}),
            emphasis: { focus: 'series' },
          };
        }) };
      } else if (kind === 'donut') {
        const pieNames = names ?? ['新能源车','商用车辆','乘用车辆','特种车辆'];
        const pieValues = data?.[0] ?? [42,28,22,8];
        specific = {
          tooltip: { trigger: 'item', backgroundColor: canvas, borderColor: border, textStyle: { color: ink, fontSize: 11 }, formatter: '{b}：{c} ({d}%)' },
          legend: { orient: 'vertical', top: 'center', right: 18, itemWidth: 7, itemHeight: 7, icon: 'circle', itemGap: 17, textStyle: { color: muted, fontSize: 10 } },
          xAxis: { show: false }, yAxis: { show: false },
          series: [{ type: 'pie', center: ['33%','48%'], radius: ['51%','69%'], avoidLabelOverlap: true, label: { show: false }, itemStyle: { borderWidth: 3, borderColor: canvas, borderRadius: 5, shadowBlur: 14, shadowColor: echarts.color.modifyAlpha(colors[0],.18), shadowOffsetY: 5 }, emphasis: { scaleSize: 5 }, data: pieNames.map((name,i) => ({ name, value: pieValues[i] ?? 0 })) }],
          graphic: [{ type: 'text', left: '23%', top: '40%', style: { text: '100%', fill: ink, fontSize: 24, fontWeight: 800, fontFamily: 'Manrope, sans-serif' } }, { type: 'text', left: '26%', top: '54%', style: { text: '车辆分布', fill: muted, fontSize: 9 } }],
        };
      } else if (kind === 'radar') {
        specific = {
          xAxis: { show: false }, yAxis: { show: false }, tooltip: { trigger: 'item', backgroundColor: canvas, borderColor: border, textStyle: { color: ink, fontSize: 11 } },
          legend: { top: 0, right: 14, itemWidth: 8, itemHeight: 5, textStyle: { color: muted, fontSize: 9 } },
          radar: { center: ['50%','53%'], radius: '65%', splitNumber: 4, indicator: (labels ?? ['行车安全','网络覆盖','设备健康','响应速度','通行效率','能源效率']).map(name => ({name,max:100})), axisName: { color: muted, fontSize: 9 }, splitArea: { areaStyle: { color: [echarts.color.modifyAlpha(colors[1],.015),echarts.color.modifyAlpha(colors[1],.035)] } }, splitLine: { lineStyle: { color: border } }, axisLine: { lineStyle: { color: border } } },
          series: [{ type: 'radar', symbol: 'circle', symbolSize: 4, data: (data ?? [[94,88,92,97,89,86],[75,72,80,85,73,75]]).map((value,i) => ({ value, name: names?.[i] ?? (i === 0 ? '当前表现' : '行业均值'), lineStyle: { width: 2 }, areaStyle: { color: colors[i] ?? colors[0], opacity: .13 } })) }],
        };
      } else if (kind === 'horizontal') {
        specific = { legend: { show: false }, grid: { left: 67, right: 35, top: 15, bottom: 28 }, xAxis: { type: 'value', axisLabel: { color: muted, fontSize: 9 }, splitLine: { lineStyle: { color: border, type: 'dashed' } } }, yAxis: { type: 'category', inverse: true, data: labels ?? ['浦东新区','闵行区','徐汇区','黄浦区','嘉定区'], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 10 } }, series: [{ type: 'bar', barWidth: 12, showBackground: true, backgroundStyle: { color: echarts.color.modifyAlpha(colors[0],.04), borderRadius: 4 }, data: data?.[0] ?? [92,85,76,68,57], itemStyle: { borderRadius: [0,4,4,0], color: new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:colors[0]},{offset:1,color:colors[1]}]) }, label: { show: true, position: 'right', color: muted, fontSize: 10 } }] };
      } else {
        specific = { legend: { show: false }, grid: { left: 60, right: 25, top: 15, bottom: 50 }, xAxis: { type: 'category', data: ['06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00'], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 9 } }, yAxis: { type: 'category', data: ['浦东新区','黄浦区','徐汇区','闵行区','嘉定区'], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 9 } }, visualMap: { min: 0, max: 100, calculable: false, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 9, itemHeight: 100, text: ['高','低'], textStyle: { color: muted, fontSize: 9 }, inRange: { color: [token('--accent'),colors[1],colors[0]] } }, series: [{ type: 'heatmap', data: Array.from({length:40},(_,i) => [i % 8,Math.floor(i/8),20+(i*37)%80]), itemStyle: { borderWidth: 3, borderColor: canvas, borderRadius: 3 }, emphasis: { itemStyle: { shadowBlur: 8, shadowColor: colors[1] } } }] };
      }
      // Whole option replacement prevents stale series/axes across kind and period changes.
      chart.setOption({ ...base, ...specific }, { notMerge: true });
      observer = new ResizeObserver(() => chart.resize());
      observer.observe(element);
    });
    return () => { cancelled = true; observer?.disconnect(); instance.current?.dispose(); instance.current = null; };
  }, [kind, labels, names, data, period, suffix]);
  return <div ref={container} className={`chart-canvas ${size}`} role="img" aria-label={`${names?.join('、') ?? '车联网数据'}${kind === 'radar' ? '雷达图' : kind === 'donut' ? '占比图' : '趋势图'}`} />;
}
