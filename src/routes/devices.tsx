import { createFileRoute } from '@tanstack/react-router';
import { DevicesPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/devices')({
  head: () => pageHead('设备运维','车路云网络拓扑、联网设备台账与智能设备巡检。'),
  component: DevicesPage,
});
