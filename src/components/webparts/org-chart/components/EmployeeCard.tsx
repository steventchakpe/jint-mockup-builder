'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { ChevronDownIcon, ChevronUpIcon, MoreVerticalIcon } from '../OrgChart.icons';
import {
  CARD_EMPTY_STACK,
  CARD_GAP,
  CARD_INNER_GAP,
  CARD_MAX_WIDTH,
  CARD_PADDING,
  CARD_TEXT_GAP,
  FONT_SIZE,
  HEADCOUNT_GAP,
  HEADCOUNT_PADDING,
  NEUTRAL_LIGHT,
  NEUTRAL_SECONDARY,
  PERSONA_SIZE,
  SHADOW,
  TAG_PADDING,
  TAG_RADIUS,
  personaColor,
} from '../OrgChart.mozzaik';
import type { OrgChartConfig, OrgChartEmployee } from '../OrgChart.types';

interface EmployeeCardProps {
  employee: OrgChartEmployee;
  index: number;
  config: OrgChartConfig;
  headcount: number;
  isExpanded: boolean;
  onExpandClick: () => void;
}

const initials = (name: string) =>
  name.trim().split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

/**
 * EmployeeCard — port fidèle d'OrganizationChartCard : carte 180 max, bordure
 * 1px neutralLight, padding '20px 8px', Persona 72 centré (cale 32 / bouton ⋮),
 * nom SubjectTitle semibold themePrimary, poste MetaData bold neutralSecondary
 * MAJUSCULES, tag pill (couleur persona 13 %), pilule headcount (chevron
 * themeSecondary + compteur) à cheval sur le bas.
 */
export function EmployeeCard({ employee, index, config, headcount, isExpanded, onExpandClick }: EmployeeCardProps) {
  const { radius, shadow, tagType } = config;
  const tag = tagType === 'department' ? employee.department : tagType === 'location' ? employee.location : '';
  const tagColor = tag ? personaColor(tag) : '';

  return (
    <div
      className="relative inline-flex flex-col bg-white text-left"
      style={{ maxWidth: CARD_MAX_WIDTH, borderRadius: radius, boxShadow: SHADOW[shadow], border: `1px solid ${NEUTRAL_LIGHT}` }}
      data-testid="org-chart-card"
    >
      <div className="flex flex-col items-center" style={{ padding: CARD_PADDING, gap: CARD_GAP }}>
        <div className="flex items-start justify-around w-full" style={{ gap: CARD_INNER_GAP }}>
          <span style={{ width: CARD_EMPTY_STACK }} aria-hidden />
          <span className="shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt inline-flex items-center justify-center text-sp-primary font-semibold" style={{ width: PERSONA_SIZE, height: PERSONA_SIZE, fontSize: 28 }}>
            {employee.imageUrl
              ? <img src={employee.imageUrl} alt={employee.displayName} className="w-full h-full object-cover" loading="lazy" />
              : initials(employee.displayName)}
          </span>
          <button type="button" aria-label="Plus d'actions" className="w-8 h-8 inline-flex items-center justify-center rounded-sm text-[#605e5c] hover:bg-sp-lighter-alt transition-colors" onClick={(e) => e.stopPropagation()}>
            <MoreVerticalIcon style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className="flex flex-col items-center min-w-0 w-full" style={{ gap: CARD_TEXT_GAP }}>
          <InlineText
            as="span"
            path={['employees', index, 'displayName']}
            value={employee.displayName}
            placeholder="Nom"
            className="font-semibold text-sp-primary truncate max-w-full"
            style={{ fontSize: FONT_SIZE.SubjectTitle }}
          />
          {employee.jobTitle && (
            <InlineText
              as="span"
              path={['employees', index, 'jobTitle']}
              value={employee.jobTitle}
              placeholder="Poste"
              className="font-bold uppercase truncate max-w-full"
              style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_SECONDARY }}
            />
          )}
          {tag && (
            <span
              className="font-semibold truncate max-w-full"
              style={{ fontSize: FONT_SIZE.BodyText, padding: TAG_PADDING, borderRadius: TAG_RADIUS, color: tagColor, backgroundColor: `${tagColor}21` }}
            >
              {tag}
            </span>
          )}
        </div>
      </div>

      {headcount > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onExpandClick(); }}
          className="absolute inline-flex items-center bg-white cursor-pointer z-10"
          style={{ bottom: 10, left: '50%', transform: 'translate(-50%, 80%)', padding: HEADCOUNT_PADDING, gap: HEADCOUNT_GAP, border: `0.5px solid ${NEUTRAL_LIGHT}`, borderRadius: 100 }}
        >
          {isExpanded
            ? <ChevronUpIcon className="text-sp-secondary" style={{ width: 12, height: 12 }} />
            : <ChevronDownIcon className="text-sp-secondary" style={{ width: 12, height: 12 }} />}
          <span style={{ fontSize: FONT_SIZE.MetaData }}>{headcount}</span>
        </button>
      )}
    </div>
  );
}
