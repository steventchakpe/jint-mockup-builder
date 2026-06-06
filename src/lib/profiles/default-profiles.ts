// Les 20 profils par défaut de toute nouvelle maquette — les « personnages »
// de la démo (PRD §6.9). Hiérarchie crédible : 1 DG, 5 managers/directeurs,
// le reste contributeurs individuels. 3 profils switchables (login simulé).
//
// ── Seam IA (Phase 3) ───────────────────────────────────────────────────────
// La génération IA produira un `Profile[]` au même format (noms adaptés à la
// langue/secteur du prospect, avatars genre-matchés) et le poussera dans le
// store via `replaceProfiles({ editable, switchable, activeProfileId })`.
// L'annuaire et les webparts (hydratation par ID, cf. hydrate.ts) ne changent pas.
import type { Profile, ProfileCollection } from '@/types/project';

/** Domaine email par défaut tant que le prospect n'est pas renseigné. */
export const DEFAULT_EMAIL_DOMAIN = 'prospect.com';

/** prenom.nom@domaine — accents retirés, une seule règle pour tout l'annuaire. */
export function buildEmail(firstName: string, lastName: string, domain: string): string {
  const slug = (s: string) =>
    s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  if (!firstName || !lastName) return '';
  return `${slug(firstName)}.${slug(lastName)}@${domain || DEFAULT_EMAIL_DOMAIN}`;
}

const avatar = (id: string) => `https://images.unsplash.com/${id}?w=200&auto=format&fit=crop`;

// [id(3 chiffres), prénom, nom, rôle, poste, département, lieu, photo Unsplash, manager(id), startDate]
type Row = [string, string, string, 'contributor' | 'user', string, string, string, string, string | null, string];
const ROWS: Row[] = [
  ['001', 'Claire', 'Fontaine', 'contributor', 'Directrice communication', 'Communication', 'Paris', 'photo-1573496359142-b8d87734a5a2', '008', '2019-03-04'],
  ['002', 'Marc', 'Lefebvre', 'user', 'Directeur financier', 'Finance', 'Paris', 'photo-1560250097-0b93528c311a', '008', '2017-09-11'],
  ['003', 'Nadia', 'Cherif', 'user', 'Cheffe de projet', 'Opérations', 'Lyon', 'photo-1580489944761-15a19d654956', '009', '2021-06-12'],
  ['004', 'Sophie', 'Aubert', 'user', 'RSSI', 'IT', 'Lyon', 'photo-1438761681033-6461ffad8d80', '010', '2020-01-15'],
  ['005', 'Julien', 'Moreau', 'user', 'Responsable RH', 'RH', 'Paris', 'photo-1507003211169-0a1dd7228f2d', '008', '2019-06-09'],
  ['006', 'Thomas', 'Bernard', 'user', 'Chargé de communication', 'Communication', 'Paris', 'photo-1500648767791-00dcc994a43e', '001', '2022-04-19'],
  ['007', 'Paul', 'Renaud', 'user', 'Comptable', 'Finance', 'Paris', 'photo-1472099645785-5658abf4ff4e', '002', '2017-06-15'],
  ['008', 'Isabelle', 'Marchand', 'user', 'Directrice générale', 'Direction', 'Paris', 'photo-1494790108377-be9c29b29330', null, '2015-02-02'],
  ['009', 'Antoine', 'Roussel', 'user', 'Directeur des opérations', 'Opérations', 'Lyon', 'photo-1506794778202-cad84cf45f1d', '008', '2016-10-03'],
  ['010', 'Camille', 'Dubois', 'user', 'Responsable IT', 'IT', 'Paris', 'photo-1544005313-94ddf0286df2', '008', '2018-05-22'],
  // Nouveaux arrivants (startDate récente → webpart Newcomers)
  ['011', 'Léa', 'Girard', 'user', 'Chargée de communication', 'Communication', 'Paris', 'photo-1534528741775-53994a69daeb', '001', '2026-05-26'],
  ['012', 'Karim', 'Benali', 'user', 'Développeur', 'IT', 'Lyon', 'photo-1539571696357-5a69c17a67c6', '010', '2026-06-01'],
  ['013', 'Emma', 'Petit', 'user', 'Analyste data', 'IT', 'Paris', 'photo-1517841905240-472988babdf9', '010', '2026-06-03'],
  ['014', 'Hugo', 'Martin', 'user', 'Technicien support', 'IT', 'Lyon', 'photo-1463453091185-61582044d556', '010', '2023-02-13'],
  ['015', 'Amina', 'Diallo', 'user', 'Chargée de recrutement', 'RH', 'Paris', 'photo-1531123897727-8f129e1688ce', '005', '2022-11-07'],
  ['016', 'Lucas', 'Fournier', 'user', 'Chef de produit', 'Opérations', 'Lyon', 'photo-1492562080023-ab3db95bfbce', '009', '2021-03-29'],
  ['017', 'Élodie', 'Lambert', 'user', 'Assistante de direction', 'Direction', 'Paris', 'photo-1487412720507-e7ab37603c6f', '008', '2020-09-14'],
  ['018', 'Mehdi', 'Haddad', 'user', 'Responsable achats', 'Opérations', 'Paris', 'photo-1566492031773-4f4e44671857', '009', '2018-08-27'],
  ['019', 'Charlotte', 'Lemoine', 'user', 'Juriste', 'Direction', 'Paris', 'photo-1488426862026-3ee34a7d66df', '008', '2021-01-11'],
  ['020', 'Gabriel', 'Costa', 'user', 'Chargé de marketing', 'Communication', 'Lyon', 'photo-1519085360753-af0119f7cbe7', '001', '2024-07-01'],
];

/** Contenu personnalisé des webparts « My * » pour les profils switchables (US-30). */
const PERSONAL: Record<string, Profile['personalContent']> = {
  '001': { tasks: null, emails: null, meetings: null },
  '002': {
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
  '003': {
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
};

export const profileId = (n: string) => `profile-${n}`;

/** Les 20 profils par défaut (mode manuel) — emails dérivés du domaine. */
export function createDefaultProfiles(domain = DEFAULT_EMAIL_DOMAIN): ProfileCollection {
  const editable: Profile[] = ROWS.map(([n, firstName, lastName, role, jobTitle, department, location, photo, manager, startDate]) => ({
    id: profileId(n),
    firstName, lastName, role, jobTitle, department,
    email: buildEmail(firstName, lastName, domain),
    phone: null, location,
    avatar: avatar(photo),
    manager: manager ? profileId(manager) : null,
    startDate, birthDate: null, bio: null, skills: [],
    personalContent: PERSONAL[n] ?? null,
  }));
  return {
    activeProfileId: profileId('001'),
    switchable: [profileId('001'), profileId('002'), profileId('003')],
    editable,
    generated: [],
  };
}
