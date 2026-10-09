import { createFileRoute } from '@tanstack/react-router';
import { SafetyPage } from '@/components/platform/Pages';
import { pageHead } from '@/components/platform/head';
export const Route = createFileRoute('/safety')({
  head: () => pageHead('安全预警','主动风险识别、安全预警处置与多维安全防护。'),
  component: SafetyPage,
});
