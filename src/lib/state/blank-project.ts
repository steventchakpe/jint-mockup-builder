// Factory d'un projet vierge — point de départ du mode manuel (PRD §6.1 :
// template SharePoint vide Jint, shell en place + 1 page « Accueil ».
import type { Project } from '@/types/project';
import { genId, makeSection } from './section-ops';

/** Crée un projet vierge (mode manuel) : shell par défaut + 1 page Accueil avec 2 sections vides. */
export function createBlankProject(name = 'Nouvelle démo'): Project {
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
      logo: null,
      employeeCount: 0,
      contentLanguage: 'fr-FR',
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
      siteTitle: 'SharePoint site title',
      labels: ['Confidential', 'Corporate Advisory +2'],
      hubNavigation: {
        hubLogo: { initials: 'H', backgroundColor: '#0078d4' },
        hubTitle: 'Hub site title',
        links: [
          { label: 'Primary link', url: '#' },
          { label: 'Primary link', url: '#' },
          { label: 'Primary link', url: '#' },
        ],
        groups: [{ label: 'Primary group', children: [] }],
      },
      localNavigation: {
        items: [
          { label: 'Home', url: '#', isActive: true },
          { label: 'Documents', url: '#', isActive: false },
          { label: 'Pages', url: '#', isActive: false },
          { label: 'Site contents', url: '#', isActive: false },
        ],
      },
      actions: { showFollowButton: true, showShareButton: true },
    },
    profiles: { activeProfileId: '', switchable: [], editable: [], generated: [] },
    pages: [
      {
        id: pageId,
        title: 'Accueil',
        slug: 'accueil',
        icon: 'Home',
        order: 0,
        sections: [makeSection('one-column'), makeSection('one-column')],
        verticalSection: null,
      },
    ],
    navigation: { type: 'top', items: [{ label: 'Accueil', pageId }] },
    uex: {
      enabled: true,
      sections: {
        navigate: { links: [] },
        inform: { showEvents: true, showNews: true, maxItems: 5 },
        search: { enabled: true, placeholder: 'Rechercher' },
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
    metadata: { createdBy: '', createdAt: now, updatedAt: now, shareUrl: '' },
  };
}
