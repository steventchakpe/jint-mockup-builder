'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useElementSize } from '@/components/webparts/focus/hooks/useElementSize';
import { MailIcon, PeopleTeamIcon, TextBulletListSquareIcon } from './MyResume.icons';
import {
  BREAKPOINT_CARD_HEIGHT,
  CARDS_GAP,
  CARD_PADDING,
  CONTAINER_GAP,
  FONT_SIZE,
  HEADER_HEIGHT,
  ICON_WRAPPER_PADDING,
  ICON_WRAPPER_RADIUS,
  NEUTRAL_LIGHTER,
  NEUTRAL_PRIMARY,
  NEUTRAL_TERTIARY,
  PRESENTATION_GAP,
  SHADOW,
  SUMMARY_CARDS,
  columnsForWidth,
} from './MyResume.mozzaik';
import type { MyResumeProps, SummaryCardData } from './MyResume.types';

const CARD_ICON = {
  meetings: PeopleTeamIcon,
  mails: MailIcon,
  tasks: TextBulletListSquareIcon,
} as const;

/** CarouselCard — compteur themePrimary + libellé gris, pastille icône 10 %. */
function SummaryCard({ data, textLeft, textType, radius, shadow }: { data: SummaryCardData; textLeft: string; textType: string; radius: number; shadow: keyof typeof SHADOW }) {
  const Icon = CARD_ICON[data.cardType];
  const count = data.itemsLeft > 99 ? '99+' : String(data.itemsLeft);
  return (
    <div
      className="flex flex-col justify-between grow bg-white min-w-0"
      style={{ padding: CARD_PADDING, border: `1px solid ${NEUTRAL_LIGHTER}`, borderRadius: radius, boxShadow: SHADOW[shadow], flexBasis: 0 }}
      data-testid={`my-summary-card-${data.cardType}`}
    >
      <div className="flex items-start justify-between">
        <span className="flex items-center min-w-0" style={{ gap: 2 }}>
          <span className="font-bold text-sp-primary" style={{ fontSize: FONT_SIZE.Header }}>{count}</span>
          <span className="truncate" style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_TERTIARY }}>{textLeft}</span>
        </span>
        <span className="shrink-0 inline-flex bg-sp-primary/10" style={{ padding: ICON_WRAPPER_PADDING, borderRadius: ICON_WRAPPER_RADIUS }}>
          <Icon className="text-sp-primary" style={{ width: 20, height: 20 }} />
        </span>
      </div>
      <span className="font-semibold" style={{ fontSize: FONT_SIZE.BodyText }}>{textType}</span>
    </div>
  );
}

/**
 * Webpart My resume — port fidèle de `ListViewLayout`
 * (@mozzaik365/components/my-summary).
 *
 * Salutation « Bonjour {prénom} ! » (prénom themePrimary) + sous-titre si
 * height > 192, puis cartes compteurs (réunions / e-mails / tâches) —
 * 1-3 par ligne selon la largeur (280/400).
 */
export function MyResume({ config, content, isEditMode = false }: MyResumeProps) {
  const { title, height, radius, shadow } = config;
  const { userName, dashboardName, cards } = content;
  const { ref, size } = useElementSize<HTMLDivElement>();
  const columns = columnsForWidth(size.width);
  const showSubtitle = height > BREAKPOINT_CARD_HEIGHT;
  // cardsPerSlide = columns (1/2/3) — on affiche la première slide
  const shown = SUMMARY_CARDS.slice(0, Math.max(columns, 1));

  return (
    <section className="flex flex-col" ref={ref}>
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: HEADER_HEIGHT, padding: '0 8px 0 0' }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.PaneHeader }}
          />
        </div>
      )}

      <div className="flex flex-col" style={{ height: height - HEADER_HEIGHT, gap: CONTAINER_GAP }}>
        <div className="flex flex-col" style={{ gap: PRESENTATION_GAP }}>
          <p className="font-bold" style={{ fontSize: FONT_SIZE.PaneHeader, color: NEUTRAL_PRIMARY }} data-testid="my-summary-title">
            Bonjour{' '}
            <InlineText as="span" path={['userName']} value={userName} placeholder="Prénom" className="text-sp-primary font-bold" />
            {' '}!
          </p>
          {showSubtitle && (
            <p className="font-semibold" style={{ fontSize: FONT_SIZE.SubjectTitle, color: NEUTRAL_PRIMARY }} data-testid="my-summary-subtitle">
              Voici votre résumé du jour sur <span className="text-sp-primary">{dashboardName}</span>.
            </p>
          )}
        </div>

        <div className="flex grow min-h-0" style={{ gap: CARDS_GAP }}>
          {shown.map((def) => {
            const data = cards.find((c) => c.cardType === def.type) ?? { cardType: def.type, itemsLeft: 0 };
            return <SummaryCard key={def.type} data={data} textLeft={def.textLeft} textType={def.textType} radius={radius} shadow={shadow} />;
          })}
        </div>
      </div>
    </section>
  );
}
