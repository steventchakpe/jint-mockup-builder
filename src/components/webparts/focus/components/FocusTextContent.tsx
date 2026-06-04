import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useElementSize } from '../hooks/useElementSize';
import {
  BODY_TEXT_COLOR,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING_X,
  BUTTON_PADDING_Y,
  DEFAULT_LINE_HEIGHT,
  FONT_SIZE,
  FONT_WEIGHT,
  TAG_FONT_SIZE,
  TAG_PADDING_X,
  TAG_PADDING_Y,
} from '../Focus.mozzaik';
import type { FocusAlignment, FocusCardContent, FocusRedirection } from '../Focus.types';

/** mappingAlignmentToCss — alignSelf / align-items. */
const alignToCss = (a?: FocusAlignment): 'flex-start' | 'center' | 'flex-end' => {
  if (a === 'center') return 'center';
  if (a === 'right' || a === 'bottom') return 'flex-end';
  return 'flex-start';
};

/** mappingAlignmentToTextAlign. */
const alignToTextAlign = (a?: FocusAlignment): 'left' | 'center' | 'right' => {
  if (a === 'center') return 'center';
  if (a === 'right') return 'right';
  return 'left';
};

interface FocusTextContentProps {
  cardContent: FocusCardContent;
  redirection?: FocusRedirection;
  radius: number;
  onRedirect?: (url: string) => void;
}

/**
 * Port fidèle de `FocusTextContent`.
 * Structure : conteneur (space-between) → [ {tag + titre} + description ] + bouton.
 * Le nombre de lignes de la description est calculé dynamiquement
 * (hauteur disponible / 19px), exactement comme l'original.
 */
