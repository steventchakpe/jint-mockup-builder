// ── News: Hub – w=1204px, h≈505px ────────────────────────────────────────────
// Layout SP standard : 1 article vedette (gauche, large) + 4 articles (droite)
// Kicker, titre, description, auteur, date – mêmes tokens que Side-by-side

const HUB_IMG = (i) => `https://picsum.photos/seed/sp-hub${i}/800/450`

const featured = {
  org: 'Direction Générale',
  title: 'Stratégie 2025-2030 : cap sur l\'innovation responsable et la croissance durable',
  desc: 'Le COMEX présente sa vision pour les cinq prochaines années, articulée autour de quatre axes stratégiques prioritaires.',
  author: 'Jean-Pierre Blanc',
  date: '18 juin 2024',
  img: HUB_IMG(1),
}

const secondary = [
  { id: 2, org: 'Développement Durable', title: 'Notre bilan carbone 2023 : -22% d\'émissions', author: 'Claire Vidal', date: '17 juin' },
  { id: 3, org: 'Talents',               title: 'Lancement du programme de mentoring 2024-2025', author: 'Emma Faure',  date: '16 juin' },
  { id: 4, org: 'Commercial',            title: 'Nouveau record : 500 clients en portefeuille', author: 'Thomas Rey',  date: '15 juin' },
  { id: 5, org: 'Projets',               title: 'Prix de l\'innovation : le projet InnoVert récompensé', author: 'Nadia Karin', date: '14 juin' },
]

function FeaturedArticle() {
  return (
    <div className="flex flex-col gap-3 flex-1 min-w-0">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 270 }}>
        <img src={featured.img} alt="" className="w-full h-full object-cover" />
        {/* Gradient */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 180,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Kicker on image */}
        <div className="absolute top-3 left-3">
          <span
            className="text-white text-[12px] font-semibold leading-[16px] uppercase rounded-[2px] px-2 py-[2px]"
            style={{ backgroundColor: 'var(--brand-color)' }}
          >
            {featured.org}
          </span>
        </div>
      </div>
      {/* Text content */}
      <div className="flex flex-col gap-2 pt-[3px]">
        <p className="font-semibold text-[20px] leading-[26px] text-[#323130]">{featured.title}</p>
        <p className="text-[14px] leading-[20px] text-[#605e5c]">{featured.desc}</p>
        <div className="flex items-center gap-[5px]">
          <span className="text-[12px] font-semibold text-[#323130]">{featured.author}</span>
          <span className="text-[12px] font-semibold text-[#605e5c]">{featured.date}</span>
        </div>
      </div>
    </div>
  )
}

function SecondaryArticle({ item }) {
  return (
    <div className="flex gap-3 items-start pb-[16px] border-b border-[#edebe9] last:border-b-0 last:pb-0">
      <div className="shrink-0 overflow-hidden" style={{ width: 96, height: 64 }}>
        <img
          src={`https://picsum.photos/seed/sp-hub${item.id}/192/128`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span
          className="text-white text-[11px] font-semibold uppercase rounded-[2px] px-[6px] py-[1px] self-start"
          style={{ backgroundColor: 'var(--brand-color)' }}
        >
          {item.org}
        </span>
        <p className="text-[14px] font-semibold leading-[20px] text-[#323130] overflow-hidden" style={{ maxHeight: 40 }}>
          {item.title}
        </p>
        <div className="flex items-center gap-[5px]">
          <span className="text-[12px] font-semibold text-[#323130]">{item.author}</span>
          <span className="text-[12px] font-semibold text-[#605e5c]">{item.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function NewsHub() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Webpart header */}
      <div className="flex items-end justify-between">
        <p className="text-[20px] font-semibold leading-[26px] text-[#323130]">Actualités</p>
        <span className="text-[14px] leading-[20px]" style={{ color: 'var(--brand-color)' }}>
          Voir tout
        </span>
      </div>

      {/* Content: featured (left) + secondary list (right) */}
      <div className="flex gap-8 w-full">
        <FeaturedArticle />

        {/* Right column: 4 secondary articles */}
        <div className="flex flex-col gap-0 w-[380px] shrink-0">
          {secondary.map((item) => (
            <SecondaryArticle key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
