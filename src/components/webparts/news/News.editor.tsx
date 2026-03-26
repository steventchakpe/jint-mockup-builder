import type { NewsProps } from './News.types';

interface NewsEditorProps {
  webpartId: string;
  config: NewsProps['config'];
  content: NewsProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: NewsProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart News (mode Édition uniquement).
 * Affiché par-dessus le rendu normal pour permettre la modification directe.
 * La sidebar de configuration gère les props visuelles (layout, format, radius).
 * Cet overlay gère l'édition du contenu (titres, images, auteurs).
 */
export function NewsEditor({ webpartId, config: _config, content, onContentChange }: NewsEditorProps) {
  const updateArticle = (index: number, field: string, value: unknown) => {
    const updated = content.articles.map((a, i) =>
      i === index ? { ...a, [field]: value } : a
    );
    onContentChange({ ...content, articles: updated });
  };

  return (
    <div className="absolute inset-0 z-10">
      {content.articles.map((article, index) => (
        <div
          key={article.id}
          className="group absolute"
          // Positionnement géré par le parent selon le layout actif
          data-article-index={index}
          data-webpart-id={webpartId}
        >
          {/* Titre éditable */}
          <div
            contentEditable
            suppressContentEditableWarning
            className="outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text"
            onBlur={(e) => updateArticle(index, 'title', e.currentTarget.textContent ?? '')}
          >
            {article.title}
          </div>
        </div>
      ))}
    </div>
  );
}
