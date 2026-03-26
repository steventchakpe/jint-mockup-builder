import { lazy } from 'react';
import type { WebpartDefinition } from '@/types/webparts';
import { newsDefaultConfig, newsConfigMeta } from '@/components/webparts/news';

/**
 * Webpart Registry
 *
 * Adding a new webpart = adding one entry here.
 * The component is lazy-loaded, so it's only fetched when rendered.
 *
 * Steps to add a new webpart:
 * 1. Create the webpart folder: src/components/webparts/{type-id}/
 * 2. Generate files with Bridge: /jint:generate-webpart {type-id}
 * 3. Add one entry below
 */
const registry: Record<string, WebpartDefinition> = {
  // ============================================
  // WAVE 1 — High-impact demo (Phase 1)
  // ============================================

  'news': {
    typeId: newsConfigMeta.typeId,
    name: 'Actualités',
    nameEn: newsConfigMeta.displayName,
    category: newsConfigMeta.category as WebpartDefinition['category'],
    icon: newsConfigMeta.icon,
    wave: newsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/news').then((m) => ({ default: m.News as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/news/News.skeleton').then((m) => ({ default: m.NewsSkeleton as never }))),
    configurableProperties: newsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: 'options' in p ? p.options : undefined,
      defaultValue: newsDefaultConfig[p.key as keyof typeof newsDefaultConfig],
    })),
    defaultConfig: newsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { articles: [] },
  },
  // 'focus': { ... },
  // 'events': { ... },
  // 'employee-directory': { ... },
  // 'search': { ... },
  // 'newcomers': { ... },
  // 'anniversary': { ... },
  // 'separator': { ... },

  // ============================================
  // WAVE 2 — Productivity & engagement (Phase 2)
  // ============================================

  // 'my-apps': { ... },
  // 'org-chart': { ... },
  // 'profile': { ... },
  // 'newshub': { ... },
  // 'my-tasks': { ... },
  // 'docs': { ... },
  // 'my-emails': { ... },
  // 'my-meetings': { ... },
  // 'viva-engage': { ... },
  // 'text': { ... },

  // ============================================
  // WAVE 3 — Complements & variants (Phase 4)
  // ============================================

  // 'news-v2': { ... },
  // 'focus-v3': { ... },
  // 'image-interactive': { ... },
  // 'my-resume': { ... },
  // 'action-button': { ... },
  // 'search-bar': { ... },
  // 'poll': { ... },
  // 'idea-box': { ... },
  // 'video': { ... },
  // 'embed': { ... },
  // 'weather': { ... },
  // 'world-clock': { ... },
};

export function getWebpart(typeId: string): WebpartDefinition | undefined {
  return registry[typeId];
}

export function getAllWebparts(): WebpartDefinition[] {
  return Object.values(registry);
}

export function getWebpartsByWave(wave: 1 | 2 | 3): WebpartDefinition[] {
  return Object.values(registry).filter((wp) => wp.wave === wave);
}

export function getWebpartsByCategory(category: string): WebpartDefinition[] {
  return Object.values(registry).filter((wp) => wp.category === category);
}

export default registry;
