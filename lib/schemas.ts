import { z } from 'zod';

export const ArtworkStatusSchema = z.enum([
  'available',
  'reserved',
  'sold',
  'not_for_sale',
]);
export type ArtworkStatus = z.infer<typeof ArtworkStatusSchema>;

export const PriceModeSchema = z.enum(['fixed', 'on_request', 'hidden']);
export type PriceMode = z.infer<typeof PriceModeSchema>;

export const MaterialCategorySchema = z.enum(['bronze', 'stone', 'steel-glass']);
export type MaterialCategory = z.infer<typeof MaterialCategorySchema>;

export const DimensionsSchema = z.object({
  height: z.number().positive(),
  width: z.number().positive(),
  depth: z.number().positive(),
  weight: z.number().positive().optional(),
});

export const GalleryImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().min(1),
  label: z.string().min(1),
});

export const ArtworkSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional().default(''),
  year: z.number().int().min(1900).max(2100),
  category: MaterialCategorySchema,
  material: z.string().min(1),
  dimensions: DimensionsSchema,
  description: z.string().min(1),
  curatorNote: z.string().optional().default(''),
  status: ArtworkStatusSchema,
  priceMode: PriceModeSchema.default('fixed'),
  price: z.string().optional(),
  provenance: z.string().optional(),
  heroImage: z.string().min(1),
  galleryImages: z.array(GalleryImageSchema).default([]),
  videoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

export const ExhibitionTypeSchema = z.enum(['solo', 'group']);

export const ExhibitionSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  type: ExhibitionTypeSchema,
  venue: z.string().min(1),
  city: z.string().min(1),
  startDate: z.string().min(1), // YYYY-MM-DD
  endDate: z.string().min(1),   // YYYY-MM-DD
  datesFormatted: z.string().min(1),
  curator: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().optional(),
  mapUrl: z.string().optional(),
  externalEventUrl: z.string().optional(),
});

export type Exhibition = z.infer<typeof ExhibitionSchema>;

export const ArtistProfileSchema = z.object({
  name: z.string().min(1),
  birthYear: z.number().int().min(1900),
  manifestoHeading: z.string().min(1),
  manifestoText: z.array(z.string().min(1)),
  manifestoQuote: z.string().min(1),
  portraitImage: z.string().min(1),
  catalogPdfUrl: z.string().optional(),
  education: z.array(
    z.object({
      period: z.string().min(1),
      title: z.string().min(1),
    })
  ),
  collections: z.array(
    z.object({
      title: z.string().min(1),
    })
  ),
  awards: z.array(
    z.object({
      year: z.number().int(),
      title: z.string().min(1),
    })
  ),
});

export type ArtistProfile = z.infer<typeof ArtistProfileSchema>;

export const SiteSettingsSchema = z.object({
  siteTitle: z.string().min(1),
  tagline: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  studioAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
  }),
  socialLinks: z.object({
    instagram: z.string().optional(),
  }),
  inquiryNotice: z.string().min(1),
  companyId: z.string().optional(),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
