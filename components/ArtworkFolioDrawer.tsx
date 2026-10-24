'use client';

import React, { useState } from 'react';
import {
  X,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Landmark,
  Scale,
  Ruler,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Artwork } from '@/types';

interface ArtworkFolioDrawerProps {
  artwork: Artwork | null;
  onClose: () => void;
  onInquire: (artwork: Artwork, type: 'purchase' | 'visit') => void;
}

export const ArtworkFolioDrawer: React.FC<ArtworkFolioDrawerProps> = ({
  artwork,
  onClose,
  onInquire,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);

  if (!artwork) return null;

  const images = artwork.galleryImages && artwork.galleryImages.length > 0
    ? artwork.galleryImages
    : [{ url: artwork.heroImage, alt: artwork.title, label: 'Celkový pohled' }];

  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#FAF9F6] border-l border-[#E5E2DA] flex flex-col shadow-2xl relative">
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-[#E5E2DA] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#98968F] font-mono">
                {artwork.code}
              </span>
              <span className="h-3 w-px bg-[#E5E2DA]" />
              <span className="text-xs uppercase tracking-wider text-[#666560]">
                Technický list & Plastika
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#666560] hover:text-[#121214] hover:bg-[#F4F2EE] transition-colors"
              title="Zavřít detail (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            {/* Visual Media Showcase (Photos or Video Loop) */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#F4F2EE] border border-[#E5E2DA] overflow-hidden">
                {isVideoMode && artwork.videoUrl ? (
                  <video
                    src={artwork.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentImage.url}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover object-center"
                  />
                )}

                {/* Media Switcher Floating Pill */}
                {artwork.videoUrl && (
                  <div className="absolute top-4 right-4 flex items-center bg-black/75 backdrop-blur-md p-1 border border-white/20">
                    <button
                      onClick={() => setIsVideoMode(false)}
                      className={`px-2.5 py-1 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                        !isVideoMode
                          ? 'bg-white text-[#121214] font-medium'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Fotografie</span>
                    </button>
                    <button
                      onClick={() => setIsVideoMode(true)}
                      className={`px-2.5 py-1 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                        isVideoMode
                          ? 'bg-white text-[#121214] font-medium'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video smyčka</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Angle Selector Thumbnails */}
              {!isVideoMode && images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 flex-shrink-0 border transition-all overflow-hidden ${
                        selectedImageIndex === idx
                          ? 'border-[#121214] ring-1 ring-[#121214]'
                          : 'border-[#E5E2DA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center py-0.5 truncate px-1">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Status */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {artwork.status === 'available' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs uppercase tracking-wider bg-[#EBF2EF] text-[#2D4F44] border border-[#2D4F44]/20 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F44]" />
                    K dispozici v ateliéru
                  </span>
                )}
                {artwork.status === 'reserved' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs uppercase tracking-wider bg-[#FFF7ED] text-[#9A3412] border border-[#9A3412]/20 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#9A3412]" />
                    Rezervováno
                  </span>
                )}
                {artwork.status === 'sold' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs uppercase tracking-wider bg-[#F4F2EE] text-[#666560] border border-[#D4D0C5] font-medium">
                    <Landmark className="w-3.5 h-3.5 text-[#666560]" />
                    V soukromé sbírce
                  </span>
                )}
                <span className="text-xs text-[#98968F] font-mono">
                  Rok: {artwork.year}
                </span>
              </div>

              <h2 className="font-serif-sculpture text-3xl sm:text-4xl text-[#121214]">
                {artwork.title}
              </h2>
              {artwork.subtitle && (
                <p className="text-sm uppercase tracking-widest text-[#666560] mt-1">
                  {artwork.subtitle}
                </p>
              )}

              {/* Price / Provenance Banner */}
              <div className="mt-4 p-4 bg-[#F4F2EE] border-l-2 border-[#121214] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#98968F] block">
                    {artwork.status === 'available'
                      ? 'Orientační cena'
                      : artwork.status === 'sold'
                      ? 'Umístění / Provenience'
                      : 'Stav jednání'}
                  </span>
                  <span className="text-lg font-medium text-[#121214]">
                    {artwork.status === 'available'
                      ? artwork.price || 'Cena na vyžádání'
                      : artwork.status === 'sold'
                      ? artwork.provenance || 'Soukromá sbírka'
                      : 'Předběžná rezervace'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#666560]">
                    Faktura & certifikát pravosti
                  </span>
                </div>
              </div>
            </div>

            {/* Curatorial Text & Description */}
            <div className="space-y-3 border-t border-[#E5E2DA] pt-6">
              <h4 className="text-xs uppercase tracking-wider text-[#98968F] font-semibold">
                Kurátorský komentář
              </h4>
              <p className="text-sm text-[#121214] leading-relaxed font-light">
                {artwork.description}
              </p>
              <p className="text-xs text-[#666560] italic border-l border-[#D4D0C5] pl-3 py-1">
                „{artwork.curatorNote}“
              </p>
            </div>

            {/* Technical Specifications (Hairline Ledger) */}
            <div className="border-t border-[#E5E2DA] pt-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#98968F] font-semibold">
                Technická specifikace pro instalaci
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white border border-[#E5E2DA]">
                  <span className="text-[#98968F] uppercase tracking-wider text-[10px] block">
                    Materiál & Povrch
                  </span>
                  <span className="font-medium text-[#121214] mt-1 block">
                    {artwork.material}
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E5E2DA]">
                  <span className="text-[#98968F] uppercase tracking-wider text-[10px] block">
                    Rozměry (V × Š × H)
                  </span>
                  <span className="font-mono font-medium text-[#121214] mt-1 block">
                    {artwork.dimensions.height} × {artwork.dimensions.width} × {artwork.dimensions.depth} cm
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E5E2DA]">
                  <span className="text-[#98968F] uppercase tracking-wider text-[10px] block">
                    Celková hmotnost
                  </span>
                  <span className="font-mono font-medium text-[#121214] mt-1 block">
                    {artwork.dimensions.weight} kg
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E5E2DA]">
                  <span className="text-[#98968F] uppercase tracking-wider text-[10px] block">
                    Doporučené umístění
                  </span>
                  <span className="font-medium text-[#121214] mt-1 block">
                    {artwork.dimensions.height > 150
                      ? 'Interiér / Zastřešené atrium'
                      : 'Podstavec / Konzole'}
                  </span>
                </div>
              </div>
            </div>

            {/* Human Scale Comparator Visualizer */}
            <div className="border-t border-[#E5E2DA] pt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[#98968F] font-semibold">
                  Měřítko vůči lidské postavě (180 cm)
                </span>
                <span className="text-[#666560] font-mono">
                  Výška plastiky: {artwork.dimensions.height} cm
                </span>
              </div>
              <div className="h-32 bg-white border border-[#E5E2DA] flex items-end justify-center gap-12 px-8 py-3">
                {/* Human silhouette representation */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-24 bg-[#D4D0C5] flex items-center justify-center text-[9px] text-[#666560] font-mono">
                    180 cm
                  </div>
                  <span className="text-[10px] text-[#98968F] mt-1">Postava</span>
                </div>

                {/* Sculpture representation scaled */}
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      height: `${Math.min(
                        Math.max(
                          (artwork.dimensions.height / 180) * 96,
                          24
                        ),
                        110
                      )}px`,
                      width: `${Math.max(
                        (artwork.dimensions.width / 50) * 20,
                        16
                      )}px`,
                    }}
                    className="bg-[#121214] flex items-center justify-center text-[9px] text-white font-mono"
                  >
                    {artwork.dimensions.height}
                  </div>
                  <span className="text-[10px] text-[#121214] font-medium mt-1">
                    Socha
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="p-6 border-t border-[#E5E2DA] bg-[#FAF9F6] space-y-3">
            {artwork.status === 'available' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onInquire(artwork, 'purchase')}
                  className="w-full py-3.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <span>Mám zájem o koupi</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onInquire(artwork, 'visit')}
                  className="w-full py-3.5 border border-[#D4D0C5] text-[#121214] text-xs uppercase tracking-wider font-medium hover:border-[#121214] transition-colors"
                >
                  Domluvit prohlídku v ateliéru
                </button>
              </div>
            ) : (
              <button
                onClick={() => onInquire(artwork, 'purchase')}
                className="w-full py-3.5 border border-[#121214] text-[#121214] text-xs uppercase tracking-wider font-medium hover:bg-[#121214] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Poptat podobné dílo na zakázku</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <p className="text-[11px] text-[#98968F] text-center">
              Doprava sochy po ČR a instalace na místě po osobní konzultaci s autorem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
