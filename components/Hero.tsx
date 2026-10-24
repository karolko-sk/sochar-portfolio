import React from 'react';
import { Compass } from 'lucide-react';
import { Artwork } from '@/types';

interface HeroProps {
  featuredArtwork: Artwork;
  onOpenArtwork: (artwork: Artwork) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredArtwork, onOpenArtwork }) => {
  return (
    <section className="relative pt-12 pb-20 border-b border-[#E5E2DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Curator Statement & Headline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#666560]">
              <Compass className="w-3.5 h-3.5 text-[#2D4F44]" />
              <span>Praha · Ateliér Holešovice</span>
            </div>

            <h1 className="font-serif-sculpture text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] text-[#121214]">
              Hmota, prostor a vnitřní napětí.
            </h1>

            <p className="text-base sm:text-lg text-[#666560] font-light leading-relaxed max-w-xl">
              Sochy vznikající z dialogu mezi surovou zemitostí patinovaného bronzu,
              krystalickou čistotou mramoru a tekutou formou kamene. Každá
              plastika je vytvořena jako unikátní autorský solitér pro soukromé sbírky i veřejnou architekturu.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#dila"
                className="px-6 py-3.5 bg-[#121214] text-[#FAF9F6] text-sm uppercase tracking-wider font-medium hover:bg-black transition-colors"
              >
                Prohlédnout portfolio děl
              </a>
              <a
                href="#vystavy"
                className="px-6 py-3.5 border border-[#D4D0C5] text-[#121214] text-sm uppercase tracking-wider font-medium hover:border-[#121214] transition-colors"
              >
                Aktuální výstava (Praha)
              </a>
            </div>

            {/* Quick Metrics (Zero-Smog Hairline Ledger) */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#E5E2DA] text-xs">
              <div>
                <span className="block text-[#98968F] uppercase tracking-wider text-[10px]">
                  Materiály
                </span>
                <span className="font-medium text-[#121214] mt-0.5 block">
                  Bronz, Mramor, Kámen
                </span>
              </div>
              <div>
                <span className="block text-[#98968F] uppercase tracking-wider text-[10px]">
                  Zastoupení
                </span>
                <span className="font-medium text-[#121214] mt-0.5 block">
                  Praha, Vídeň, Brno
                </span>
              </div>
              <div>
                <span className="block text-[#98968F] uppercase tracking-wider text-[10px]">
                  Ateliér
                </span>
                <span className="font-medium text-[#121214] mt-0.5 block">
                  Návštěvy po dohodě
                </span>
              </div>
            </div>
          </div>

          {/* Featured Hero Sculpture Showcase */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={() => onOpenArtwork(featuredArtwork)}
              className="group cursor-pointer block relative bg-[#F4F2EE] border border-[#E5E2DA] overflow-hidden"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <img
                  src={featuredArtwork.heroImage}
                  alt={featuredArtwork.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Floating Status & Artwork Info */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[11px] font-medium tracking-wide uppercase text-[#2D4F44] border border-[#E5E2DA]">
                    Vybrané dílo sezóny
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                  <div className="text-xs uppercase tracking-widest text-white/80 font-mono">
                    {featuredArtwork.code} · {featuredArtwork.year}
                  </div>
                  <h2 className="font-serif-sculpture text-2xl sm:text-3xl text-white">
                    {featuredArtwork.title}
                  </h2>
                  <p className="text-xs text-white/90 font-light truncate">
                    {featuredArtwork.material}
                  </p>
                  <div className="pt-2 text-xs text-white/90 underline underline-offset-4 flex items-center gap-1 group-hover:text-white">
                    Otevřít technický list plastiky
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