export function FocusTextContent({ cardContent, redirection, radius, onRedirect }: FocusTextContentProps) {
  const { ref: descRef, size: descSize } = useElementSize<HTMLDivElement>();

  const button = redirection?.buttonProps;
  const showButton = !!button?.visible && !!(button?.value || button?.html);
  const buttonLayoutIsHorizontal = button?.position === 'right';
  const buttonAlign = button?.alignment ? alignToCss(button.alignment) : undefined;

  const descriptionMaxLines = useMemo(
    () => Math.floor(descSize.height / DEFAULT_LINE_HEIGHT),
    [descSize.height],
  );

  const displayTag = cardContent.tag?.visible !== false && !!(cardContent.tag?.value || cardContent.tag?.html);
  const displayTitle = cardContent.title.visible !== false;
  const displayDescription = cardContent.description.visible !== false;

  const handleButtonClick = () => {
    if (onRedirect && redirection?.linkUrl) onRedirect(redirection.linkUrl);
  };

  const renderButton = () => {
    const isSecondary = button?.type === 'secondary';
    return (
      <span
        className={cn(
          'inline-flex items-center font-semibold transition-colors',
          isSecondary
            ? 'border border-sp-primary text-sp-primary hover:bg-sp-lighter-alt'
            : 'bg-sp-primary text-white hover:bg-sp-dark-alt active:bg-sp-dark',
        )}
        style={{
          borderRadius: radius,
          padding: `${BUTTON_PADDING_Y}px ${BUTTON_PADDING_X}px`,
          fontSize: BUTTON_FONT_SIZE,
          ...(button?.color ? { background: button.color } : {}),
        }}
      >
        {button?.html ? (
          <span dangerouslySetInnerHTML={{ __html: button.html }} />
        ) : (
          <InlineText
            as="span"
            path={['redirection', 'buttonProps', 'value']}
            value={button?.value}
            placeholder="Bouton"
          />
        )}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'flex grow h-full overflow-hidden gap-sm justify-between',
        buttonLayoutIsHorizontal ? 'flex-row' : 'flex-col',
      )}
      style={{ borderRadius: cardContent.position === 'top' ? radius : undefined }}
    >
      {/* textContainer : gap 12, hauteur 100%, overflow hidden */}
      <div className="flex flex-col gap-md h-full overflow-hidden">
        {/* tag + titre (gap 0) */}
        <div className="flex flex-col">
          {displayTag && (
            <div className="flex" style={{ alignSelf: alignToCss(cardContent.tag?.alignment) }}>
              {/* Tag Secondary / Small : bg themeLighterAlt, texte themePrimary, 12px, padding 4/12, radius = radius layout */}
              <span
                className="inline-flex items-center w-max max-w-full bg-sp-lighter-alt text-sp-primary"
                style={{
                  borderRadius: radius,
                  fontSize: TAG_FONT_SIZE,
                  padding: `${TAG_PADDING_Y}px ${TAG_PADDING_X}px`,
                }}
              >
                {cardContent.tag?.html ? (
                  <span dangerouslySetInnerHTML={{ __html: cardContent.tag.html }} />
                ) : (
                  <InlineText as="span" path={['card', 'tag', 'value']} value={cardContent.tag?.value} placeholder="Tag" />
                )}
              </span>
            </div>
          )}
          {/* Titre : Text SubjectTitle (16px) / Bold (700), maxLine 2, word-break keep-all, couleur bodyText par défaut */}
          {displayTitle && (
          <div className="w-full" style={{ textAlign: alignToTextAlign(cardContent.title.alignment) }}>
            {cardContent.title.html ? (
              <div
                className="line-clamp-2 [word-break:keep-all]"
                style={{
                  fontSize: FONT_SIZE.SubjectTitle,
                  fontWeight: FONT_WEIGHT.Bold,
                  color: cardContent.title.color ?? BODY_TEXT_COLOR,
                }}
                dangerouslySetInnerHTML={{ __html: cardContent.title.html }}
              />
            ) : (
              <InlineText
                as="h3"
                path={['card', 'title', 'value']}
                value={cardContent.title.value || ''}
                placeholder="Titre"
                className="line-clamp-2 [word-break:keep-all]"
                style={{
                  fontSize: FONT_SIZE.SubjectTitle,
                  fontWeight: FONT_WEIGHT.Bold,
                  color: cardContent.title.color ?? BODY_TEXT_COLOR,
                }}
              />
            )}
          </div>
          )}
        </div>

        {/* description : lignes dynamiques selon la hauteur disponible */}
        <div
          ref={descRef}
          className="w-full grow overflow-hidden"
          style={{ textAlign: alignToTextAlign(cardContent.description.alignment) }}
        >
          {/* Description : Text BodyText (14px) / Regular (400), nb de lignes dynamique, word-break keep-all */}
          {displayDescription && descriptionMaxLines > 0 &&
            (cardContent.description.html ? (
              <div
                className="overflow-hidden [word-break:keep-all]"
                style={{
                  fontSize: FONT_SIZE.BodyText,
                  fontWeight: FONT_WEIGHT.Regular,
                  color: cardContent.description.color ?? BODY_TEXT_COLOR,
                  display: '-webkit-box',
                  WebkitLineClamp: descriptionMaxLines,
                  WebkitBoxOrient: 'vertical',
                }}
                dangerouslySetInnerHTML={{ __html: cardContent.description.html }}
              />
            ) : (
              <InlineText
                as="p"
                path={['card', 'description', 'value']}
                value={cardContent.description.value || ''}
                placeholder="Description"
                className="overflow-hidden [word-break:keep-all]"
                style={{
                  fontSize: FONT_SIZE.BodyText,
                  fontWeight: FONT_WEIGHT.Regular,
                  color: cardContent.description.color ?? BODY_TEXT_COLOR,
                  display: '-webkit-box',
                  WebkitLineClamp: descriptionMaxLines,
                  WebkitBoxOrient: 'vertical',
                }}
              />
            ))}
        </div>
      </div>

      {/* bouton */}
      {showButton && (
        <div
          className={cn('flex shrink-0', buttonLayoutIsHorizontal && 'h-full')}
          style={
            buttonLayoutIsHorizontal
              ? { alignItems: buttonAlign }
              : { justifyContent: buttonAlign }
          }
        >
          {onRedirect ? (
            <button
              type="button"
              onClick={handleButtonClick}
              style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
            >
              {renderButton()}
            </button>
          ) : (
            <a href={redirection?.linkUrl} target="_blank" rel="noreferrer">
              {renderButton()}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
