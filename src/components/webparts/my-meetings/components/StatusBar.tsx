'use client';

import { NEUTRAL_QUATERNARY, STATUS_BAR_RADIUS, STATUS_BAR_WIDTH } from '../MyMeetings.mozzaik';
import type { MeetingStatus } from '../MyMeetings.types';

/**
 * StatusBar — port fidèle (my-meetings.js) : barre verticale 8px radius 8,
 * bordure themePrimary ; accepted → plein themePrimary ; notResponded/tentative →
 * hachures 135° blanc/themePrimary par 4px ; cancelled → blanc bordure neutralQuaternary.
 */
export function StatusBar({ status }: { status: MeetingStatus }) {
  const base: React.CSSProperties = {
    height: '100%',
    minWidth: STATUS_BAR_WIDTH,
    borderRadius: STATUS_BAR_RADIUS,
    border: '1px solid var(--sp-theme-primary)',
    background:
      'repeating-linear-gradient(135deg, #ffffff, #ffffff 4px, var(--sp-theme-primary) 4px, var(--sp-theme-primary) 8px)',
  };
  if (status === 'accepted') base.background = 'var(--sp-theme-primary)';
  if (status === 'cancelled') {
    base.background = '#ffffff';
    base.borderColor = NEUTRAL_QUATERNARY;
  }
  return <span className="shrink-0" style={base} aria-hidden />;
}
