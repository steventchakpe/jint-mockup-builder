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
import { profileDefaultConfig, profileConfigMeta } from '@/components/webparts/profile';
import { docsDefaultConfig, docsConfigMeta } from '@/components/webparts/docs';
import { myEmailsDefaultConfig, myEmailsConfigMeta } from '@/components/webparts/my-emails';
import { myMeetingsDefaultConfig, myMeetingsConfigMeta } from '@/components/webparts/my-meetings';
import { newshubDefaultConfig, newshubConfigMeta } from '@/components/webparts/newshub';
import { myTasksDefaultConfig, myTasksConfigMeta } from '@/components/webparts/my-tasks';
import { orgChartDefaultConfig, orgChartConfigMeta } from '@/components/webparts/org-chart';
import { imageInteractiveDefaultConfig, imageInteractiveConfigMeta } from '@/components/webparts/image-interactive';
import { myResumeDefaultConfig, myResumeConfigMeta } from '@/components/webparts/my-resume';
import { actionButtonDefaultConfig, actionButtonConfigMeta } from '@/components/webparts/action-button';
import { searchResultsDefaultConfig, searchResultsConfigMeta } from '@/components/webparts/search-results';
import { searchFiltersDefaultConfig, searchFiltersConfigMeta } from '@/components/webparts/search-filters';
import {
  newsSeed,
  eventsSeed,
  newcomersSeed,
  anniversarySeed,
  directorySeed,
  myAppsSeed,
  profileSeed,
  docsSeed,
  myEmailsSeed,
  myMeetingsSeed,
  newshubSeed,
  myTasksSeed,
  orgChartSeed,
  imageInteractiveSeed,
  myResumeSeed,
  actionButtonSeed,
  searchResultsSeed,
  searchFiltersSeed,
} from './webpart-seeds';

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
    configurableProperties: buildProps(
      newsConfigMeta.configurableProps as RawProp[],
      newsDefaultConfig as unknown as Record<string, unknown>,
    ),
    defaultConfig: newsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: newsSeed,
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
    defaultContent: eventsSeed,
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
    defaultContent: directorySeed,
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
    defaultContent: newcomersSeed,
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
    defaultContent: anniversarySeed,
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
    defaultContent: myAppsSeed,
  },
  'org-chart': {
    typeId: orgChartConfigMeta.typeId,
    name: 'Organigramme',
    nameEn: orgChartConfigMeta.displayName,
    category: orgChartConfigMeta.category as WebpartDefinition['category'],
    icon: orgChartConfigMeta.icon,
    wave: orgChartConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/org-chart').then((m) => ({ default: m.OrgChart as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/org-chart/OrgChart.skeleton').then((m) => ({ default: m.OrgChartSkeleton as never }))),
    configurableProperties: orgChartConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: orgChartDefaultConfig[p.key as keyof typeof orgChartDefaultConfig],
    })),
    defaultConfig: orgChartDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: orgChartSeed,
  },
  'profile': {
    typeId: profileConfigMeta.typeId,
    name: 'Profil',
    nameEn: profileConfigMeta.displayName,
    category: profileConfigMeta.category as WebpartDefinition['category'],
    icon: profileConfigMeta.icon,
    wave: profileConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/profile').then((m) => ({ default: m.Profile as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/profile/Profile.skeleton').then((m) => ({ default: m.ProfileSkeleton as never }))),
    configurableProperties: profileConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: profileDefaultConfig[p.key as keyof typeof profileDefaultConfig],
    })),
    defaultConfig: profileDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: profileSeed,
  },
  'newshub': {
    typeId: newshubConfigMeta.typeId,
    name: 'Newshub',
    nameEn: newshubConfigMeta.displayName,
    category: newshubConfigMeta.category as WebpartDefinition['category'],
    icon: newshubConfigMeta.icon,
    wave: newshubConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/newshub').then((m) => ({ default: m.Newshub as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/newshub/Newshub.skeleton').then((m) => ({ default: m.NewshubSkeleton as never }))),
    configurableProperties: newshubConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: newshubDefaultConfig[p.key as keyof typeof newshubDefaultConfig],
    })),
    defaultConfig: newshubDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: newshubSeed,
  },
  'my-tasks': {
    typeId: myTasksConfigMeta.typeId,
    name: 'Mes tâches',
    nameEn: myTasksConfigMeta.displayName,
    category: myTasksConfigMeta.category as WebpartDefinition['category'],
    icon: myTasksConfigMeta.icon,
    wave: myTasksConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/my-tasks').then((m) => ({ default: m.MyTasks as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/my-tasks/MyTasks.skeleton').then((m) => ({ default: m.MyTasksSkeleton as never }))),
    configurableProperties: myTasksConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: myTasksDefaultConfig[p.key as keyof typeof myTasksDefaultConfig],
    })),
    defaultConfig: myTasksDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: myTasksSeed,
  },
  'docs': {
    typeId: docsConfigMeta.typeId,
    name: 'Docs',
    nameEn: docsConfigMeta.displayName,
    category: docsConfigMeta.category as WebpartDefinition['category'],
    icon: docsConfigMeta.icon,
    wave: docsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/docs').then((m) => ({ default: m.Docs as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/docs/Docs.skeleton').then((m) => ({ default: m.DocsSkeleton as never }))),
    configurableProperties: docsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: docsDefaultConfig[p.key as keyof typeof docsDefaultConfig],
    })),
    defaultConfig: docsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: docsSeed,
  },
  'my-emails': {
    typeId: myEmailsConfigMeta.typeId,
    name: 'Mes e-mails',
    nameEn: myEmailsConfigMeta.displayName,
    category: myEmailsConfigMeta.category as WebpartDefinition['category'],
    icon: myEmailsConfigMeta.icon,
    wave: myEmailsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/my-emails').then((m) => ({ default: m.MyEmails as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/my-emails/MyEmails.skeleton').then((m) => ({ default: m.MyEmailsSkeleton as never }))),
    configurableProperties: myEmailsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: myEmailsDefaultConfig[p.key as keyof typeof myEmailsDefaultConfig],
    })),
    defaultConfig: myEmailsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: myEmailsSeed,
  },
  'my-meetings': {
    typeId: myMeetingsConfigMeta.typeId,
    name: 'Mes réunions',
    nameEn: myMeetingsConfigMeta.displayName,
    category: myMeetingsConfigMeta.category as WebpartDefinition['category'],
    icon: myMeetingsConfigMeta.icon,
    wave: myMeetingsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/my-meetings').then((m) => ({ default: m.MyMeetings as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/my-meetings/MyMeetings.skeleton').then((m) => ({ default: m.MyMeetingsSkeleton as never }))),
    configurableProperties: myMeetingsConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: myMeetingsDefaultConfig[p.key as keyof typeof myMeetingsDefaultConfig],
    })),
    defaultConfig: myMeetingsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: myMeetingsSeed,
  },
  // 'viva-engage': { ... },
  // 'text': { ... },

  // ============================================
  // WAVE 3 — Complements & variants (Phase 4)
  // ============================================

  // 'news-v2': { ... },
  // 'focus-v3': { ... },
  'image-interactive': {
    typeId: imageInteractiveConfigMeta.typeId,
    name: 'Image interactive',
    nameEn: imageInteractiveConfigMeta.displayName,
    category: imageInteractiveConfigMeta.category as WebpartDefinition['category'],
    icon: imageInteractiveConfigMeta.icon,
    wave: imageInteractiveConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/image-interactive').then((m) => ({ default: m.ImageInteractive as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/image-interactive/ImageInteractive.skeleton').then((m) => ({ default: m.ImageInteractiveSkeleton as never }))),
    configurableProperties: buildProps(
      imageInteractiveConfigMeta.configurableProps as RawProp[],
      imageInteractiveDefaultConfig as unknown as Record<string, unknown>,
    ),
    defaultConfig: imageInteractiveDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: imageInteractiveSeed,
  },
  'my-resume': {
    typeId: myResumeConfigMeta.typeId,
    name: 'Mon résumé',
    nameEn: myResumeConfigMeta.displayName,
    category: myResumeConfigMeta.category as WebpartDefinition['category'],
    icon: myResumeConfigMeta.icon,
    wave: myResumeConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/my-resume').then((m) => ({ default: m.MyResume as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/my-resume/MyResume.skeleton').then((m) => ({ default: m.MyResumeSkeleton as never }))),
    configurableProperties: myResumeConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: myResumeDefaultConfig[p.key as keyof typeof myResumeDefaultConfig],
    })),
    defaultConfig: myResumeDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: myResumeSeed,
  },
  'action-button': {
    typeId: actionButtonConfigMeta.typeId,
    name: 'Bouton d’action',
    nameEn: actionButtonConfigMeta.displayName,
    category: actionButtonConfigMeta.category as WebpartDefinition['category'],
    icon: actionButtonConfigMeta.icon,
    wave: actionButtonConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/action-button').then((m) => ({ default: m.ActionButton as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/action-button/ActionButton.skeleton').then((m) => ({ default: m.ActionButtonSkeleton as never }))),
    configurableProperties: actionButtonConfigMeta.configurableProps.map((p) => ({
      key: p.key,
      label: p.label,
      type: p.type,
      options: ('options' in p ? p.options : undefined) as { label: string; value: string }[] | undefined,
      defaultValue: actionButtonDefaultConfig[p.key as keyof typeof actionButtonDefaultConfig],
    })),
    defaultConfig: actionButtonDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: actionButtonSeed,
  },
  'search-results': {
    typeId: searchResultsConfigMeta.typeId,
    name: 'Résultats de recherche',
    nameEn: searchResultsConfigMeta.displayName,
    category: searchResultsConfigMeta.category as WebpartDefinition['category'],
    icon: searchResultsConfigMeta.icon,
    wave: searchResultsConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/search-results').then((m) => ({ default: m.SearchResults as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/search-results/SearchResults.skeleton').then((m) => ({ default: m.SearchResultsSkeleton as never }))),
    configurableProperties: buildProps(searchResultsConfigMeta.configurableProps as RawProp[], searchResultsDefaultConfig as unknown as Record<string, unknown>),
    defaultConfig: searchResultsDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: searchResultsSeed,
  },
  'search-filters': {
    typeId: searchFiltersConfigMeta.typeId,
    name: 'Filtres de recherche',
    nameEn: searchFiltersConfigMeta.displayName,
    category: searchFiltersConfigMeta.category as WebpartDefinition['category'],
    icon: searchFiltersConfigMeta.icon,
    wave: searchFiltersConfigMeta.wave as 1 | 2 | 3,
    source: 'jint',
    component: lazy(() => import('@/components/webparts/search-filters').then((m) => ({ default: m.SearchFilters as never }))),
    skeletonComponent: lazy(() => import('@/components/webparts/search-filters/SearchFilters.skeleton').then((m) => ({ default: m.SearchFiltersSkeleton as never }))),
    configurableProperties: buildProps(searchFiltersConfigMeta.configurableProps as RawProp[], searchFiltersDefaultConfig as unknown as Record<string, unknown>),
    defaultConfig: searchFiltersDefaultConfig as unknown as Record<string, unknown>,
    defaultContent: searchFiltersSeed,
  },
  // 'search-bar': couvert par le webpart 'search' (mzkSearchBox) porté en Wave 1.
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
