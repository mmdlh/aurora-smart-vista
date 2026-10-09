import { createFileRoute } from '@tanstack/react-router';
import { VehiclesPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/vehicles')({
  head: () => pageHead('车辆管理','车队资产全生命周期管理、车辆实时监测与健康评估。'),
  component: VehiclesPage,
});
