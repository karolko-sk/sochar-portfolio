'use client';

import React from 'react';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  availableCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isAdminOpen,
  onToggleAdmin,
  availableCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Monogram & Studio Identity */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif-sculpture text-xl md:text-2xl font-normal tracking-wide text-[#121214] group-hover:opacity-75 transition-opacity">
            VIKTOR MAREK
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#666560]">
            Sochařský ateliér & Galerie
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm tracking-wide">
          <a
            href="#dila"
            className="text-[#121214] hover:text-[#666560] transition-colors relative py-1"
          >
            Díla
            <span className="ml-1.5 text-[11px] text-[#2D4F44] font-medium">
              ({availableCount} k dispozici)
            </span>
          </a>
          <a
            href="#archiv"
            className="text-[#666560] hover:text-[#121214] transition-colors"
          >
            Archiv realizací
          </a>
          <a
            href="#vystavy"
            className="text-[#666560] hover:text-[#121214] transition-colors"
          >
            Vernisáže & Výstavy
          </a>
          <a
            href="#biografie"
            className="text-[#666560] hover:text-[#121214] transition-colors"
          >
            Biografie
          </a>
          <a
            href="#kontakt"
            className="text-[#666560] hover:text-[#121214] transition-colors flex items-center gap-1"
          >
            Ateliér
            <ArrowUpRight className="w-3.5 h-3.5 text-[#98968F]" />
          </a>
        </nav>

        {/* Action Controls & Admin Studio Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAdmin}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border transition-all ${
              isAdminOpen
                ? 'bg-[#121214] text-white border-[#121214]'
                : 'bg-white/80 text-[#666560] border-[#D4D0C5] hover:border-[#121214] hover:text-[#121214]'
            }`}
            title="Kliknutím otevřete autorské editační rozhraní"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Režim autora</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
