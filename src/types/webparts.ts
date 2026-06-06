import { type ComponentType, type LazyExoticComponent } from 'react';

// Base props that every webpart component receives
export interface WebpartProps<TConfig = Record<string, unknown>, TContent = Record<string, unknown>> {
  id: string;
  config: TConfig;
  content: TContent;
  isEditMode: boolean;
  onConfigChange?: (config: TConfig) => void;
  onContentChange?: (content: TContent) => void;
}

// Configurable property definition — drives the Edit mode sidebar panel
export interface ConfigurableProperty {
  key: string;
  label: string;
  type: 'select' | 'boolean' | 'number' | 'string' | 'color' | 'image';
  options?: Array<{ label: string; value: string }>; // for select type
  defaultValue: unknown;
  // Cible de la propriété : 'config' (défaut) ou 'content'.
  target?: 'config' | 'content';
  // Chemin (imbriqué) dans la cible ; défaut = [key].
  path?: Array<string | number>;
  // Pour les booleans qui posent une VALEUR (et non true/false) : ex. activer un fond
  // de carte (onValue = couleur) / le désactiver (offValue = undefined).
  onValue?: unknown;
  offValue?: unknown;
}

// Webpart definition in the registry
export interface WebpartDefinition {
  typeId: string;
  name: string;
  nameEn: string;
  category: WebpartCategory;
  icon: string; // Lucide icon name or SVG path
  wave: 1 | 2 | 3;
  source: 'jint' | 'sharepoint';
  component: LazyExoticComponent<ComponentType<WebpartProps>>;
  editorComponent?: LazyExoticComponent<ComponentType<WebpartProps>>;
  skeletonComponent?: LazyExoticComponent<ComponentType<unknown>>;
  configurableProperties: ConfigurableProperty[];
  defaultConfig: Record<string, unknown>;
  defaultContent: Record<string, unknown>;
}

export type WebpartCategory =
  | 'navigation'
  | 'hero'
  | 'actualites'
  | 'evenements'
  | 'liens'
  | 'annuaire'
  | 'documents'
  | 'medias'
  | 'formulaires'
  | 'widgets'
  | 'social'
  | 'layout'
  | 'productivite'
  | 'profil';
