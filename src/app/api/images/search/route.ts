import { NextRequest, NextResponse } from 'next/server';

// Proxy de recherche Unsplash (côté serveur — la clé ne transite jamais au client).
// Nécessite UNSPLASH_ACCESS_KEY dans .env.local ; sinon renvoie une erreur claire
// (l'UI propose alors URL directe ou upload en fallback).
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.trim();
  if (!query) return NextResponse.json({ error: 'Paramètre q manquant' }, { status: 400 });

  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Recherche Unsplash non configurée (UNSPLASH_ACCESS_KEY manquante)' },
      { status: 503 },
    );
  }

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '12');
  url.searchParams.set('orientation', 'squarish');

  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
  if (!res.ok) {
    return NextResponse.json({ error: `Unsplash a répondu ${res.status}` }, { status: 502 });
  }

  const data = (await res.json()) as {
    results: Array<{
      urls: { small: string; thumb: string };
      alt_description: string | null;
      user: { name: string };
    }>;
  };

  // Format aligné sur ImageResult (src/types/providers.ts)
  return NextResponse.json({
    results: data.results.map((r) => ({
      url: r.urls.small,
      thumbnailUrl: r.urls.thumb,
      alt: r.alt_description ?? query,
      credit: r.user.name,
    })),
  });
}
