import fs from 'node:fs/promises';
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

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const artworksDir = path.join(process.cwd(), 'content', 'artworks');
    if (await pathExists(artworksDir)) {
      const dirEntries = await fs.readdir(artworksDir);
      const files = dirEntries.filter((f) => f.endsWith('.json'));
      if (files.length > 0) {
        // Asynchronously batch file reads outside the loop
        const records = await Promise.all(
          files.map(async (file) => {
            const raw = await fs.readFile(path.join(artworksDir, file), 'utf-8');
            return JSON.parse(raw);
          })
        );
        const list: Artwork[] = records.map((json) => ArtworkSchema.parse(json));
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
    if (await pathExists(exhibitionsDir)) {
      const dirEntries = await fs.readdir(exhibitionsDir);
      const files = dirEntries.filter((f) => f.endsWith('.json'));
      if (files.length > 0) {
        // Asynchronously batch file reads outside the loop
        const records = await Promise.all(
          files.map(async (file) => {
            const raw = await fs.readFile(path.join(exhibitionsDir, file), 'utf-8');
            return JSON.parse(raw);
          })
        );
        const list: Exhibition[] = records.map((json) => ExhibitionSchema.parse(json));
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
    if (await pathExists(profilePath)) {
      const raw = await fs.readFile(profilePath, 'utf-8');
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
    if (await pathExists(settingsPath)) {
      const raw = await fs.readFile(settingsPath, 'utf-8');
      return SiteSettingsSchema.parse(JSON.parse(raw));
    }
  } catch (error) {
    console.warn('Filesystem read failed, using seed settings fallback:', error);
  }

  return SEED_SITE_SETTINGS;
}
