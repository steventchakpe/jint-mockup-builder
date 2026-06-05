/**
 * Types portés de `@mozzaik365/components/my-tasks` (MyTasksTreeViewLayout).
 * Tâches To Do / Planner : dropdown de listes + TreeView de tâches cochables.
 */

export type MyTasksShadow = 'none' | 'light' | 'medium' | 'strong';

/** Listes connues (ItemListEnum + wellknownListName). */
export type TaskListKind = 'important' | 'planned' | 'assigned' | 'default' | 'flagged' | 'custom';

export interface TaskChecklistItem {
  id: string;
  title: string;
  checked: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  /** Date d'échéance (ISO) — affichée en sous-titre. */
  dueDate?: string;
  checklist?: TaskChecklistItem[];
}

export interface TaskList {
  id: string;
  name: string;
  kind: TaskListKind;
  tasks: TaskItem[];
}

export interface MyTasksConfig {
  /** Titre (manifest : htmlTitle). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** Rayon des groupes de tâches en px (manifest : pill = 12). */
  radius: number;
  /** Ombre (manifest : Strong). */
  shadow: MyTasksShadow;
}

export interface MyTasksContent {
  lists: TaskList[];
}

export interface MyTasksProps {
  config: MyTasksConfig;
  content: MyTasksContent;
  isEditMode?: boolean;
  locale?: string;
}
