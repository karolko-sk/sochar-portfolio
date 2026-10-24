import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
  description:
    'Monumentální a komorní moderní sochařství v patinovaném bronzu, mramoru a cortenové oceli. Autorský ateliér Praha – Holešovice.',
  openGraph: {
    title: 'Viktor Marek · Sochařský ateliér & Galerie moderního sochařství',
    description:
      'Výstava sochařských děl z ateliéru MgA. Viktora Marka. Autorské bronzové a kamenné plastiky pro privátní i architektonické sbírky.',
    type: 'website',
    locale: 'cs_CZ',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Sochařský ateliér Viktor Marek',
      },
    ],
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
