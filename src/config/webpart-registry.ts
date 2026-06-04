import { lazy } from 'react';
import type { ConfigurableProperty, WebpartDefinition } from '@/types/webparts';

/** Prop brute déclarée dans un configMeta de webpart. */
type RawProp = {
  key: string;
  label: string;
  type: ConfigurableProperty['type'];
  options?: Array<{ value: string; label: string }>;
  defaultValue?: unknown;
  target?: 'config' | 'content';
  path?: Array<string | number>;
  onValue?: unknown;
  offValue?: unknown;
};

/** Construit les ConfigurableProperty du panneau : defaultValue explicite OU repris de defaultConfig. */
function buildProps(props: RawProp[], defaultConfig: Record<string, unknown>): ConfigurableProperty[] {
  return props.map((p) => ({
    key: p.key,
    label: p.label,
    type: p.type,
    options: p.options,
    defaultValue: p.defaultValue !== undefined ? p.defaultValue : defaultConfig[p.key],
    target: p.target,
    path: p.path,
    onValue: p.onValue,
    offValue: p.offValue,
  }));
}
import { newsDefaultConfig, newsConfigMeta } from '@/components/webparts/news';
import { eventsDefaultConfig, eventsConfigMeta } from '@/components/webparts/events';
import { focusDefaultConfig, focusConfigMeta } from '@/components/webparts/focus';
import { separatorDefaultConfig, separatorConfigMeta } from '@/components/webparts/separator';
import { employeeDirectoryDefaultConfig, employeeDirectoryConfigMeta } from '@/components/webparts/employee-directory';
import {
  newcomersDefaultConfig,
  anniversaryDefaultConfig,
  newcomersConfigMeta,
  anniversaryConfigMeta,
} from '@/components/webparts/people';
import { searchDefaultConfig, searchConfigMeta } from '@/components/webparts/search';
import { myAppsDefaultConfig, myAppsConfigMeta } from '@/components/webparts/my-apps';

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
  'focus': {
    typeId: focusConfigMeta.typeId,
    name: 'Focus',
    nameEn: focusConfigMeta.displayName,
    category: focusConfigMeta.category as WebpartDefinition['category'],
    icon: focusConfigMeta.icon,
    wave: focusConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/focus').then((m) => ({ default: m.Focus as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/focus/Focus.skeleton').then((m) => ({ default: m.FocusSkeleton as never }))),
    configurableProperties: buildProps(
      focusConfigMeta.configurableProps as RawProp[],
      focusDefaultConfig as unknown as Record<string, unknown>,
    ),
    defaultConfig: focusDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: {
      card: {
        position: 'fill',
        tag: { value: 'À la une', alignment: 'left' },
        title: { value: 'Titre du focus', alignment: 'left', color: '#ffffff' },
        description: { value: 'Décrivez ici le contenu mis en avant.', alignment: 'left', color: '#ffffff' },
      },
      redirection: {
        linkUrl: '#',
        buttonProps: { value: 'En savoir plus', alignment: 'left', type: 'primary', position: 'below', visible: true },
      },
    },
  },

  'events': {
    typeId: eventsConfigMeta.typeId,
    name: 'Événements',
    nameEn: eventsConfigMeta.displayName,
    category: eventsConfigMeta.category as WebpartDefinition['category'],
    icon: eventsConfigMeta.icon,
    wave: eventsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/events').then((m) => ({ default: m.Events as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/events/Events.skeleton').then((m) => ({ default: m.EventsSkeleton as never }))),
    configurableProperties: eventsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: eventsDefaultConfig[p.key as keyof typeof eventsDefaultConfig],
    })),
    defaultConfig: eventsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { events: [] },
  },

  'employee-directory': {
    typeId: employeeDirectoryConfigMeta.typeId,
    name: 'Trombinoscope',
    nameEn: employeeDirectoryConfigMeta.displayName,
    category: employeeDirectoryConfigMeta.category as WebpartDefinition['category'],
    icon: employeeDirectoryConfigMeta.icon,
    wave: employeeDirectoryConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/employee-directory').then((m) => ({ default: m.EmployeeDirectory as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/employee-directory/EmployeeDirectory.skeleton').then((m) => ({ default: m.EmployeeDirectorySkeleton as never }))),
    configurableProperties: employeeDirectoryConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: employeeDirectoryDefaultConfig[p.key as keyof typeof employeeDirectoryDefaultConfig],
    })),
    defaultConfig: employeeDirectoryDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { people: [] },
  },
  'search': {
    typeId: searchConfigMeta.typeId,
    name: 'Recherche',
    nameEn: searchConfigMeta.displayName,
    category: searchConfigMeta.category as WebpartDefinition['category'],
    icon: searchConfigMeta.icon,
    wave: searchConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/search').then((m) => ({ default: m.Search as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/search/Search.skeleton').then((m) => ({ default: m.SearchSkeleton as never }))),
    configurableProperties: searchConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: searchDefaultConfig[p.key as keyof typeof searchDefaultConfig],
    })),
    defaultConfig: searchDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: {},
  },
  'newcomers': {
    typeId: newcomersConfigMeta.typeId,
    name: 'Nouveaux arrivants',
    nameEn: newcomersConfigMeta.displayName,
    category: newcomersConfigMeta.category as WebpartDefinition['category'],
    icon: newcomersConfigMeta.icon,
    wave: newcomersConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/people').then((m) => ({ default: m.People as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/people/People.skeleton').then((m) => ({ default: m.PeopleSkeleton as never }))),
    configurableProperties: newcomersConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: newcomersDefaultConfig[p.key as keyof typeof newcomersDefaultConfig],
    })),
    defaultConfig: newcomersDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { people: [] },
  },

  'anniversary': {
    typeId: anniversaryConfigMeta.typeId,
    name: 'Anniversaires professionnels',
    nameEn: anniversaryConfigMeta.displayName,
    category: anniversaryConfigMeta.category as WebpartDefinition['category'],
    icon: anniversaryConfigMeta.icon,
    wave: anniversaryConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/people').then((m) => ({ default: m.People as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/people/People.skeleton').then((m) => ({ default: m.PeopleSkeleton as never }))),
    configurableProperties: anniversaryConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: anniversaryDefaultConfig[p.key as keyof typeof anniversaryDefaultConfig],
    })),
    defaultConfig: anniversaryDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { people: [] },
  },
  'separator': {
    typeId: separatorConfigMeta.typeId,
    name: 'Séparateur',
    nameEn: separatorConfigMeta.displayName,
    category: separatorConfigMeta.category as WebpartDefinition['category'],
    icon: separatorConfigMeta.icon,
    wave: separatorConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/separator').then((m) => ({ default: m.Separator as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/separator/Separator.skeleton').then((m) => ({ default: m.SeparatorSkeleton as never }))),
    configurableProperties: separatorConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: separatorDefaultConfig[p.key as keyof typeof separatorDefaultConfig],
    })),
    defaultConfig: separatorDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { text: { value: 'Séparateur' }, showText: true },
  },

  // ============================================
  // WAVE 2 — Productivity & engagement (Phase 2)
  // ============================================

  'my-apps': {
    typeId: myAppsConfigMeta.typeId,
    name: 'Mes applications',
    nameEn: myAppsConfigMeta.displayName,
    category: myAppsConfigMeta.category as WebpartDefinition['category'],
    icon: myAppsConfigMeta.icon,
    wave: myAppsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/my-apps').then((m) => ({ default: m.MyApps as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/my-apps/MyApps.skeleton').then((m) => ({ default: m.MyAppsSkeleton as never }))),
    configurableProperties: myAppsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: myAppsDefaultConfig[p.key as keyof typeof myAppsDefaultConfig],
    })),
    defaultConfig: myAppsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: { links: [] },
  },
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
