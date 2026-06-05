'use client';

import { OrgChart, orgChartDefaultConfig } from '@/components/webparts/org-chart';
import { orgChartSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Org chart. */
export default function OrgChartDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-white min-h-screen">
      <OrgChart config={{ ...orgChartDefaultConfig, title: 'Organigramme', height: 700 }} content={orgChartSeed} />
    </main>
  );
}
