import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sochar-portfolio.vercel.app'),
  title: 'MgA. Viktor Marek · Sochařský ateliér & Galerie moderního sochařství Praha',
  description:
    'Oficiální prezentace tvorby českého sochaře MgA. Viktora Marka. Autorské monumentální i komorní plastiky z patinovaného bronzu, cortenové oceli a kararského mramoru. Ateliér a výstavní prostor Praha 7 – Holešovice.',
  keywords: [
    'Viktor Marek',
    'sochař Viktor Marek',
    'MgA. Viktor Marek',
    'moderní sochařství',
    'český sochař',
    'bronzová plastika',
    'sochy Praha',
    'mramorová skulptura',
    'corten plastika',
    'autorské sochy do interiéru',
    'zahradní sochy z bronzu',
    'akvizice umění',
    'galerie moderního umění',
  ],
  authors: [{ name: 'MgA. Viktor Marek', url: 'https://sochar-portfolio.vercel.app' }],
  creator: 'MgA. Viktor Marek',
  publisher: 'MgA. Viktor Marek',
  alternates: {
    canonical: 'https://sochar-portfolio.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'MgA. Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
    description:
      'Výstava sochařských děl z ateliéru MgA. Viktora Marka. Autorské bronzové a kamenné plastiky pro privátní i architektonické sbírky.',
    url: 'https://sochar-portfolio.vercel.app',
    siteName: 'MgA. Viktor Marek · Sochařský ateliér',
    type: 'website',
    locale: 'cs_CZ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MgA. Viktor Marek · Sochařský ateliér & Galerie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MgA. Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
    description:
      'Výstava sochařských děl z ateliéru MgA. Viktora Marka. Autorské bronzové a kamenné plastiky pro privátní i architektonické sbírky.',
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VisualArtist',
      '@id': 'https://sochar-portfolio.vercel.app/#artist',
      name: 'MgA. Viktor Marek',
      alternateName: ['Viktor Marek', 'sochař Viktor Marek'],
      jobTitle: 'Akademický sochař',
      description:
        'Český moderní sochař tvořící monumentální i komorní skulptury z patinovaného bronzu, cortenové oceli a mramoru.',
      url: 'https://sochar-portfolio.vercel.app',
      image: 'https://sochar-portfolio.vercel.app/images/artist-portrait.jpg',
      sameAs: ['https://instagram.com/viktor.marek.sculptor'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dělnická 43',
        addressLocality: 'Praha 7 - Holešovice',
        postalCode: '170 00',
        addressCountry: 'CZ',
      },
      email: 'atelier@viktormarek.cz',
      telephone: '+420 777 890 123',
      knowsAbout: [
        'Moderní sochařství',
        'Bronzová plastika',
        'Odlévání do ztraceného vosku',
        'Cortenová ocel',
        'Mramorová skulptura',
      ],
    },
    {
      '@type': 'ArtGallery',
      '@id': 'https://sochar-portfolio.vercel.app/#gallery',
      name: 'Ateliér & Galerie Viktor Marek',
      url: 'https://sochar-portfolio.vercel.app',
      image: 'https://sochar-portfolio.vercel.app/og-image.jpg',
      telephone: '+420 777 890 123',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dělnická 43',
        addressLocality: 'Praha 7 - Holešovice',
        postalCode: '170 00',
        addressCountry: 'CZ',
      },
      priceRange: '$$$$',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sochar-portfolio.vercel.app/#website',
      url: 'https://sochar-portfolio.vercel.app',
      name: 'MgA. Viktor Marek · Sochařský ateliér',
      inLanguage: 'cs-CZ',
      description: 'Oficiální online portfolio a galerie autorských plastik MgA. Viktora Marka.',
      publisher: {
        '@id': 'https://sochar-portfolio.vercel.app/#artist',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body className="antialiased min-h-screen bg-[#FAF9F6] text-[#121214]">{children}</body>
    </html>
  );
}
