import { getArtworks, getExhibitions, getArtistProfile, getSiteSettings } from '@/lib/content';
import { GalleryApp } from '@/components/GalleryApp';

export const revalidate = 0; // Fresh content on each request / build

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
