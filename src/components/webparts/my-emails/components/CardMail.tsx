'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { AttachIcon } from '../MyEmails.icons';
import {
  CARD_BREAKPOINT,
  CARD_MAIL_GAP,
  CARD_MAIL_PADDING,
  FONT_SIZE,
  ICON_CONTAINER_WIDTH,
  NEUTRAL_LIGHTER,
  NEUTRAL_PRIMARY,
  NEUTRAL_SECONDARY,
  NEUTRAL_SECONDARY_ALT,
  NEUTRAL_TERTIARY,
  PERSONA_DATE_GAP,
  PERSONA_FONT_SIZE,
  PERSONA_SIZE,
  SHADOW,
  SMALL_CARD_TEXT_GAP,
  TEXT_GAP,
  calcCardHeight,
} from '../MyEmails.mozzaik';
import type { MailItem, MyEmailsConfig } from '../MyEmails.types';

interface CardMailProps {
  mail: MailItem;
  index: number;
  config: MyEmailsConfig;
  rows: number;
  isEditMode?: boolean;
  locale?: string;
}

const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : (p[0]?.slice(0, 2) ?? '')).toUpperCase();
};

/** dateFormatter 'Pp' — ex fr : 05/06/2026 09:30. */
const fmtDateTime = (iso: string, locale: string) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`;
};

/**
 * CardMail — port fidèle (my-emails.js) : Card blanche bordure 1px neutralLighter,
 * padding 8, hauteur calculée, radius/ombre configurables. Header : persona 24
 * (bold, lu → neutralSecondaryAlt) + heure MetaData bold (lu → neutralTertiary,
 * sinon themePrimary). Sujet SubjectTitle bold 1 ligne (mêmes couleurs que l'heure),
 * aperçu BodyText (lu → neutralTertiary, sinon neutralSecondary) 1-2 lignes,
 * trombone neutralTertiary aligné bas (minWidth 40).
 */
export function CardMail({ mail, index, config, rows, isEditMode = false, locale = 'fr-FR' }: CardMailProps) {
  const { height, radius, shadow } = config;
  const { isRead } = mail;
  const small = height < CARD_BREAKPOINT;

  const cardStyle: CSSProperties = {
    padding: CARD_MAIL_PADDING,
    height: calcCardHeight(height, rows),
    borderRadius: radius,
    boxShadow: SHADOW[shadow],
    border: `solid 1px ${NEUTRAL_LIGHTER}`,
    gap: CARD_MAIL_GAP,
  };

  return (
    <div className="flex flex-col w-full bg-white cursor-pointer overflow-hidden" style={cardStyle} data-testid="card-mail">
      {/* Header : persona + heure */}
      <div className="flex items-center justify-between shrink-0" style={{ gap: PERSONA_DATE_GAP }}>
        <div className="flex items-center gap-sm min-w-0">
          <div
            className="shrink-0 rounded-full overflow-hidden bg-sp-primary text-white flex items-center justify-center font-semibold"
            style={{ width: PERSONA_SIZE, height: PERSONA_SIZE, fontSize: PERSONA_FONT_SIZE }}
          >
            {mail.imageUrl
              ? <img src={mail.imageUrl} alt={mail.displayName} className="w-full h-full object-cover" loading="lazy" />
              : getInitials(mail.displayName)}
          </div>
          <InlineText
            as="span"
            path={['emails', index, 'displayName']}
            value={mail.displayName}
            placeholder="Expéditeur"
            className="font-bold truncate"
            style={{ fontSize: PERSONA_FONT_SIZE, color: isRead ? NEUTRAL_SECONDARY_ALT : NEUTRAL_PRIMARY }}
          />
        </div>
        <span
          className="shrink-0 font-bold"
          style={{ fontSize: FONT_SIZE.MetaData, color: isRead ? NEUTRAL_TERTIARY : undefined }}
        >
          <span className={isRead ? undefined : 'text-sp-primary'}>{fmtDateTime(mail.receptHour, locale)}</span>
        </span>
      </div>

      {/* Sujet + aperçu */}
      <div className="flex flex-col grow min-h-0" style={{ gap: small ? SMALL_CARD_TEXT_GAP : TEXT_GAP }}>
        <InlineText
          as="span"
          path={['emails', index, 'subject']}
          value={mail.subject}
          placeholder="Objet"
          className={`font-bold truncate ${isRead ? '' : 'text-sp-primary'}`}
          style={{ fontSize: FONT_SIZE.SubjectTitle, color: isRead ? NEUTRAL_TERTIARY : undefined }}
        />
        <div className="flex items-end justify-between grow min-h-0">
          <InlineText
            as="p"
            path={['emails', index, 'bodyPreview']}
            value={mail.bodyPreview}
            placeholder="Aperçu du message"
            className="min-w-0"
            style={{
              fontSize: FONT_SIZE.BodyText,
              color: isRead ? NEUTRAL_TERTIARY : NEUTRAL_SECONDARY,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: small ? 1 : 2,
              overflow: 'hidden',
            }}
          />
          {mail.hasAttachments && (
            <span className="flex items-end justify-end h-full shrink-0" style={{ minWidth: ICON_CONTAINER_WIDTH, color: NEUTRAL_TERTIARY }}>
              <AttachIcon style={{ width: 16, height: 16 }} aria-hidden />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
