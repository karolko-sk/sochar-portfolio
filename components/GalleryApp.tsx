'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ArtworkCard } from '@/components/ArtworkCard';
import { ArtworkFolioDrawer } from '@/components/ArtworkFolioDrawer';
import { AcquisitionModal } from '@/components/AcquisitionModal';
import { ExhibitionsSection } from '@/components/ExhibitionsSection';
import { BiographySection } from '@/components/BiographySection';
import { ContactSection } from '@/components/ContactSection';
import { Artwork, Exhibition, ArtistProfile, SiteSettings, FilterCategory } from '@/types';
import { ArrowRight } from 'lucide-react';

interface GalleryAppProps {
  initialArtworks: Artwork[];
  initialExhibitions: Exhibition[];
  artistProfile: ArtistProfile | null;
  siteSettings: SiteSettings | null;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({
  initialArtworks,
  initialExhibitions,
  artistProfile,
  siteSettings,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedArtworkForDetail, setSelectedArtworkForDetail] = useState<Artwork | null>(null);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);
  const [inquiryType, setInquiryType] = useState<'purchase' | 'visit'>('purchase');

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    return {
      all: initialArtworks.length,
      available: initialArtworks.filter((a) => a.status === 'available').length,
      bronze: initialArtworks.filter((a) => a.category === 'bronze').length,
      stone: initialArtworks.filter((a) => a.category === 'stone').length,
      'steel-glass': initialArtworks.filter((a) => a.category === 'steel-glass').length,
      sold: initialArtworks.filter((a) => a.status === 'sold').length,
    };
  }, [initialArtworks]);

  // Filtered artworks
  const filteredArtworks = useMemo(() => {
    return initialArtworks.filter((art) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'available') return art.status === 'available';
      if (activeCategory === 'sold') return art.status === 'sold';
      return art.category === activeCategory;
    });
  }, [initialArtworks, activeCategory]);

  const featuredArtwork = initialArtworks.find((a) => a.featured) || initialArtworks[0];

  const handleOpenDetail = (art: Artwork) => {
    setSelectedArtworkForDetail(art);
  };

  const handleStartInquiry = (art: Artwork, type: 'purchase' | 'visit' = 'purchase') => {
    setInquiryType(type);
    setInquiryArtwork(art);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Header availableCount={categoryCounts.available} />

      {/* Hero Opening */}
      {featuredArtwork && (
        <Hero
          featuredArtwork={featuredArtwork}
          onOpenArtwork={handleOpenDetail}
        />
      )}

      {/* Portfolio Section */}
      <section id="dila" className="py-20 border-b border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#98968F] font-mono">
                Ateliérový katalog
              </span>
              <h2 className="font-serif-sculpture text-3xl sm:text-4xl text-[#121214] mt-1">
                Vybrané plastiky & skulptury
              </h2>
            </div>
            <p className="text-sm text-[#666560] max-w-md font-light">
              Každé dílo je unikátním autorským solitérem. Pro podrobné zkoumání
              struktury materiálu a video rotace otevřete detail plastiky.
            </p>
          </div>

          {/* Hairline Category Bar */}
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />

          {/* Artworks Asymmetric Gallery Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredArtworks.map((art) => (
              <ArtworkCard
                key={art.id}
                artwork={art}
                onOpen={handleOpenDetail}
                onQuickInquire={(item) => handleStartInquiry(item, 'purchase')}
              />
            ))}
          </div>

          {/* Empty state if no items match filter */}
          {filteredArtworks.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <h3 className="font-serif-sculpture text-xl text-[#121214]">
                V této kategorii momentálně není žádné volné dílo
              </h3>
              <p className="text-sm text-[#666560] max-w-sm mx-auto font-light">
                Prohlédněte si archiv realizací nebo kontaktujte autora pro konzultaci
                zakázkové tvorby do konkrétního prostoru.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-6 py-2.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black"
              >
                Zobrazit všechna díla
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Archiv realizací & prestiže (Dedicated Section Anchor) */}
      <section id="archiv" className="py-16 bg-[#F4F2EE] border-b border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 sm:p-10 bg-white border border-[#E5E2DA] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#98968F] font-mono">
                Zastoupení & Sběratelství
              </span>
              <h3 className="font-serif-sculpture text-2xl text-[#121214]">
                Archiv realizovaných a prodaných plastik
              </h3>
              <p className="text-sm text-[#666560] max-w-xl font-light">
                Díla umístěná v soukromých i institucionálních sbírkách v Praze,
                Vídni a Berlíně. Možnost poptávky autorské variace či nového díla na míru.
              </p>
            </div>

            <button
              onClick={() => setActiveCategory('sold')}
              className="px-6 py-3.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Filtrovat archiv realizací ({categoryCounts.sold})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Vernisáže & Výstavy */}
      <ExhibitionsSection exhibitions={initialExhibitions} />

      {/* Biografie & Manifest */}
      <BiographySection profile={artistProfile} />

      {/* Ateliér & Kontakt */}
      <ContactSection settings={siteSettings} />

      {/* Footer (Zero-Smog Architectural Footer) */}
      <footer className="py-12 bg-[#FAF9F6] border-t border-[#E5E2DA] text-xs text-[#666560]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif-sculpture text-lg text-[#121214]">
              {artistProfile?.name || 'VIKTOR MAREK'}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#98968F] mt-0.5">
              Sochařský ateliér & Galerie © {new Date().getFullYear()} · Všechna práva vyhrazena
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#dila" className="hover:text-[#121214] transition-colors">
              Díla
            </a>
            <a href="#archiv" className="hover:text-[#121214] transition-colors">
              Archiv
            </a>
            <a href="#vystavy" className="hover:text-[#121214] transition-colors">
              Výstavy
            </a>
            <a href="#biografie" className="hover:text-[#121214] transition-colors">
              Biografie
            </a>
            <a href="#kontakt" className="hover:text-[#121214] transition-colors">
              Kontakt
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#98968F]">
            <span>Git-backed Keystatic CMS</span>
            <span className="h-3 w-px bg-[#E5E2DA]" />
            <a href="/keystatic" className="hover:text-[#121214] underline underline-offset-2">
              Přihlásit do CMS
            </a>
          </div>
        </div>
      </footer>

      {/* Slide-Over Drawer: Artwork Folio */}
      <ArtworkFolioDrawer
        artwork={selectedArtworkForDetail}
        onClose={() => setSelectedArtworkForDetail(null)}
        onInquire={(art, type) => {
          setSelectedArtworkForDetail(null);
          handleStartInquiry(art, type);
        }}
      />

      {/* Modal: Dual-Track Inquiry */}
      <AcquisitionModal
        artwork={inquiryArtwork}
        initialType={inquiryType}
        onClose={() => setInquiryArtwork(null)}
      />
    </div>
  );
};
