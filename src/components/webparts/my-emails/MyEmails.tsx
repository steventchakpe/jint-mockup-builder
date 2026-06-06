'use client';

import { useMemo, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { CardMail } from './components/CardMail';
import { ChevronLeftIcon, ChevronRightIcon, CommentEditIcon, MailIcon } from './MyEmails.icons';
import {
  BULLETS_GAP,
  BULLETS_PADDING,
  BULLET_ACTIVE_WIDTH,
  BULLET_SIZE,
  CARD_GAP,
  CARD_HEADER,
  CONTENT_PADDING,
  FONT_SIZE,
  HEADER_GAP,
  NAVIGATION_HEIGHT,
  NAVIGATION_PADDING,
  NAV_BUTTON_SIZE,
  rowsForHeight,
} from './MyEmails.mozzaik';
import { useDemoStrings } from '@/lib/i18n';
import type { MyEmailsProps } from './MyEmails.types';

/**
 * Webpart My emails — port fidèle de `ListViewLayout` (@mozzaik365/components/my-emails).
 *
 * Header (LayoutHeader 48px) : titre + boutons « nouveau mail » (CommentEdit) et
 * « Outlook » (Mail), ghost tertiaryTheme, gap 8. Contenu : pile de cartes
 * (gap 12, padding 2), cartes par slide selon la hauteur (1→5). Footer : navigation
 * carousel 48px — chevrons 24px ronds blancs masqués aux extrémités + bullets.
 */
export function MyEmails({ config, content, isEditMode = false, locale = 'fr-FR' }: MyEmailsProps) {
  const { title, height } = config;
  const tw = useDemoStrings().webparts;
  const emails = content.emails;
  const [slide, setSlide] = useState(0);

  const rows = rowsForHeight(height);
  const slides = useMemo(() => {
    const count = Math.ceil(emails.length / rows);
    return Array.from({ length: count }, (_, i) => emails.slice(rows * i, rows * (i + 1)));
  }, [emails, rows]);
  const current = Math.min(slide, Math.max(slides.length - 1, 0));

  return (
    <section className="flex flex-col">
      {/* LayoutHeader : titre + actions */}
      <div className="flex items-center justify-between shrink-0" style={{ height: CARD_HEADER, padding: '0 8px 0 0' }}>
        <InlineText
          as="h2"
          target="config"
          path={['title']}
          value={title}
          placeholder="Titre de la section"
          className="font-semibold text-[#323130]"
          style={{ fontSize: FONT_SIZE.PaneHeader }}
        />
        <div className="flex items-center" style={{ gap: HEADER_GAP }}>
          <button type="button" aria-label="Nouveau message" className="w-8 h-8 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt active:bg-sp-lighter transition-colors">
            <CommentEditIcon style={{ width: 20, height: 20 }} />
          </button>
          <button type="button" aria-label="Aller à Outlook" className="w-8 h-8 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt active:bg-sp-lighter transition-colors">
            <MailIcon style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>

      <div style={{ height: height - CARD_HEADER }}>
        {emails.length === 0 ? (
          <p className="text-body text-gray-500 py-xl text-center">{tw.noEmail}</p>
        ) : (
          <div className="flex flex-col h-full">
            {/* Slide courante */}
            <div className="flex flex-col grow min-h-0" style={{ gap: CARD_GAP, padding: CONTENT_PADDING }}>
              {slides[current]?.map((mail) => (
                <CardMail
                  key={mail.id}
                  mail={mail}
                  index={emails.indexOf(mail)}
                  config={config}
                  rows={rows}
                  isEditMode={isEditMode}
                  locale={locale}
                />
              ))}
            </div>

            {/* Navigation carousel */}
            <div className="flex items-center justify-between shrink-0" style={{ height: NAVIGATION_HEIGHT, padding: NAVIGATION_PADDING }}>
              <button
                type="button"
                aria-label="Slide précédente"
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                className="inline-flex items-center justify-center bg-white"
                style={{ width: NAV_BUTTON_SIZE, height: NAV_BUTTON_SIZE, borderRadius: 100, visibility: current > 0 ? 'visible' : 'hidden' }}
              >
                <ChevronLeftIcon style={{ width: 16, height: 16 }} />
              </button>
              {slides.length > 0 && (
                <div className="flex items-center bg-white" style={{ gap: BULLETS_GAP, padding: BULLETS_PADDING, borderRadius: 100 }}>
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        height: BULLET_SIZE,
                        width: i === current ? BULLET_ACTIVE_WIDTH : BULLET_SIZE,
                        borderRadius: 4,
                        transition: 'width 0.2s ease-out',
                        background: i === current ? '#323130' : 'rgba(50,49,48,0.6)',
                      }}
                    />
                  ))}
                </div>
              )}
              <button
                type="button"
                aria-label="Slide suivante"
                onClick={() => setSlide((s) => Math.min(slides.length - 1, s + 1))}
                className="inline-flex items-center justify-center bg-white"
                style={{ width: NAV_BUTTON_SIZE, height: NAV_BUTTON_SIZE, borderRadius: 100, visibility: current < slides.length - 1 ? 'visible' : 'hidden' }}
              >
                <ChevronRightIcon style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
