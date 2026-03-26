'use client';

import { useState } from 'react';
import type { NewsArticle, NewsFormat, NewsRadius } from '../News.types';

interface NewsCarouselProps {
  articles: NewsArticle[];
  format: NewsFormat;
  radius: NewsRadius;
  onArticleClick?: (id: string) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

/**
 * Carousel hero — image fond plein format, contenu overlaid en bas.
 * Fidèle au variant Figma "Layout=Carousel, Format=Responsive".
 * Animation : chaque slide est positionnée en absolu avec translateX((i - current) * 100%).
 * Le changement de `current` déclenche la transition CSS sur toutes les slides simultanément.
 */
export function NewsCarousel({ articles, onArticleClick }: NewsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = articles.length;
  if (count === 0) return null;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + count) % count);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % count);
  };

  return (
    <div className="p-md">
      {/* Conteneur principal — overflow hidden pour masquer les slides hors-champ */}
      <div className="relative w-full h-[390px] overflow-hidden">

        {/* Slides — toutes dans le DOM, positionnées en absolu */}
        {articles.map((art, i) => (
          <div
            key={art.id}
            className="absolute inset-0 flex flex-col justify-end gap-sm cursor-pointer"
            style={{
              backgroundImage: `url(${art.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '36px 47px',
              transform: `translateX(${(i - current) * 100}%)`,
              transition: 'transform 380ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
            onClick={() => i === current ? onArticleClick?.(art.id) : undefined}
          >
            {/* Content */}
            <div className="flex flex-col gap-[48px]">
              <div className="flex flex-col gap-lg">

                {/* Title bar — blanc/40%, FILL largeur, HUG hauteur */}
                <div className="flex w-full bg-white/40 p-sm">
                  <h2 className="text-heading-lg font-normal text-white">
                    {art.title}
                  </h2>
                </div>

                {/* Informations — auteur + stats */}
                <div className="flex items-center justify-between">


                  {/* Gauche : avatar + role + dot + date */}
                  <div className="flex items-center gap-xs">
                    <div className="flex items-center gap-sm-nudge">
                      {/* Avatar initiales */}
                      <div className="w-5 h-5 rounded-full border-2 border-sp-primary bg-sp-darker flex items-center justify-center shrink-0">
                        <span className="text-white font-medium leading-none" style={{ fontSize: '6px' }}>
                          {getInitials(art.author.name)}
                        </span>
                      </div>
                      {/* Role pill */}
                      <div className="h-4 flex items-center px-2xs bg-[#8a8886]">
                        <span className="text-white font-medium" style={{ fontSize: '12px' }}>
                          {art.author.name}
                        </span>
                      </div>
                    </div>

                    {/* Dot séparateur */}
                    <svg width="7" height="7" viewBox="0 0 7 7" className="shrink-0">
                      <circle cx="3.5" cy="3.5" r="3" fill="white" />
                    </svg>

                    {/* Date + heure pill */}
                    <div className="h-4 flex items-center px-2xs bg-[#8a8886]">
                      <span className="text-caption text-white font-semibold">
                        {formatDateTime(art.publishedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Droite : vues + likes */}
                  {art.engagement && (
                    <div className="flex items-center gap-lg">
                      {/* Vues */}
                      <div className="h-4 flex items-center gap-[5px] px-sm bg-[#8a8886]">
                        <span className="text-caption text-white font-semibold">
                          {art.engagement.views}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.205078 8.32617C0.205078 8.29883 0.209635 8.26237 0.21875 8.2168C0.360026 7.68815 0.545736 7.18229 0.775879 6.69922C1.00602 6.21615 1.27832 5.76725 1.59277 5.35254C1.90723 4.93783 2.25928 4.56299 2.64893 4.22803C3.03857 3.89307 3.46126 3.60596 3.91699 3.3667C4.37272 3.12744 4.85921 2.94401 5.37646 2.81641C5.89372 2.6888 6.4349 2.625 7 2.625C7.65625 2.625 8.28857 2.71842 8.89697 2.90527C9.50537 3.09212 10.0739 3.35417 10.6025 3.69141C11.1312 4.02865 11.612 4.43311 12.0449 4.90479C12.4779 5.37646 12.8447 5.89941 13.1455 6.47363C13.1911 6.56022 13.2503 6.68783 13.3232 6.85645C13.3962 7.02506 13.4679 7.2028 13.5386 7.38965C13.6092 7.5765 13.6696 7.75537 13.7197 7.92627C13.7699 8.09717 13.7949 8.22591 13.7949 8.3125C13.7949 8.43099 13.7516 8.53353 13.665 8.62012C13.5785 8.70671 13.4759 8.75 13.3574 8.75C13.2389 8.75 13.1501 8.71924 13.0908 8.65771C13.0316 8.59619 12.9792 8.5153 12.9336 8.41504C12.8835 8.31022 12.847 8.20085 12.8242 8.08691C12.8014 7.97298 12.7718 7.86133 12.7354 7.75195C12.6305 7.41927 12.4881 7.09115 12.3081 6.76758C12.1281 6.44401 11.9287 6.14551 11.71 5.87207C11.4183 5.49837 11.0947 5.16455 10.7393 4.87061C10.3838 4.57666 10.0033 4.32829 9.59766 4.12549C9.19206 3.92269 8.76595 3.76774 8.31934 3.66064C7.87272 3.55355 7.41016 3.5 6.93164 3.5C6.36654 3.5 5.82194 3.58431 5.29785 3.75293C4.77376 3.92155 4.28385 4.15511 3.82812 4.45361C3.3724 4.75212 2.95768 5.10758 2.58398 5.52002C2.21029 5.93245 1.89355 6.38249 1.63379 6.87012C1.60189 6.92936 1.55859 7.01823 1.50391 7.13672C1.44922 7.25521 1.39453 7.38053 1.33984 7.5127C1.28516 7.64486 1.23844 7.77018 1.19971 7.88867C1.16097 8.00716 1.1416 8.09603 1.1416 8.15527C1.1416 8.22363 1.12907 8.29313 1.104 8.36377C1.07894 8.43441 1.04476 8.49821 1.00146 8.55518C0.958171 8.61214 0.905762 8.65999 0.844238 8.69873C0.782715 8.73747 0.715495 8.75684 0.642578 8.75684C0.524089 8.75684 0.421549 8.71582 0.334961 8.63379C0.248372 8.55176 0.205078 8.44922 0.205078 8.32617ZM3.9375 8.25781C3.9375 7.84766 4.02067 7.46029 4.18701 7.0957C4.35335 6.73112 4.57666 6.41211 4.85693 6.13867C5.13721 5.86523 5.46191 5.64876 5.83105 5.48926C6.2002 5.32975 6.58984 5.25 7 5.25C7.41927 5.25 7.81462 5.33089 8.18604 5.49268C8.55745 5.65446 8.88216 5.87435 9.16016 6.15234C9.43815 6.43034 9.65804 6.75505 9.81982 7.12646C9.98161 7.49788 10.0625 7.89323 10.0625 8.3125C10.0625 8.73177 9.98161 9.12712 9.81982 9.49854C9.65804 9.86995 9.43815 10.1947 9.16016 10.4727C8.88216 10.7507 8.55745 10.9705 8.18604 11.1323C7.81462 11.2941 7.41927 11.375 7 11.375C6.56706 11.375 6.16374 11.293 5.79004 11.1289C5.41634 10.9648 5.09277 10.7415 4.81934 10.459C4.5459 10.1764 4.33057 9.84603 4.17334 9.46777C4.01611 9.08952 3.9375 8.6862 3.9375 8.25781ZM9.1875 8.26465C9.1875 7.96842 9.12825 7.69043 9.00977 7.43066C8.89128 7.1709 8.73177 6.94417 8.53125 6.75049C8.33073 6.5568 8.09831 6.40413 7.83398 6.29248C7.56966 6.18083 7.29167 6.125 7 6.125C6.69466 6.125 6.40983 6.18197 6.14551 6.2959C5.88119 6.40983 5.6499 6.56592 5.45166 6.76416C5.25342 6.9624 5.09733 7.19369 4.9834 7.45801C4.86947 7.72233 4.8125 8.00716 4.8125 8.3125C4.8125 8.61784 4.86947 8.90267 4.9834 9.16699C5.09733 9.43132 5.25342 9.6626 5.45166 9.86084C5.6499 10.0591 5.88119 10.2152 6.14551 10.3291C6.40983 10.443 6.69466 10.5 7 10.5C7.31445 10.5 7.60498 10.4419 7.87158 10.3257C8.13818 10.2095 8.36833 10.05 8.56201 9.84717C8.7557 9.64437 8.90837 9.40739 9.02002 9.13623C9.13167 8.86507 9.1875 8.57454 9.1875 8.26465Z" fill="white"/>
                        </svg>
                      </div>
                      {/* Likes */}
                      <div className="h-4 flex items-center gap-[5px] px-sm bg-[#8a8886]">
                        <span className="text-caption text-white font-semibold">
                          {art.engagement.likes}
                        </span>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip-like)">
                            <path d="M8.53478 1.9237C8.74478 1.4037 9.32978 0.8437 10.0808 1.0527C10.6708 1.2167 11.0538 1.5727 11.2738 2.0487C11.4778 2.4917 11.5278 3.0137 11.5378 3.5107C11.5478 4.0457 11.4358 4.6867 11.3048 5.2487C11.2463 5.49704 11.1813 5.74379 11.1098 5.9887H12.4948C12.8055 5.98872 13.112 6.06115 13.3899 6.20024C13.6677 6.33933 13.9094 6.54125 14.0956 6.79C14.2819 7.03875 14.4076 7.32747 14.4628 7.63327C14.518 7.93906 14.5013 8.25352 14.4138 8.5517L13.0498 13.1977C12.9562 13.5165 12.8 13.8135 12.5903 14.0712C12.3806 14.329 12.1217 14.5424 11.8286 14.6989C11.5355 14.8554 11.2141 14.9519 10.8833 14.9828C10.5525 15.0137 10.2188 14.9783 9.90178 14.8787L4.54578 13.1967C4.25603 13.1057 3.9908 12.9499 3.77024 12.7411C3.54967 12.5323 3.37955 12.276 3.27278 11.9917L2.75278 10.6077C2.58729 10.1672 2.5824 9.68252 2.73896 9.23881C2.89552 8.79509 3.20352 8.42078 3.60878 8.1817L5.48078 7.0777C5.66942 6.9285 5.84444 6.76285 6.00378 6.5827C6.34778 6.1937 6.82078 5.5467 7.29578 4.5377C7.50078 4.1017 7.67278 3.7587 7.82878 3.4477C8.08178 2.9447 8.29378 2.5237 8.53478 1.9237ZM6.01878 7.9207C6.01318 7.92414 6.00751 7.92747 6.00178 7.9307L4.11678 9.0427C3.91415 9.16224 3.76015 9.34939 3.68187 9.57125C3.60359 9.79311 3.60604 10.0355 3.68878 10.2557L4.20878 11.6397C4.26215 11.782 4.34726 11.9103 4.45764 12.0148C4.56802 12.1193 4.70076 12.1972 4.84578 12.2427L10.2008 13.9247C10.391 13.9846 10.5913 14.006 10.7899 13.9876C10.9885 13.9692 11.1815 13.9114 11.3574 13.8176C11.5334 13.7237 11.6889 13.5957 11.8149 13.441C11.9408 13.2863 12.0346 13.1081 12.0908 12.9167L13.4538 8.2707C13.4976 8.12154 13.5061 7.96421 13.4785 7.81121C13.4509 7.65821 13.388 7.51375 13.2948 7.3893C13.2016 7.26485 13.0807 7.16385 12.9417 7.09431C12.8026 7.02477 12.6493 6.98861 12.4938 6.9887H10.4258C10.3458 6.98865 10.267 6.96941 10.1959 6.9326C10.1249 6.89578 10.0638 6.84246 10.0176 6.77711C9.97149 6.71177 9.9417 6.6363 9.93076 6.55706C9.91983 6.47781 9.92806 6.3971 9.95478 6.3217C10.0548 6.0397 10.2068 5.5507 10.3308 5.0197C10.4568 4.4817 10.5458 3.9377 10.5378 3.5297C10.5278 3.0617 10.4788 2.7137 10.3648 2.4677C10.2668 2.2527 10.1138 2.0997 9.81278 2.0157C9.76978 2.0037 9.71878 2.0077 9.65278 2.0507C9.56662 2.11222 9.50053 2.19779 9.46278 2.2967C9.23243 2.85812 8.97718 3.409 8.69778 3.9477C8.54278 4.2567 8.37978 4.5817 8.20078 4.9627C7.68678 6.0567 7.16078 6.7847 6.75078 7.2457C6.54678 7.4757 6.37278 7.6387 6.24478 7.7477C6.17977 7.80296 6.11237 7.85534 6.04278 7.9047L6.02678 7.9147L6.02178 7.9187L6.01878 7.9207Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip-like">
                              <rect width="17" height="16" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Spacer invisible — réserve l'espace des controls (h-9=36px + gap-sm=8px)
                pour que le contenu reste au même niveau vertical qu'avant l'animation */}
            <div className="h-9 shrink-0 pointer-events-none" aria-hidden="true" />
          </div>
        ))}

        {/* Controls — overlay absolu en bas, z-index au-dessus des slides */}
        <div
          className="absolute bottom-[36px] left-[47px] right-[47px] flex items-center justify-between z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Précédent */}
          <button
            onClick={prev}
            className="w-12 h-9 flex items-center justify-center bg-[#f3f2f1] shrink-0"
            aria-label="Article précédent"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M6 1L1 6l5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Pagination dots */}
          <div className="flex items-center gap-xs">
            {articles.map((_, i) => {
              const dist = Math.abs(i - current);
              if (dist === 0) return <div key={i} className="w-2 h-2 rounded-full bg-sp-primary" />;
              if (dist === 1) return <div key={i} className="w-[5px] h-[5px] rounded-full bg-white/50" />;
              return <div key={i} className="w-[3px] h-[3px] rounded-full bg-white/50" />;
            })}
          </div>

          {/* Suivant */}
          <button
            onClick={next}
            className="w-12 h-9 flex items-center justify-center bg-[#f3f2f1] shrink-0"
            aria-label="Article suivant"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1l5 5-5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
