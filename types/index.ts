export type {
  Artwork,
  ArtworkStatus,
  MaterialCategory,
  Exhibition,
  ArtistProfile,
  SiteSettings,
} from '@/lib/schemas';

export type FilterCategory = 'all' | 'available' | 'bronze' | 'stone' | 'steel-glass' | 'sold';

export interface InquiryFormData {
  artworkId: string;
  artworkTitle: string;
  inquiryType: 'purchase' | 'visit';
  name: string;
  email: string;
  phone: string;
  message: string;
}
