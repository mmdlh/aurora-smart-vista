import { createFileRoute } from '@tanstack/react-router';
import { TrafficPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/traffic')({
  head: () => pageHead('交通态势','全域路网态势、车流量分析与智慧信号协同。'),
  component: TrafficPage,
});
