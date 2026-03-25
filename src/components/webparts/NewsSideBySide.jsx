// ── News: Side-by-side – w=1204px, h=291px ───────────────────────────────────
// Figma : 2 colonnes × 2 rangées, gap-[32px]
//   Image     : w=196px h=112px, border 1px #e1dfdd
//   Kicker    : bg var(--brand-color), text-white uppercase text-[12px] Semibold
//               px-[8px] py-[2px] rounded-[2px]
//   Title     : Semibold 16px/22px #323130, max-h=[44px] (2 rows)
//   Desc      : Regular 14px/20px #605e5c, h=20px
//   Author+Date: Semibold 12px/16px
//   Row sep   : border-b #edebe9, pb-[20px]

const NEWS_IMG = (i) => `https://picsum.photos/seed/sp-news${i}/392/224`

const newsItems = [
  { id: 1, org: 'RH',         title: 'Nouveau programme de bien-être et santé au travail', desc: 'Découvrez nos nouvelles initiatives pour votre bien-être',      author: 'Marie Dupont',  date: '15 juin' },
  { id: 2, org: 'Direction',  title: 'Résultats du T2 : une croissance soutenue malgré les défis', desc: 'Le groupe affiche une progression de 8% sur le semestre', author: 'Paul Martin',   date: '12 juin' },
  { id: 3, org: 'IT',         title: 'Migration vers Microsoft 365 : dernières étapes', desc: 'Calendrier final et ressources de formation disponibles',   author: 'Sophie Leroi',  date: '10 juin' },
  { id: 4, org: 'Innovation', title: 'Hackathon interne : les projets finalistes sélectionnés', desc: '14 projets retenus pour la finale du 28 juin',            author: 'Lucas Morel',   date: '8 juin'  },
]

function NewsItem({ item, isLast }) {
  return (
    <div
      className={`flex flex-[1_0_0] flex-col items-start min-w-0 ${!isLast ? 'border-b border-[#edebe9] pb-[20px]' : ''}`}
    >
      <div className="flex gap-[20px] items-start w-full">
        {/* Thumbnail – 196×112 */}
        <div
          className="shrink-0 border border-[#e1dfdd] overflow-hidden"
          style={{ width: 196, height: 112 }}
        >
          <img
            src={NEWS_IMG(item.id)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          <div className="flex flex-col items-start w-full">
            {/* Kicker / Org badge */}
            <div
              className="flex items-center overflow-hidden rounded-[2px] shrink-0"
              style={{
                backgroundColor: 'var(--brand-color)',
                padding: '2px 8px',
              }}
            >
              <span className="text-white text-[12px] font-semibold leading-[16px] uppercase">
                {item.org}
              </span>
            </div>
            {/* Title + Desc */}
            <div className="flex flex-col gap-[8px] items-start pt-[3px] w-full overflow-hidden">
              <p
                className="font-semibold text-[16px] leading-[22px] text-[#323130] w-full overflow-hidden"
                style={{ maxHeight: 44 }}
              >
                {item.title}
              </p>
              <p
                className="text-[14px] leading-[20px] text-[#605e5c] w-full overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ height: 20 }}
              >
                {item.desc}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center">
            <span className="text-[12px] font-semibold leading-[16px] text-[#323130] pr-[5px]">
              {item.author}
            </span>
            <span className="text-[12px] font-semibold leading-[16px] text-[#605e5c]">
              {item.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewsSideBySide() {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* Row 1 */}
      <div className="flex gap-[32px] w-full">
        <NewsItem item={newsItems[0]} />
        <NewsItem item={newsItems[1]} />
      </div>
      {/* Row 2 */}
      <div className="flex gap-[32px] w-full">
        <NewsItem item={newsItems[2]} isLast />
        <NewsItem item={newsItems[3]} isLast />
      </div>
    </div>
  )
}
