// ── Events: Filmstrip – w=1204px, h≈419px ────────────────────────────────────
// Figma (valeurs exactes) :
//   Card : border 1px #e1dfdd, rounded-[2px], shadow-sp-4
//   Image area : h=135px + gradient from-[rgba(51,51,51,0.9)] to transparent
//   Date overlay on image : day Bold 42px + month Semibold 18px uppercase, text-white
//   Content : h=133px, border-b/t 1px #edebe9
//     Category : Regular 12px/16px #605e5c
//     Title    : Regular 14px/20px #323130, max-h=40px
//     Date+time: Semibold 12px/16px #605e5c
//     Location : Regular 12px/16px #605e5c
//   Download bar : h=35px, icon left-[12px]
//   Gap between cards : 20px
//   Pagination dots + title/see-all header

import { Calendar, ChevronRight } from 'lucide-react'

const events = [
  { id: 1, day: '24', month: 'JUN', category: 'Formation',    title: 'Ateliers Microsoft Teams : Collaboration avancée', time: 'Lun, 24 Jun, 9:30', location: 'Salle Innovation – Bât. A' },
  { id: 2, day: '25', month: 'JUN', category: 'Événement RH', title: 'Journée découverte des métiers internes 2024',     time: 'Mar, 25 Jun, 10:00', location: 'Siège social – Grande salle' },
  { id: 3, day: '28', month: 'JUN', category: 'Hackathon',    title: 'Finale du Hackathon Interne InnoVert',             time: 'Ven, 28 Jun, 14:00', location: 'Campus Digital – Plateau' },
  { id: 4, day: '1',  month: 'JUI', category: 'Direction',    title: 'Réunion trimestrielle COMEX – Résultats T2',       time: 'Lun, 1 Jul, 9:00',  location: 'Visioconférence Teams' },
]

function EventCard({ event }) {
  return (
    <div
      className="flex flex-col flex-1 min-w-0 overflow-hidden border border-[#e1dfdd] rounded-[2px] bg-white"
      style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.14), 0px 0px 2px rgba(0,0,0,0.12)' }}
    >
      {/* Image + date overlay */}
      <div className="relative overflow-hidden bg-white" style={{ height: 135 }}>
        <img
          src={`https://picsum.photos/seed/sp-ev${event.id}/600/270`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(51,51,51,0.9) 0%, rgba(51,51,51,0) 60%)' }}
        />
        {/* Date overlay (white text, bottom-left) */}
        <div
          className="absolute not-italic overflow-hidden text-white"
          style={{ bottom: 8, left: 12, height: 80, width: '75%' }}
        >
          <p
            className="absolute font-bold text-[42px] leading-[42px] text-white"
            style={{ bottom: 42, left: 0, transform: 'translateY(100%)' }}
          >
            {event.day}
          </p>
          <p
            className="absolute font-semibold text-[18px] leading-[24px] text-white uppercase"
            style={{ bottom: 66, left: 0, transform: 'translateY(100%)' }}
          >
            {event.month}
          </p>
        </div>
      </div>

      {/* Content – h=133px */}
      <div
        className="border-t border-b border-[#edebe9] overflow-hidden relative"
        style={{ height: 133 }}
      >
        <div
          className="absolute flex flex-col gap-[14px] items-start not-italic text-ellipsis"
          style={{ top: 10, left: 12, right: 12, height: 122 }}
        >
          {/* Category + title */}
          <div className="relative w-full" style={{ height: 56 }}>
            <p
              className="absolute overflow-hidden text-[12px] leading-[16px] font-semibold text-[#605e5c]"
              style={{ top: 0, left: 0, height: 16 }}
            >
              {event.category}
            </p>
            <p
              className="absolute overflow-hidden text-[14px] leading-[20px] text-[#323130]"
              style={{ top: 16, left: 0, height: 40 }}
            >
              {event.title}
            </p>
          </div>

          {/* Date + location */}
          <div className="flex flex-col gap-[11px] w-full pb-[10px]" style={{ height: 53 }}>
            <p className="text-[12px] font-semibold leading-[16px] text-[#605e5c]">{event.time}</p>
            <p className="text-[12px] leading-[16px] text-[#605e5c] overflow-hidden whitespace-nowrap">{event.location}</p>
          </div>
        </div>
      </div>

      {/* Download / Add to calendar – h=35px */}
      <div className="flex items-center" style={{ height: 35 }}>
        <Calendar
          className="ml-[12px]"
          style={{ width: 16, height: 16, color: '#605e5c' }}
        />
      </div>
    </div>
  )
}

export default function EventsFilmstrip() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-end justify-between">
        <p className="text-[20px] font-semibold leading-[26px] text-[#323130]">Événements</p>
        <span className="text-[14px] leading-[20px]" style={{ color: 'var(--brand-color)' }}>
          Voir tout
        </span>
      </div>

      {/* Cards + pagination */}
      <div className="flex flex-col gap-7 w-full">
        <div className="flex gap-[20px] w-full">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[10px]"
              style={{
                width: 20, height: 20,
                border: `1px solid ${i === 0 ? 'var(--brand-color)' : '#323130'}`,
                position: 'relative',
              }}
            >
              {i === 0 && (
                <div
                  className="absolute rounded-full"
                  style={{ width: 10, height: 10, top: 4, left: 4, backgroundColor: 'var(--brand-color)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
