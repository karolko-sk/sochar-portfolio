import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sochar-portfolio.vercel.app'),
  title: 'Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
  description:
    'Monumentální a komorní moderní sochařství v patinovaném bronzu a mramoru. Autorský ateliér Praha – Holešovice.',
  openGraph: {
    title: 'Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
    description:
      'Výstava sochařských děl z ateliéru MgA. Viktora Marka. Autorské bronzové a kamenné plastiky pro privátní i architektonické sbírky.',
    url: 'https://sochar-portfolio.vercel.app',
    siteName: 'Viktor Marek · Sochařský ateliér',
    type: 'website',
    locale: 'cs_CZ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Viktor Marek · Sochařský ateliér & Galerie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
    description:
      'Výstava sochařských děl z ateliéru MgA. Viktora Marka. Autorské bronzové a kamenné plastiky pro privátní i architektonické sbírky.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#FAF9F6] text-[#121214]">
        {children}
      </body>
    </html>
  );
}
