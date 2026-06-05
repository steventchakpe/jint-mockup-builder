import {
  MEETINGS_SLIDE_GAP,
  MEETING_CARD_PADDING,
  MEETING_CARD_SELECTED_HEIGHT,
  NEUTRAL_LIGHTER,
  calcUnselectedCardHeight,
  rowsForHeight,
} from './MyMeetings.mozzaik';
import { myMeetingsDefaultConfig } from './MyMeetings.config';
import type { MyMeetingsConfig } from './MyMeetings.types';

/** Skeleton — même disposition que les slides (1 carte « sélectionnée » + N compactes). */
export function MyMeetingsSkeleton({ config = myMeetingsDefaultConfig }: { config?: MyMeetingsConfig }) {
  const rows = rowsForHeight(config.height);
  const pulse = 'bg-sp-lighter-alt animate-pulse';
  return (
    <div className="flex flex-col" style={{ gap: MEETINGS_SLIDE_GAP }}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="flex bg-white"
          style={{
            height: i === 0 ? MEETING_CARD_SELECTED_HEIGHT : calcUnselectedCardHeight(rows, config.height),
            padding: MEETING_CARD_PADDING,
            gap: 12,
            borderRadius: config.radius,
            border: `1px solid ${NEUTRAL_LIGHTER}`,
          }}
        >
          <div className={pulse} style={{ width: 8, borderRadius: 8 }} />
          <div className={`${pulse} rounded-sm`} style={{ width: 53, height: 20 }} />
          <div className={`${pulse} rounded-sm grow`} style={{ height: 20 }} />
        </div>
      ))}
    </div>
  );
}
