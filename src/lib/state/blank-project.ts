// Factory d'un projet vierge — point de départ du mode manuel (PRD §6.1 :
// template SharePoint vide Jint, shell en place + 1 page « Accueil ».
import type { Locale, Project } from '@/types/project';
import { genId, makeSection } from './section-ops';
import { createDefaultProfiles, DEFAULT_EMAIL_DOMAIN } from '@/lib/profiles/default-profiles';
import { getDemoStrings } from '@/lib/i18n/get-demo-strings';

/** Crée un projet vierge (mode manuel) : shell par défaut + 1 page Accueil avec 2 sections vides. */
export function createBlankProject(name = 'Nouvelle démo', locale: Locale = 'fr-FR'): Project {
  const s = getDemoStrings(locale);
  const now = new Date().toISOString();
  const pageId = genId('page');
  return {
    id: genId('project'),
    name,
    creationMode: 'manual',
    prospect: {
      company: '',
      sector: '',
      sourceUrl: null,
      emailDomain: DEFAULT_EMAIL_DOMAIN,
      logo: null,
      employeeCount: 0,
      contentLanguage: locale,
    },
    theme: {
      primaryColor: '#0078d4',
      secondaryColor: '#106ebe',
      accentColor: '#0078d4',
      backgroundColor: '#ffffff',
      fontFamily: 'Segoe UI',
      prospectFontFamily: null,
      prospectFontUrl: null,
      logo: '',
      sharepointThemeOverrides: {},
    },
    header: {
      layout: 'extended',
      theme: 'neutral',
      siteLogo: { type: 'initials', initials: 'CS', imageUrl: null, backgroundColor: '#0078d4' },
      siteTitle: s.header.siteTitle,
      labels: [...s.header.labels],
      hubNavigation: {
        hubLogo: { initials: 'H', backgroundColor: '#0078d4' },
        hubTitle: s.header.hubTitle,
        links: s.header.hubLinks.slice(0, 3).map((label) => ({ label, url: '#' })),
        groups: [{ label: s.header.hubLinks[3], children: [] }],
      },
      localNavigation: {
        items: s.header.localNav.map((label, i) => ({ label, url: '#', isActive: i === 0 })),
      },
      actions: { showFollowButton: true, showShareButton: true },
    },
    profiles: createDefaultProfiles(DEFAULT_EMAIL_DOMAIN, locale),
    pages: [
      {
        id: pageId,
        title: s.blank.homeTitle,
        slug: s.blank.homeSlug,
        icon: 'Home',
        order: 0,
        sections: [makeSection('one-column'), makeSection('one-column')],
        verticalSection: null,
      },
    ],
    navigation: { type: 'top', items: [{ label: s.blank.homeTitle, pageId }] },
    uex: {
      enabled: true,
      sections: {
        navigate: { links: [] },
        inform: { showEvents: true, showNews: true, maxItems: 5 },
        search: { enabled: true, placeholder: s.suite.search },
        contribute: { enabled: true },
        share: { channels: ['teams', 'engage', 'newsletter'] },
      },
    },
    flows: {
      newsletter: {
        enabled: false,
        steps: [],
        editorComponents: [],
        editorConfig: { layouts: ['single-column'], pageSettings: { subject: '', font: 'Segoe UI', themeColor: '#0078d4', spacing: 8 } },
        dashboardContent: { kpis: { openRate: 0, clickRate: 0, engagementRate: 0, avgReadTime: '' }, newsletters: [] },
      },
      article: { enabled: false, steps: [] },
      sharing: { enabled: false, channels: ['teams', 'engage'], steps: [] },
    },
    metadata: { createdBy: 'Steven', createdAt: now, updatedAt: now, shareUrl: '', department: 'Autre' },
  };
}
