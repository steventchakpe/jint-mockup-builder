import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Events } from './Events';
import { eventsDefaultConfig } from './Events.config';
import type { EventsContent } from './Events.types';

const mockContent: EventsContent = {
  events: [
    {
      id: 'e1',
      title: 'Assemblée générale annuelle',
      location: 'Auditorium — Siège social',
      startDate: '2026-05-14T09:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      url: '#',
    },
    {
      id: 'e2',
      title: 'Atelier conformité réglementaire',
      location: 'Salle Montréal',
      startDate: '2026-05-18T14:00:00',
    },
    {
      id: 'e3',
      title: 'Journée portes ouvertes',
      location: 'Hall principal',
      startDate: '2026-05-22T10:00:00',
      isAllDay: true,
    },
    {
      id: 'e4',
      title: 'Formation cybersécurité',
      startDate: '2026-05-25T08:30:00',
    },
    {
      id: 'e5',
      title: 'Cinquième événement (hors limite)',
      startDate: '2026-05-28T08:30:00',
    },
  ],
};

describe('Events', () => {
  it('renders without crash with default props', () => {
    render(<Events config={eventsDefaultConfig} content={mockContent} />);
    expect(screen.getByText('Assemblée générale annuelle')).toBeInTheDocument();
  });

  it('renders a section title when provided', () => {
    render(<Events config={{ ...eventsDefaultConfig, title: 'Événements' }} content={mockContent} />);
    expect(screen.getByText('Événements')).toBeInTheDocument();
  });

  it('respects maxItems limit', () => {
    render(<Events config={{ ...eventsDefaultConfig, maxItems: 4 }} content={mockContent} />);
    expect(screen.queryByText('Cinquième événement (hors limite)')).not.toBeInTheDocument();
  });

  it('calls onEventClick when a card is clicked in presentation mode', async () => {
    const user = userEvent.setup();
    const onEventClick = vi.fn();
    render(
      <Events config={eventsDefaultConfig} content={mockContent} isEditMode={false} onEventClick={onEventClick} />,
    );
    await user.click(screen.getByText('Assemblée générale annuelle'));
    expect(onEventClick).toHaveBeenCalledWith('e1');
  });

  it('does not call onEventClick in edit mode', async () => {
    const user = userEvent.setup();
    const onEventClick = vi.fn();
    render(
      <Events config={eventsDefaultConfig} content={mockContent} isEditMode={true} onEventClick={onEventClick} />,
    );
    await user.click(screen.getByText('Assemblée générale annuelle'));
    expect(onEventClick).not.toHaveBeenCalled();
  });

  it('fires onAddToCalendar without triggering the card click', async () => {
    const user = userEvent.setup();
    const onEventClick = vi.fn();
    const onAddToCalendar = vi.fn();
    render(
      <Events
        config={eventsDefaultConfig}
        content={mockContent}
        onEventClick={onEventClick}
        onAddToCalendar={onAddToCalendar}
      />,
    );
    const buttons = screen.getAllByTestId('add-to-calendar-button');
    await user.click(buttons[0]);
    expect(onAddToCalendar).toHaveBeenCalledWith('e1');
    expect(onEventClick).not.toHaveBeenCalled();
  });

  it('hides the add-to-calendar button when disabled', () => {
    render(
      <Events config={{ ...eventsDefaultConfig, showAddToCalendar: false }} content={mockContent} />,
    );
    expect(screen.queryByTestId('add-to-calendar-button')).not.toBeInTheDocument();
  });

  it('renders empty state gracefully', () => {
    render(<Events config={eventsDefaultConfig} content={{ events: [] }} />);
    expect(screen.getByText('Aucun événement à venir.')).toBeInTheDocument();
  });
});
