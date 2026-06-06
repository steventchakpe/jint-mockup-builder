/**
 * Textes localisés des 20 profils par défaut (PRD §6.9 : noms culturellement
 * appropriés à la langue du prospect). La structure (avatars, managers, dates)
 * est invariante dans default-profiles.ts — prénom/nom/poste/département/lieu
 * changent par locale. Genre des prénoms aligné sur les avatars Unsplash.
 */
import type { Locale } from '@/types/project';

/** [prénom, nom, poste, département, lieu] — clé = n° de profil (3 chiffres). */
export type ProfileText = readonly [string, string, string, string, string];

const FR: Record<string, ProfileText> = {
  '001': ['Claire', 'Fontaine', 'Directrice communication', 'Communication', 'Paris'],
  '002': ['Marc', 'Lefebvre', 'Directeur financier', 'Finance', 'Paris'],
  '003': ['Nadia', 'Cherif', 'Cheffe de projet', 'Opérations', 'Lyon'],
  '004': ['Sophie', 'Aubert', 'RSSI', 'IT', 'Lyon'],
  '005': ['Julien', 'Moreau', 'Responsable RH', 'RH', 'Paris'],
  '006': ['Thomas', 'Bernard', 'Chargé de communication', 'Communication', 'Paris'],
  '007': ['Paul', 'Renaud', 'Comptable', 'Finance', 'Paris'],
  '008': ['Isabelle', 'Marchand', 'Directrice générale', 'Direction', 'Paris'],
  '009': ['Antoine', 'Roussel', 'Directeur des opérations', 'Opérations', 'Lyon'],
  '010': ['Camille', 'Dubois', 'Responsable IT', 'IT', 'Paris'],
  '011': ['Léa', 'Girard', 'Chargée de communication', 'Communication', 'Paris'],
  '012': ['Karim', 'Benali', 'Développeur', 'IT', 'Lyon'],
  '013': ['Emma', 'Petit', 'Analyste data', 'IT', 'Paris'],
  '014': ['Hugo', 'Martin', 'Technicien support', 'IT', 'Lyon'],
  '015': ['Amina', 'Diallo', 'Chargée de recrutement', 'RH', 'Paris'],
  '016': ['Lucas', 'Fournier', 'Chef de produit', 'Opérations', 'Lyon'],
  '017': ['Élodie', 'Lambert', 'Assistante de direction', 'Direction', 'Paris'],
  '018': ['Mehdi', 'Haddad', 'Responsable achats', 'Opérations', 'Paris'],
  '019': ['Charlotte', 'Lemoine', 'Juriste', 'Direction', 'Paris'],
  '020': ['Gabriel', 'Costa', 'Chargé de marketing', 'Communication', 'Lyon'],
};

