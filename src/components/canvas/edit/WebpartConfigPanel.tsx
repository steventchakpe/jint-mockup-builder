'use client';

import { useProjectStore } from '@/lib/state/project-store';
import { getWebpart } from '@/config/webpart-registry';
import type { ConfigurableProperty } from '@/types/webparts';
import type { WebpartInstance } from '@/types/project';

/** Lit une valeur à un chemin (objets imbriqués). */
function getPath(obj: unknown, path: Array<string | number>): unknown {
  return path.reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as Record<string, unknown>)[k]), obj);
}

/** Set immuable d'une valeur à un chemin. */
function setPath(obj: unknown, path: Array<string | number>, value: unknown): unknown {
  if (path.length === 0) return value;
  const [k, ...rest] = path;
  const base = (obj ?? {}) as Record<string, unknown>;
  return { ...base, [k]: setPath(base[k as string], rest, value) };
}

/** Retrouve l'instance de webpart sélectionnée dans le projet (toutes pages/sections/colonnes). */
function findWebpart(
  project: ReturnType<typeof useProjectStore.getState>['project'],
  id: string,
): WebpartInstance | undefined {
  if (!project) return undefined;
  for (const page of project.pages) {
    for (const section of page.sections) {
      for (const col of section.columns) {
        const wp = col.webparts.find((w) => w.id === id);
        if (wp) return wp;
      }
    }
    for (const wp of page.verticalSection?.webparts ?? []) {
      if (wp.id === id) return wp;
    }
  }
  return undefined;
}

/**
 * Panneau de configuration d'un webpart (PRD §6.4) — généré dynamiquement
 * depuis `configurableProperties` du registry. Édite `config` via le store.
 * S'affiche quand un webpart est sélectionné sur le canvas (mode Édition).
 */
export function WebpartConfigPanel() {
  const selectedId = useProjectStore((s) => s.selectedWebpartId);
  const project = useProjectStore((s) => s.project);
  const updateConfig = useProjectStore((s) => s.updateWebpartConfig);
  const updateContent = useProjectStore((s) => s.updateWebpartContent);
  const selectWebpart = useProjectStore((s) => s.selectWebpart);

  if (!selectedId) return null;
  const instance = findWebpart(project, selectedId);
  if (!instance) return null;
  const def = getWebpart(instance.type);
  if (!def) return null;

  const config = instance.config as Record<string, unknown>;
  const content = instance.content as Record<string, unknown>;

  const valueOf = (prop: ConfigurableProperty): unknown => {
    const path = prop.path ?? [prop.key];
    const src = prop.target === 'content' ? content : config;
    const v = getPath(src, path);
    return v !== undefined ? v : prop.defaultValue;
  };
  const setProp = (prop: ConfigurableProperty, value: unknown) => {
    const path = prop.path ?? [prop.key];
    if (prop.target === 'content') {
      updateContent(instance.id, setPath(content, path, value) as Record<string, unknown>);
    } else {
      updateConfig(instance.id, setPath(config, path, value) as Record<string, unknown>);
    }
  };

  return (
    <aside className="w-[320px] shrink-0 h-full overflow-y-auto bg-white border-l border-gray-200 flex flex-col">
      <header className="flex items-center justify-between px-lg py-md border-b border-gray-200">
        <div>
          <p className="text-caption text-gray-400">Webpart</p>
          <h2 className="text-body-lg font-semibold text-sp-darker">{def.name}</h2>
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => selectWebpart(null)}
          className="w-7 h-7 rounded-sm text-[#605e5c] hover:bg-sp-lighter-alt flex items-center justify-center"
        >
          ✕
        </button>
      </header>

      <div className="flex flex-col gap-lg p-lg">
        {def.configurableProperties.length === 0 && (
          <p className="text-caption text-gray-400">Aucune propriété configurable.</p>
        )}
        {def.configurableProperties.map((prop) => (
          <PropField
            key={prop.key}
            prop={prop}
            value={valueOf(prop)}
            onChange={(v) => setProp(prop, v)}
          />
        ))}
      </div>
    </aside>
  );
}

function PropField({
  prop,
  value,
  onChange,
}: {
  prop: ConfigurableProperty;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelEl = <label className="text-caption font-semibold text-sp-darker">{prop.label}</label>;
  const inputCls =
    'w-full rounded-sm border border-gray-300 px-sm py-xs text-body text-sp-darker focus:outline-none focus:ring-2 focus:ring-sp-primary';

  return (
    <div className="flex flex-col gap-xs">
      {prop.type !== 'boolean' && labelEl}
      {prop.type === 'select' && (
        <select
          className={inputCls}
          value={String(value ?? '')}
          // Si la valeur stockée est numérique (presets radius/hauteur), on reconvertit en nombre.
          onChange={(e) => onChange(typeof prop.defaultValue === 'number' ? Number(e.target.value) : e.target.value)}
        >
          {prop.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
      {prop.type === 'number' && (
        <input
          type="number"
          className={inputCls}
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
      {prop.type === 'string' && (
        <input
          type="text"
          className={inputCls}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {prop.type === 'color' && (
        <input
          type="color"
          className="h-9 w-16 rounded-sm border border-gray-300"
          value={String(value ?? '#000000')}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {prop.type === 'boolean' && (
        <label className="flex items-center gap-sm cursor-pointer">
          <input
            type="checkbox"
            checked={prop.onValue !== undefined ? value === prop.onValue : Boolean(value)}
            onChange={(e) =>
              prop.onValue !== undefined
                ? onChange(e.target.checked ? prop.onValue : prop.offValue)
                : onChange(e.target.checked)
            }
          />
          <span className="text-caption font-semibold text-sp-darker">{prop.label}</span>
        </label>
      )}
    </div>
  );
}
