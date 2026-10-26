import type { Metadata } from 'next';
import { getArtworks, getExhibitions, getArtistProfile, getSiteSettings } from '@/lib/content';
import { GalleryApp } from '@/components/GalleryApp';

export const revalidate = 60; // Incremental Static Regeneration every 60s

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([getArtistProfile(), getSiteSettings()]);
  const title = profile?.name
    ? `${profile.name} · Sochařský ateliér & Galerie Praha`
    : 'MgA. Viktor Marek · Sochařský ateliér';
  const description =
    settings?.tagline ||
    profile?.manifestoQuote ||
    'Oficiální portfolio sochařského ateliéru MgA. Viktora Marka';

  return {
    title,
    description,
  };
}

export default async function HomePage() {
  const [artworks, exhibitions, artistProfile, siteSettings] = await Promise.all([
    getArtworks(),
    getExhibitions(),
    getArtistProfile(),
    getSiteSettings(),
  ]);

  return (
    <GalleryApp
      initialArtworks={artworks}
      initialExhibitions={exhibitions}
      artistProfile={artistProfile}
      siteSettings={siteSettings}
    />
  );
}
