import { createFileRoute } from '@tanstack/react-router';
import { OverviewPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/')({
  head: () => pageHead('全域总览','智慧车联网全域态势：实时车辆、车路协同数字孪生、交通趋势与安全预警。'),
  component: OverviewPage,
});
