export type ArtworkStatus = 'available' | 'reserved' | 'sold';

export type MaterialCategory = 'all' | 'available' | 'bronze' | 'stone' | 'steel-glass' | 'sold';

export interface ArtworkImage {
  url: string;
  alt: string;
  label: string; // e.g. "Celkový pohled", "Detail patiny", "Pohled z profilu"
}

export interface Artwork {
  id: string;
  code: string; // e.g. "VM-01"
  title: string;
  subtitle: string;
  material: string;
  category: 'bronze' | 'stone' | 'steel-glass';
  year: number;
  dimensions: {
    height: number; // in cm
    width: number;
    depth: number;
    weight: number; // in kg
  };
  status: ArtworkStatus;
  price?: string; // e.g. "280 000 Kč" or "Cena na dotaz"
  provenance?: string; // e.g. "Soukromá sbírka Praha"
  description: string;
  curatorNote: string;
  primaryImage: string;
  images: ArtworkImage[];
  videoUrl?: string; // Ambient MP4/WebM video or video loop preview
  scaleProfile: 'human-tall' | 'human-medium' | 'pedestal';
}

export interface Exhibition {
  id: string;
  title: string;
  type: 'solo' | 'group';
  status: 'upcoming' | 'past';
  venue: string;
  city: string;
  dates: string;
  curator: string;
  description: string;
  catalogDownloadUrl?: string;
  mapUrl?: string;
  googleCalendarUrl?: string;
}

export interface InquiryFormData {
  artworkId: string;
  artworkTitle: string;
  inquiryType: 'purchase' | 'visit';
  name: string;
  email: string;
  phone: string;
  message: string;
}
