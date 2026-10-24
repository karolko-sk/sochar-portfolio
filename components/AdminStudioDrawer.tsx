'use client';

import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Landmark,
  Plus,
  RotateCcw,
  Sparkles,
  Save,
} from 'lucide-react';
import { Artwork, ArtworkStatus } from '@/types';

interface AdminStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  onUpdateStatus: (id: string, status: ArtworkStatus, price?: string, provenance?: string) => void;
  onResetArtworks: () => void;
}

export const AdminStudioDrawer: React.FC<AdminStudioDrawerProps> = ({
  isOpen,
  onClose,
  artworks,
  onUpdateStatus,
  onResetArtworks,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'help'>('inventory');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editProvenance, setEditProvenance] = useState('');

  if (!isOpen) return null;

  const handleStartEdit = (art: Artwork) => {
    setEditingId(art.id);
    setEditPrice(art.price || '');
    setEditProvenance(art.provenance || '');
  };

  const handleSaveEdit = (art: Artwork) => {
    onUpdateStatus(art.id, art.status, editPrice, editProvenance);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
        <div className="w-screen max-w-xl bg-[#FAF9F6] border-l border-[#121214] flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E2DA] flex items-center justify-between bg-[#121214] text-white">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Režim autora · Rychlá správa webu
                </h3>
                <p className="text-[11px] text-white/70">
                  Interaktivní demonstrace pro sochára / admina
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Zavřít panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader info banner */}
          <div className="px-6 py-3 bg-[#EBF2EF] border-b border-[#2D4F44]/20 flex items-center justify-between text-xs text-[#2D4F44]">
            <span>
              💡 Změny provedené zde se <strong>okamžitě projeví na živém webu</strong>.
            </span>
            <button
              onClick={onResetArtworks}
              className="flex items-center gap-1 font-medium hover:underline text-[11px]"
              title="Vrátit původní stav"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-[#98968F] font-semibold">
                  Přehled plastik v ateliéru ({artworks.length})
                </h4>
                <span className="text-[11px] text-[#666560]">
                  Kliknutím změňte stav sochy
                </span>
              </div>

              {/* Artwork Inventory List */}
              <div className="divide-y divide-[#E5E2DA] border border-[#E5E2DA] bg-white">
                {artworks.map((art) => {
                  const isEditing = editingId === art.id;

                  return (
                    <div key={art.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={art.primaryImage}
                            alt={art.title}
                            className="w-12 h-14 object-cover border border-[#E5E2DA] flex-shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#98968F] block">
                              {art.code} · {art.year}
                            </span>
                            <strong className="text-sm font-serif-sculpture text-[#121214] block">
                              {art.title}
                            </strong>
                            <span className="text-[11px] text-[#666560] line-clamp-1">
                              {art.material}
                            </span>
                          </div>
                        </div>

                        {/* Status Selectors */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onUpdateStatus(art.id, 'available')}
                              className={`px-2 py-1 text-[10px] uppercase tracking-wider border transition-colors ${
                                art.status === 'available'
                                  ? 'bg-[#EBF2EF] text-[#2D4F44] border-[#2D4F44] font-semibold'
                                  : 'bg-white text-[#98968F] border-[#E5E2DA] hover:border-[#121214]'
                              }`}
                              title="Označit jako K dispozici"
                            >
                              K dispozici
                            </button>
                            <button
                              onClick={() => onUpdateStatus(art.id, 'reserved')}
                              className={`px-2 py-1 text-[10px] uppercase tracking-wider border transition-colors ${
                                art.status === 'reserved'
                                  ? 'bg-[#FFF7ED] text-[#9A3412] border-[#9A3412] font-semibold'
                                  : 'bg-white text-[#98968F] border-[#E5E2DA] hover:border-[#121214]'
                              }`}
                              title="Označit jako Rezervováno"
                            >
                              Rezervace
                            </button>
                            <button
                              onClick={() => onUpdateStatus(art.id, 'sold')}
                              className={`px-2 py-1 text-[10px] uppercase tracking-wider border transition-colors ${
                                art.status === 'sold'
                                  ? 'bg-[#121214] text-white border-[#121214] font-semibold'
                                  : 'bg-white text-[#98968F] border-[#E5E2DA] hover:border-[#121214]'
                              }`}
                              title="Označit jako Prodáno / V soukromé sbírce"
                            >
                              Prodáno
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              isEditing ? handleSaveEdit(art) : handleStartEdit(art)
                            }
                            className="text-[10px] text-[#666560] hover:text-[#121214] underline underline-offset-2"
                          >
                            {isEditing ? 'Uložit úpravu ceny' : 'Upravit cenu / provenienci'}
                          </button>
                        </div>
                      </div>

                      {/* Inline quick edit for price/provenance */}
                      {isEditing && (
                        <div className="pt-2 border-t border-dashed border-[#E5E2DA] grid grid-cols-2 gap-2 text-xs bg-[#FAF9F6] p-2">
                          <div>
                            <label className="text-[10px] uppercase text-[#666560] block mb-0.5">
                              Cena (prodejní)
                            </label>
                            <input
                              type="text"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              placeholder="např. 250 000 Kč"
                              className="w-full px-2 py-1 bg-white border border-[#D4D0C5] text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-[#666560] block mb-0.5">
                              Provenience (pokud prodáno)
                            </label>
                            <input
                              type="text"
                              value={editProvenance}
                              onChange={(e) => setEditProvenance(e.target.value)}
                              placeholder="např. Soukromá sbírka Praha"
                              className="w-full px-2 py-1 bg-white border border-[#D4D0C5] text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation for Phase 2 Production */}
            <div className="p-4 bg-[#F4F2EE] border border-[#E5E2DA] space-y-2 text-xs text-[#666560]">
              <h5 className="font-medium text-[#121214] uppercase tracking-wider text-[11px]">
                Jak bude fungovat plná Fáze 2 (Produkční CMS):
              </h5>
              <p>
                V produkční verzi bude toto rozhraní zabezpečeno samostatným přihlášením
                (Payload CMS / Sanity) s možností nahrávat originální videa přímo z iPhonu
                do Cloudflare R2 úložiska a automatickým generováním faktur k poptávkám.
              </p>
            </div>
          </div>

          {/* Footer close */}
          <div className="p-4 border-t border-[#E5E2DA] bg-[#FAF9F6] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
            >
              Zavřít režim autora a prohlížet web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
