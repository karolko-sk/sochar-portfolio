'use client';

import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

interface HeaderProps {
  availableCount: number;
}

export const Header: React.FC<HeaderProps> = ({ availableCount }) => {
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

        {/* Author / Operator CMS Access */}
        <div className="flex items-center gap-3">
          <a
            href="/keystatic"
            className="px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border bg-white/90 text-[#121214] border-[#D4D0C5] hover:border-[#121214] hover:bg-[#121214] hover:text-white transition-all shadow-xs"
            title="Přihlásit se do správy obsahu (Keystatic CMS)"
          >
            <Lock className="w-3 h-3 text-[#2D4F44]" />
            <span className="hidden sm:inline">Správa obsahu (CMS)</span>
            <span className="sm:hidden">CMS</span>
          </a>
        </div>
      </div>
    </header>
  );
};
