import fs from 'node:fs';
import path from 'node:path';
import {
  Artwork,
  ArtworkSchema,
  Exhibition,
  ExhibitionSchema,
  ArtistProfile,
  ArtistProfileSchema,
  SiteSettings,
  SiteSettingsSchema,
} from '@/lib/schemas';
import {
  SEED_ARTWORKS,
  SEED_EXHIBITIONS,
  SEED_ARTIST_PROFILE,
  SEED_SITE_SETTINGS,
} from '@/lib/seed-data';

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const artworksDir = path.join(process.cwd(), 'content', 'artworks');
    if (fs.existsSync(artworksDir)) {
      const files = fs.readdirSync(artworksDir).filter((f) => f.endsWith('.json'));
      if (files.length > 0) {
        const list: Artwork[] = [];
        for (const file of files) {
          const raw = fs.readFileSync(path.join(artworksDir, file), 'utf-8');
          const json = JSON.parse(raw);
          const parsed = ArtworkSchema.parse(json);
          list.push(parsed);
        }
        list.sort((a, b) => {
          if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
          return b.year - a.year;
        });
        if (list.length > 0) {
          return list;
        }
      }
    }
  } catch (error) {
    console.warn('Filesystem read failed, using seed artworks fallback:', error);
  }

  return SEED_ARTWORKS;
}

export async function getExhibitions(): Promise<Exhibition[]> {
  try {
    const exhibitionsDir = path.join(process.cwd(), 'content', 'exhibitions');
    if (fs.existsSync(exhibitionsDir)) {
      const files = fs.readdirSync(exhibitionsDir).filter((f) => f.endsWith('.json'));
      if (files.length > 0) {
        const list: Exhibition[] = [];
        for (const file of files) {
          const raw = fs.readFileSync(path.join(exhibitionsDir, file), 'utf-8');
          const json = JSON.parse(raw);
          const parsed = ExhibitionSchema.parse(json);
          list.push(parsed);
        }
        list.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
        if (list.length > 0) {
          return list;
        }
      }
    }
  } catch (error) {
    console.warn('Filesystem read failed, using seed exhibitions fallback:', error);
  }

  return SEED_EXHIBITIONS;
}

export async function getArtistProfile(): Promise<ArtistProfile | null> {
  try {
    const profilePath = path.join(process.cwd(), 'content', 'settings', 'artist-profile.json');
    if (fs.existsSync(profilePath)) {
      const raw = fs.readFileSync(profilePath, 'utf-8');
      return ArtistProfileSchema.parse(JSON.parse(raw));
    }
  } catch (error) {
    console.warn('Filesystem read failed, using seed profile fallback:', error);
  }

  return SEED_ARTIST_PROFILE;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settingsPath = path.join(process.cwd(), 'content', 'settings', 'site-settings.json');
    if (fs.existsSync(settingsPath)) {
      const raw = fs.readFileSync(settingsPath, 'utf-8');
      return SiteSettingsSchema.parse(JSON.parse(raw));
    }
  } catch (error) {
    console.warn('Filesystem read failed, using seed settings fallback:', error);
  }

  return SEED_SITE_SETTINGS;
}
