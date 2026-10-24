'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ArtworkCard } from '@/components/ArtworkCard';
import { ArtworkFolioDrawer } from '@/components/ArtworkFolioDrawer';
import { AcquisitionModal } from '@/components/AcquisitionModal';
import { ExhibitionsSection } from '@/components/ExhibitionsSection';
import { BiographySection } from '@/components/BiographySection';
import { ContactSection } from '@/components/ContactSection';
import { AdminStudioDrawer } from '@/components/AdminStudioDrawer';
import { INITIAL_ARTWORKS } from '@/data/artworks';
import { EXHIBITIONS } from '@/data/exhibitions';
import { Artwork, ArtworkStatus, MaterialCategory } from '@/types';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [activeCategory, setActiveCategory] = useState<MaterialCategory>('all');
  const [selectedArtworkForDetail, setSelectedArtworkForDetail] = useState<Artwork | null>(null);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);
  const [inquiryType, setInquiryType] = useState<'purchase' | 'visit'>('purchase');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load any previously saved state in localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sochar_artworks_mvp');
      if (saved) {
        setArtworks(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateArtworkStatus = (
    id: string,
    status: ArtworkStatus,
    price?: string,
    provenance?: string
  ) => {
    setArtworks((prev) => {
      const updated = prev.map((art) => {
        if (art.id === id) {
          return {
            ...art,
            status,
            price: price !== undefined && price !== '' ? price : art.price,
            provenance: provenance !== undefined && provenance !== '' ? provenance : art.provenance,
          };
        }
        return art;
      });
      try {
        localStorage.setItem('sochar_artworks_mvp', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Also update selected artwork if open
    setSelectedArtworkForDetail((current) => {
      if (current && current.id === id) {
        return {
          ...current,
          status,
          price: price !== undefined && price !== '' ? price : current.price,
          provenance: provenance !== undefined && provenance !== '' ? provenance : current.provenance,
        };
      }
      return current;
    });
  };

  const handleResetArtworks = () => {
    setArtworks(INITIAL_ARTWORKS);
    try {
      localStorage.removeItem('sochar_artworks_mvp');
    } catch {
      // ignore
    }
  };

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    return {
      all: artworks.length,
      available: artworks.filter((a) => a.status === 'available').length,
      bronze: artworks.filter((a) => a.category === 'bronze').length,
      stone: artworks.filter((a) => a.category === 'stone').length,
      'steel-glass': artworks.filter((a) => a.category === 'steel-glass').length,
      sold: artworks.filter((a) => a.status === 'sold').length,
    };
  }, [artworks]);

  // Filtered artworks
  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'available') return art.status === 'available';
      if (activeCategory === 'sold') return art.status === 'sold';
      return art.category === activeCategory;
    });
  }, [artworks, activeCategory]);

  const featuredArtwork = artworks[0] || INITIAL_ARTWORKS[0];

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
      <Header
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        availableCount={categoryCounts.available}
      />

      {/* Hero Opening */}
      <Hero
        featuredArtwork={featuredArtwork}
        onOpenArtwork={handleOpenDetail}
      />

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
                Zastoupení & Zberatelství
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
      <ExhibitionsSection exhibitions={EXHIBITIONS} />

      {/* Biografie & Manifest */}
      <BiographySection />

      {/* Ateliér & Kontakt */}
      <ContactSection />

      {/* Footer (Zero-Smog Architectural Footer) */}
      <footer className="py-12 bg-[#FAF9F6] border-t border-[#E5E2DA] text-xs text-[#666560]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif-sculpture text-lg text-[#121214]">
              VIKTOR MAREK
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

          <div className="text-[11px] text-[#98968F]">
            Koncept a architektura webu: Software Factory Galerie Studio
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

      {/* Slide-Over Drawer: Admin Studio (Author Mode) */}
      <AdminStudioDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        artworks={artworks}
        onUpdateStatus={handleUpdateArtworkStatus}
        onResetArtworks={handleResetArtworks}
      />
    </div>
  );
}
