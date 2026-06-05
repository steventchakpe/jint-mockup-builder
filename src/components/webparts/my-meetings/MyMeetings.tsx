'use client';

import { useMemo, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { MeetingCard } from './components/MeetingCard';
import { ChevronLeftIcon, ChevronRightIcon } from './MyMeetings.icons';
import {
  CARD_HEADER,
  FONT_SIZE,
  MEETINGS_SLIDE_GAP,
  NAVIGATION_HEIGHT,
  rowsForHeight,
} from './MyMeetings.mozzaik';
import type { MyMeetingsProps } from './MyMeetings.types';

/**
 * Webpart My meetings — port fidèle de `ListViewLayout` (@mozzaik365/components/my-meetings).
 *
 * Header (48px) : titre + lien « Calendrier » (themePrimary) à droite.
 * Slides de cartes (gap 12) selon la hauteur (1→7 lignes) ; la première carte de
 * chaque slide est sélectionnée (détaillée, 120px), clic = sélection. Footer :
 * navigation carousel 48px (chevrons ronds + bullets).
 */
export function MyMeetings({ config, content, isEditMode = false, locale = 'fr-FR' }: MyMeetingsProps) {
  const { title, height } = config;
  const meetings = content.meetings;
  const [slide, setSlide] = useState(0);
  const [selectedBySlide, setSelectedBySlide] = useState<Record<number, string>>({});

  const rows = rowsForHeight(height);
  const slides = useMemo(() => {
    const count = Math.ceil(meetings.length / rows);
    return Array.from({ length: count }, (_, i) => meetings.slice(rows * i, rows * (i + 1)));
  }, [meetings, rows]);
  const current = Math.min(slide, Math.max(slides.length - 1, 0));
  const selectedId = selectedBySlide[current] ?? slides[current]?.[0]?.id;

  return (
    <section className="flex flex-col">
      {/* LayoutHeader : titre + lien Calendrier */}
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
        <a href="https://outlook.office365.com/calendar/" target="_blank" rel="noreferrer" className="text-sp-primary hover:underline" style={{ fontSize: FONT_SIZE.BodyText }} onClick={(e) => { if (isEditMode) e.preventDefault(); }}>
          Calendrier
        </a>
      </div>

      <div style={{ height: height - CARD_HEADER }}>
        {meetings.length === 0 ? (
          <p className="text-body text-gray-500 py-xl text-center">Aucune réunion à venir</p>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex flex-col grow min-h-0" style={{ gap: MEETINGS_SLIDE_GAP }}>
              {slides[current]?.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  index={meetings.indexOf(meeting)}
                  config={config}
                  rows={rows}
                  selected={meeting.id === selectedId}
                  onSelect={() => setSelectedBySlide((s) => ({ ...s, [current]: meeting.id }))}
                  isEditMode={isEditMode}
                  locale={locale}
                />
              ))}
            </div>

            {/* Navigation carousel */}
            <div className="flex items-center justify-between shrink-0" style={{ height: NAVIGATION_HEIGHT, padding: '4px 8px' }}>
              <button
                type="button"
                aria-label="Slide précédente"
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                className="inline-flex items-center justify-center bg-white"
                style={{ width: 24, height: 24, borderRadius: 100, visibility: current > 0 ? 'visible' : 'hidden' }}
              >
                <ChevronLeftIcon style={{ width: 16, height: 16 }} />
              </button>
              {slides.length > 0 && (
                <div className="flex items-center bg-white" style={{ gap: 8, padding: 8, borderRadius: 100 }}>
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        height: 6,
                        width: i === current ? 16 : 6,
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
                style={{ width: 24, height: 24, borderRadius: 100, visibility: current < slides.length - 1 ? 'visible' : 'hidden' }}
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
