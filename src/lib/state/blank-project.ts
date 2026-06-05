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
    profiles: {
      activeProfileId: 'profile-001',
      switchable: ['profile-001', 'profile-002', 'profile-003'],
      editable: [
        {
          id: 'profile-001', firstName: 'Claire', lastName: 'Fontaine', role: 'contributor',
          jobTitle: 'Directrice communication', department: 'Communication',
          email: 'claire.fontaine@prospect.com', phone: null, location: 'Paris',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop',
          manager: null, startDate: '2019-03-04', birthDate: null, bio: null, skills: [],
          personalContent: {
            tasks: null,
            emails: null,
            meetings: null,
          },
        },
        {
          id: 'profile-002', firstName: 'Marc', lastName: 'Lefebvre', role: 'user',
          jobTitle: 'Directeur financier', department: 'Finance',
          email: 'marc.lefebvre@prospect.com', phone: null, location: 'Paris',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop',
          manager: null, startDate: '2017-09-11', birthDate: null, bio: null, skills: [],
          personalContent: {
            tasks: [
              { id: 'p2t1', name: 'Tâches', kind: 'default', tasks: [
                { id: 'p2tk1', title: 'Valider le reporting consolidé T2', completed: false, dueDate: '2026-06-09' },
                { id: 'p2tk2', title: 'Préparer la revue budgétaire T3', completed: false, dueDate: '2026-06-10' },
              ] },
            ],
            emails: [
              { id: 'p2m1', displayName: 'Paul Renaud', receptHour: '2026-06-05T08:30:00', subject: 'Clôture comptable mai', bodyPreview: 'La clôture est finalisée, le détail est en pièce jointe.', isRead: false, hasAttachments: true },
              { id: 'p2m2', displayName: 'Isabelle Marchand', receptHour: '2026-06-04T16:10:00', subject: 'Arbitrages budgétaires', bodyPreview: 'Peux-tu préparer les scénarios pour le prochain comité ?', isRead: true },
            ],
            meetings: [
              { id: 'p2mt1', subject: 'Revue budgétaire T3', startTime: '2026-06-05T14:30:00', endTime: '2026-06-05T16:00:00', status: 'accepted', isOnlineMeeting: true, attendees: [{ name: 'Paul Renaud' }] },
            ],
          },
        },
        {
          id: 'profile-003', firstName: 'Nadia', lastName: 'Cherif', role: 'user',
          jobTitle: 'Cheffe de projet', department: 'Opérations',
          email: 'nadia.cherif@prospect.com', phone: null, location: 'Lyon',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop',
          manager: null, startDate: '2021-06-12', birthDate: null, bio: null, skills: [],
          personalContent: {
            tasks: [
              { id: 'p3t1', name: 'Tâches', kind: 'default', tasks: [
                { id: 'p3tk1', title: 'Mettre à jour le planning de déploiement', completed: false, dueDate: '2026-06-08' },
              ] },
            ],
            emails: [
              { id: 'p3m1', displayName: 'Thomas Bernard', receptHour: '2026-06-05T10:05:00', subject: 'Compte-rendu atelier', bodyPreview: 'Voici le compte-rendu de l’atelier de ce matin avec les actions.', isRead: false },
            ],
            meetings: [
              { id: 'p3mt1', subject: 'Point projet hebdomadaire', startTime: '2026-06-05T11:00:00', endTime: '2026-06-05T11:30:00', status: 'accepted', isOnlineMeeting: true, attendees: [{ name: 'Thomas Bernard' }] },
            ],
          },
        },
      ],
      generated: [],
    },
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
    metadata: { createdBy: 'Steven', createdAt: now, updatedAt: now, shareUrl: '', department: 'Autre' },
  };
}
