import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/analytics')({
  head: () => pageHead('数据分析','车联网多维数据洞察、出行效率分析与运营价值评估。'),
  component: AnalyticsPage,
});
