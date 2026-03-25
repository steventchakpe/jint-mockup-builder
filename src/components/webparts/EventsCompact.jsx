// ── Events: Compact – w=380px, h=356px ───────────────────────────────────────
// Liste compacte d'événements avec carré de date (jour + mois)

import { MapPin } from 'lucide-react'

const events = [
  { id: 1, day: '24', month: 'JUN', title: 'Ateliers Microsoft Teams',              time: '9:30 AM', location: 'Salle Innovation' },
  { id: 2, day: '25', month: 'JUN', title: 'Journée découverte des métiers 2024',   time: '10:00 AM', location: 'Siège social' },
  { id: 3, day: '28', month: 'JUN', title: 'Finale Hackathon InnoVert',             time: '14:00 PM', location: 'Campus Digital' },
  { id: 4, day: '1',  month: 'JUL', title: 'Réunion COMEX – Résultats T2',          time: '9:00 AM',  location: 'Teams' },
]

export default function EventsCompact() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <p className="text-[20px] font-semibold leading-[26px] text-[#323130]">Prochains événements</p>
        <span className="text-[14px] leading-[20px]" style={{ color: 'var(--brand-color)' }}>
          Voir tout
        </span>
      </div>

      {/* Event list */}
      <div className="flex flex-col gap-0 divide-y divide-[#edebe9]">
        {events.map((event) => (
          <div key={event.id} className="flex gap-3 items-start py-3">
            {/* Date square */}
            <div
              className="flex flex-col items-center justify-center shrink-0 rounded-[2px] border border-[#e1dfdd]"
              style={{ width: 48, height: 48 }}
            >
              <span className="text-[18px] font-bold leading-[20px] text-[#323130]">{event.day}</span>
              <span
                className="text-[11px] font-semibold leading-[14px] uppercase"
                style={{ color: 'var(--brand-color)' }}
              >
                {event.month}
              </span>
            </div>
            {/* Info */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="text-[14px] font-semibold leading-[20px] text-[#323130] overflow-hidden" style={{ maxHeight: 40 }}>
                {event.title}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[12px] leading-[16px] text-[#605e5c]">{event.time}</span>
                <div className="flex items-center gap-1">
                  <MapPin style={{ width: 11, height: 11, color: '#605e5c' }} />
                  <span className="text-[12px] leading-[16px] text-[#605e5c] overflow-hidden whitespace-nowrap text-ellipsis max-w-[120px]">
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
