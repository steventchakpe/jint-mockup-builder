'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import {
  ArrowRepeatAllIcon,
  AttachIcon,
  CheckmarkCircleIcon,
  ChevronDownIcon,
  DismissCircleIcon,
  QuestionCircleIcon,
  VideoIcon,
} from '../MyMeetings.icons';
import {
  FONT_SIZE,
  ICON_MARGIN,
  MEETING_CARD_ICONS_GAP,
  MEETING_CARD_INFORMATIONS_PADDING,
  MEETING_CARD_PADDING,
  MEETING_CARD_SELECTED_HEIGHT,
  MEETING_CARD_SUBINFORMATIONS_GAP,
  MEETING_CARD_TIME_MAX_WIDTH,
  MEETING_CARD_TIME_PADDING,
  NEUTRAL_LIGHTER,
  NEUTRAL_SECONDARY,
  NEUTRAL_TERTIARY,
  PADDING_ICON,
  RADIUS_MEDIUM,
  SHADOW,
  STATUS_ICON_COLOR,
  calcUnselectedCardHeight,
  tint20,
} from '../MyMeetings.mozzaik';
import { StatusBar } from './StatusBar';
import type { MeetingItem, MeetingStatus, MyMeetingsConfig } from '../MyMeetings.types';

interface MeetingCardProps {
  meeting: MeetingItem;
  index: number;
  config: MyMeetingsConfig;
  rows: number;
  selected: boolean;
  onSelect: () => void;
  isEditMode?: boolean;
  locale?: string;
}

const fmtTime = (iso: string, locale: string) =>
  new Date(iso).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

/** intervalToDuration → « 1h30 » (port de calculateDuration). */
const duration = (start: string, end: string) => {
  const mins = Math.round((Date.parse(end) - Date.parse(start)) / 60000);
  return `${Math.floor(mins / 60)}h${mins % 60 || ''}`;
};

function StatusIcon({ status }: { status: MeetingStatus }) {
  const style = { width: 12, height: 12, color: STATUS_ICON_COLOR[status] };
  if (status === 'accepted') return <CheckmarkCircleIcon style={style} />;
  if (status === 'declined' || status === 'cancelled') return <DismissCircleIcon style={style} />;
  return <QuestionCircleIcon style={style} />;
}

/**
 * MeetingCard — port fidèle (my-meetings.js) : StatusBar à gauche, colonne heure
 * (début BodyText bold, fin MetaData neutralSecondary, durée si sélectionnée),
 * infos (sujet BodyText bold 1 ligne ; si sélectionnée : pastille statut teintée
 * 20 % + caret, bouton Rejoindre si en ligne, participants + icônes répétition/
 * trombone neutralTertiary).
 */
