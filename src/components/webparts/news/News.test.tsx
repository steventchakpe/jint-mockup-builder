import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { News } from './News';
import { newsDefaultConfig } from './News.config';
import type { NewsContent } from './News.types';

const mockContent: NewsContent = {
  articles: [
    {
      id: 'a1',
      title: 'Lancement de la nouvelle plateforme RH',
      excerpt: 'La direction RH annonce le déploiement de la nouvelle plateforme de gestion des congés.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      category: 'Ressources Humaines',
      author: {
        profileId: 'profile-001',
        name: 'Claire Dupont',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32',
      },
      publishedAt: '2026-03-20T09:00:00Z',
      readTimeMinutes: 3,
      engagement: { likes: 42, comments: 7, views: 318 },
    },
    {
      id: 'a2',
      title: 'Résultats du 1er trimestre 2026',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      author: {
        profileId: 'profile-002',
        name: 'Marc Lefebvre',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32',
      },
      publishedAt: '2026-03-18T14:00:00Z',
    },
    {
      id: 'a3',
      title: 'Journée portes ouvertes — 15 avril',
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
      author: {
        profileId: 'profile-003',
        name: 'Sophie Martin',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32',
      },
      publishedAt: '2026-03-15T10:00:00Z',
    },
    {
      id: 'a4',
      title: 'Formation cybersécurité obligatoire',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      author: {
        profileId: 'profile-004',
        name: 'Thomas Bernard',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32',
      },
      publishedAt: '2026-03-12T08:00:00Z',
    },
  ],
};

describe('News', () => {
  it('renders without crash with default props', () => {
    render(<News config={newsDefaultConfig} content={mockContent} />);
    expect(screen.getByText('Lancement de la nouvelle plateforme RH')).toBeInTheDocument();
  });

  it('renders a section title when provided', () => {
    render(
      <News config={{ ...newsDefaultConfig, title: 'Actualités' }} content={mockContent} />
    );
    expect(screen.getByText('Actualités')).toBeInTheDocument();
  });

  it('respects maxItems limit', () => {
    render(
      <News config={{ ...newsDefaultConfig, maxItems: 2, layout: 'tiles-verticales' }} content={mockContent} />
    );
    expect(screen.queryByText('Journée portes ouvertes — 15 avril')).not.toBeInTheDocument();
  });

  it('calls onArticleClick when an article is clicked in presentation mode', async () => {
    const user = userEvent.setup();
    const onArticleClick = vi.fn();

    render(
      <News
        config={{ ...newsDefaultConfig, layout: 'tiles-verticales' }}
        content={mockContent}
        isEditMode={false}
        onArticleClick={onArticleClick}
      />
    );

    await user.click(screen.getByText('Lancement de la nouvelle plateforme RH'));
    expect(onArticleClick).toHaveBeenCalledWith('a1');
  });

  it('does not call onArticleClick in edit mode', async () => {
    const user = userEvent.setup();
    const onArticleClick = vi.fn();

    render(
      <News
        config={{ ...newsDefaultConfig, layout: 'tiles-verticales' }}
        content={mockContent}
        isEditMode={true}
        onArticleClick={onArticleClick}
      />
    );

    await user.click(screen.getByText('Lancement de la nouvelle plateforme RH'));
    expect(onArticleClick).not.toHaveBeenCalled();
  });

  it('renders hero layout', () => {
    render(<News config={{ ...newsDefaultConfig, layout: 'hero' }} content={mockContent} />);
    expect(screen.getByText('Lancement de la nouvelle plateforme RH')).toBeInTheDocument();
  });

  it('renders carousel layout', () => {
    render(<News config={{ ...newsDefaultConfig, layout: 'carousel' }} content={mockContent} />);
    expect(screen.getByText('Lancement de la nouvelle plateforme RH')).toBeInTheDocument();
  });

  it('renders with empty articles gracefully', () => {
    render(<News config={newsDefaultConfig} content={{ articles: [] }} />);
    // Should render the container without crashing
  });
});
