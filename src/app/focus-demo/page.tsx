import { Focus, focusDefaultConfig } from '@/components/webparts/focus';
import type { FocusContent } from '@/components/webparts/focus';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

/**
 * Contenu reproduisant le Focus PAR DÉFAUT de jintan :
 * background image plein cadre, contentPosition "fill", pas d'image latérale,
 * tag + titre + description + bouton, le tout en overlay à gauche.
 */
const demoContent: FocusContent = {
  card: {
    position: 'fill',
    tag: { value: 'Thème', alignment: 'left' },
    title: { value: 'Ajoutez un titre à votre annonce', alignment: 'left' },
    description: {
      value: 'Ajoutez des informations clés, une ressource importante ou une action à entreprendre.',
      alignment: 'left',
    },
  },
  redirection: {
    linkUrl: '#',
    buttonProps: {
      value: 'Découvrir',
      alignment: 'left',
      type: 'primary',
      position: 'below',
      visible: true,
    },
  },
};

export default function FocusDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />

      <div className="flex flex-1">
        <SiteBar />

        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />

          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg">
              {/* focusDefaultConfig = défauts jintan : 208px, radius 12, shadow Strong, bg image */}
              <Focus config={focusDefaultConfig} content={demoContent} />
            </div>
          </main>

          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
