// ── News: List – w=380px, h=388px ────────────────────────────────────────────
// Liste compacte d'actualités dans la colonne étroite (380px)

const listNews = [
  { id: 1, org: 'RH',         title: 'Nouvelle politique télétravail dès septembre',        date: '18 juin' },
  { id: 2, org: 'IT',         title: 'Mise à jour obligatoire de Windows 11 : planning',    date: '17 juin' },
  { id: 3, org: 'Direction',  title: 'Assemblée générale annuelle – enregistrement dispo.', date: '16 juin' },
  { id: 4, org: 'Commercial', title: 'Partenariat stratégique avec Schneider Electric',     date: '15 juin' },
  { id: 5, org: 'Projets',    title: 'Certification ISO 27001 obtenue pour le pôle Digital', date: '14 juin' },
]

export default function NewsList() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <p className="text-[20px] font-semibold leading-[26px] text-[#323130]">À la une</p>
        <span className="text-[14px] leading-[20px]" style={{ color: 'var(--brand-color)' }}>
          Voir tout
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col divide-y divide-[#edebe9]">
        {listNews.map((item) => (
          <div key={item.id} className="flex gap-3 items-start py-3">
            {/* Thumbnail */}
            <div className="shrink-0 overflow-hidden rounded-[2px]" style={{ width: 56, height: 56 }}>
              <img
                src={`https://picsum.photos/seed/sp-nl${item.id}/112/112`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span
                className="text-white text-[11px] font-semibold uppercase rounded-[2px] px-[6px] py-[1px] self-start"
                style={{ backgroundColor: 'var(--brand-color)' }}
              >
                {item.org}
              </span>
              <p className="text-[13px] font-semibold leading-[18px] text-[#323130] overflow-hidden" style={{ maxHeight: 36 }}>
                {item.title}
              </p>
              <span className="text-[12px] leading-[16px] text-[#605e5c]">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