/** Québec : noms typiques (Tremblay, Gagnon, Roy…), postes et lieux locaux. */
const CA: Record<string, ProfileText> = {
  '001': ['Marie-Ève', 'Tremblay', 'Directrice des communications', 'Communications', 'Montréal'],
  '002': ['Marc', 'Gagnon', 'Directeur des finances', 'Finances', 'Montréal'],
  '003': ['Geneviève', 'Roy', 'Chargée de projet', 'Opérations', 'Québec'],
  '004': ['Sophie', 'Côté', 'Conseillère en sécurité de l’information', 'TI', 'Québec'],
  '005': ['Julien', 'Lavoie', 'Directeur des ressources humaines', 'RH', 'Montréal'],
  '006': ['Mathieu', 'Fortin', 'Conseiller en communication', 'Communications', 'Montréal'],
  '007': ['Pierre-Luc', 'Bélanger', 'Comptable CPA', 'Finances', 'Laval'],
  '008': ['Isabelle', 'Pelletier', 'Présidente-directrice générale', 'Direction', 'Montréal'],
  '009': ['Antoine', 'Lévesque', 'Directeur des opérations', 'Opérations', 'Québec'],
  '010': ['Catherine', 'Morin', 'Responsable des TI', 'TI', 'Montréal'],
  '011': ['Léa', 'Gauthier', 'Conseillère en communication', 'Communications', 'Montréal'],
  '012': ['Karim', 'Benali', 'Développeur', 'TI', 'Gatineau'],
  '013': ['Emma', 'Lapointe', 'Analyste de données', 'TI', 'Montréal'],
  '014': ['Olivier', 'Caron', 'Technicien en soutien informatique', 'TI', 'Québec'],
  '015': ['Amina', 'Diallo', 'Conseillère en recrutement', 'RH', 'Montréal'],
  '016': ['Samuel', 'Bergeron', 'Chef de produit', 'Opérations', 'Laval'],
  '017': ['Audrey', 'Dubé', 'Adjointe de direction', 'Direction', 'Montréal'],
  '018': ['Mehdi', 'Haddad', 'Responsable de l’approvisionnement', 'Opérations', 'Montréal'],
  '019': ['Charlotte', 'Boucher', 'Conseillère juridique', 'Direction', 'Montréal'],
  '020': ['Gabriel', 'Nadeau', 'Conseiller marketing', 'Communications', 'Gatineau'],
};

const EN: Record<string, ProfileText> = {
  '001': ['Emily', 'Carter', 'Communications Director', 'Communications', 'London'],
  '002': ['Mark', 'Reynolds', 'Chief Financial Officer', 'Finance', 'London'],
  '003': ['Nadia', 'Khan', 'Project Manager', 'Operations', 'Manchester'],
  '004': ['Sophie', 'Bennett', 'CISO', 'IT', 'Manchester'],
  '005': ['James', 'Whitmore', 'HR Manager', 'HR', 'London'],
  '006': ['Thomas', 'Brooks', 'Communications Officer', 'Communications', 'London'],
  '007': ['Paul', 'Henderson', 'Accountant', 'Finance', 'London'],
  '008': ['Isabel', 'Marsh', 'Chief Executive Officer', 'Executive', 'London'],
  '009': ['Anthony', 'Russell', 'Operations Director', 'Operations', 'Manchester'],
  '010': ['Chloe', 'Roberts', 'IT Manager', 'IT', 'London'],
  '011': ['Lily', 'Graham', 'Communications Officer', 'Communications', 'London'],
  '012': ['Karim', 'Hassan', 'Software Developer', 'IT', 'Manchester'],
  '013': ['Emma', 'Pearson', 'Data Analyst', 'IT', 'London'],
  '014': ['Harry', 'Mitchell', 'Support Technician', 'IT', 'Manchester'],
  '015': ['Amina', 'Diallo', 'Recruitment Officer', 'HR', 'London'],
  '016': ['Lucas', 'Foster', 'Product Manager', 'Operations', 'Manchester'],
  '017': ['Ellie', 'Lambert', 'Executive Assistant', 'Executive', 'London'],
  '018': ['Mehdi', 'Haddad', 'Procurement Manager', 'Operations', 'London'],
  '019': ['Charlotte', 'Lewis', 'Legal Counsel', 'Executive', 'London'],
  '020': ['Gabriel', 'Costa', 'Marketing Officer', 'Communications', 'Manchester'],
};

const SETS: Record<Locale, Record<string, ProfileText>> = { 'fr-FR': FR, 'fr-CA': CA, 'en': EN };

/** Textes des 20 profils pour une locale (fallback fr-FR). */
export function getProfileText(locale?: Locale | null): Record<string, ProfileText> {
  return SETS[locale ?? 'fr-FR'] ?? FR;
}

/** « Prénom Nom » d'un profil (n° à 3 chiffres) dans une locale — pour les seeds. */
export function profileFullName(n: string, locale?: Locale | null): string {
  const t = getProfileText(locale)[n];
  return t ? `${t[0]} ${t[1]}` : '';
}