export function MeetingCard({ meeting, index, config, rows, selected, onSelect, isEditMode = false, locale = 'fr-FR' }: MeetingCardProps) {
  const { height, radius, shadow } = config;
  const now = Date.now();
  const inProgress = Date.parse(meeting.startTime) < now && now < Date.parse(meeting.endTime);

  const cardStyle: CSSProperties = {
    padding: MEETING_CARD_PADDING,
    height: selected ? MEETING_CARD_SELECTED_HEIGHT : calcUnselectedCardHeight(rows, height),
    borderRadius: radius,
    boxShadow: SHADOW[shadow],
    border: `1px solid ${NEUTRAL_LIGHTER}`,
  };

  const pill = (
    <span className="inline-flex items-center" style={{ gap: 4 }}>
      <span style={{ padding: PADDING_ICON, marginRight: ICON_MARGIN, borderRadius: RADIUS_MEDIUM, background: tint20(STATUS_ICON_COLOR[meeting.status]), height: 'fit-content', display: 'inline-flex' }}>
        <StatusIcon status={meeting.status} />
      </span>
      <ChevronDownIcon style={{ width: 12, height: 12, color: NEUTRAL_SECONDARY }} />
    </span>
  );

  return (
    <div className="flex w-full bg-white cursor-pointer overflow-hidden" style={cardStyle} onClick={onSelect} data-testid="meeting-card">
      <StatusBar status={meeting.status} />

      {/* Colonne heure */}
      <div className="flex flex-col items-end justify-between shrink-0" style={{ padding: MEETING_CARD_TIME_PADDING, maxWidth: MEETING_CARD_TIME_MAX_WIDTH }}>
        <div className="flex flex-col items-end">
          <span className="font-bold whitespace-nowrap" style={{ fontSize: FONT_SIZE.BodyText }}>
            {meeting.isAllDay ? 'Journée' : fmtTime(meeting.startTime, locale)}
          </span>
          {!meeting.isAllDay && (
            <span className="whitespace-nowrap" style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_SECONDARY }}>
              {fmtTime(meeting.endTime, locale)}
            </span>
          )}
        </div>
        {selected && !meeting.isAllDay && (
          <span className="font-semibold" style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_SECONDARY }}>
            {duration(meeting.startTime, meeting.endTime)}
          </span>
        )}
      </div>

      {/* Informations */}
      <div className="flex flex-col justify-between grow min-w-0" style={{ padding: MEETING_CARD_INFORMATIONS_PADDING }}>
        {!selected ? (
          <span className="font-bold truncate" style={{ fontSize: FONT_SIZE.BodyText }}>{meeting.subject}</span>
        ) : (
          <div className="flex flex-col justify-between grow" style={{ gap: MEETING_CARD_SUBINFORMATIONS_GAP }}>
            <div className="flex items-start justify-between gap-xs">
              <InlineText
                as="span"
                path={['meetings', index, 'subject']}
                value={meeting.subject}
                placeholder="Objet de la réunion"
                className="font-bold truncate"
                style={{ fontSize: FONT_SIZE.BodyText }}
              />
              {meeting.status !== 'cancelled' && pill}
            </div>
            {meeting.isOnlineMeeting && (
              <button
                type="button"
                className={`inline-flex items-center gap-xs h-7 px-sm w-fit text-[12px] font-semibold transition-colors ${
                  inProgress
                    ? 'bg-sp-primary text-white hover:bg-sp-dark-alt active:bg-sp-dark'
                    : 'bg-white text-sp-primary border border-sp-primary hover:bg-sp-lighter-alt'
                }`}
                style={{ borderRadius: radius }}
              >
                <VideoIcon style={{ width: 16, height: 16 }} />
                Rejoindre
              </button>
            )}
            <div className="flex items-center justify-between">
              {/* PersonasGroup — 2 max, taille 24, noms affichés */}
              <div className="flex items-center gap-xs min-w-0">
                <div className="flex" style={{ marginRight: 4 }}>
                  {meeting.attendees.slice(0, 2).map((a, i) => (
                    <span
                      key={i}
                      className="rounded-full overflow-hidden bg-sp-primary text-white inline-flex items-center justify-center font-semibold border-2 border-white"
                      style={{ width: 24, height: 24, fontSize: 10, marginLeft: i ? -6 : 0 }}
                    >
                      {a.imageUrl ? <img src={a.imageUrl} alt={a.name} className="w-full h-full object-cover" /> : a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                    </span>
                  ))}
                </div>
                <span className="truncate" style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_SECONDARY }}>
                  {meeting.attendees.slice(0, 2).map((a) => a.name).join(', ')}
                  {meeting.attendees.length > 2 ? ` +${meeting.attendees.length - 2}` : ''}
                </span>
              </div>
              <div className="flex items-center shrink-0" style={{ gap: MEETING_CARD_ICONS_GAP, color: NEUTRAL_TERTIARY }}>
                {meeting.isOccurrence && <ArrowRepeatAllIcon style={{ width: 16, height: 16 }} />}
                {meeting.hasAttachments && <AttachIcon style={{ width: 16, height: 16 }} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
