import { createFileRoute } from '@tanstack/react-router';
import { EnergyPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/energy')({
  head: () => pageHead('能源管理','充电负荷、绿色能源调度、充电站运营与减碳收益分析。'),
  component: EnergyPage,
});
