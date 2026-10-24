import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
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

// Create reader instance pointing to project root
export const reader = createReader(process.cwd(), keystaticConfig);

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const rawArtworks = await reader.collections.artworks.all();
    const validated = rawArtworks.map((item) => {
      const entry = {
        ...item.entry,
        slug: item.slug,
        id: item.entry.id || item.slug,
      };
      return ArtworkSchema.parse(entry);
    });

    // Sort by sortOrder ascending, then by year descending
    return validated.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return b.year - a.year;
    });
  } catch (error) {
    console.error('Error reading artworks via Keystatic reader:', error);
    return [];
  }
}

export async function getExhibitions(): Promise<Exhibition[]> {
  try {
    const rawExhibitions = await reader.collections.exhibitions.all();
    const validated = rawExhibitions.map((item) => {
      const entry = {
        ...item.entry,
        slug: item.slug,
        id: item.entry.id || item.slug,
      };
      return ExhibitionSchema.parse(entry);
    });

    // Sort by startDate descending
    return validated.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
  } catch (error) {
    console.error('Error reading exhibitions via Keystatic reader:', error);
    return [];
  }
}

export async function getArtistProfile(): Promise<ArtistProfile | null> {
  try {
    const raw = await reader.singletons.artistProfile.read();
    if (!raw) return null;
    return ArtistProfileSchema.parse(raw);
  } catch (error) {
    console.error('Error reading artist profile via Keystatic reader:', error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const raw = await reader.singletons.siteSettings.read();
    if (!raw) return null;
    return SiteSettingsSchema.parse(raw);
  } catch (error) {
    console.error('Error reading site settings via Keystatic reader:', error);
    return null;
  }
}
