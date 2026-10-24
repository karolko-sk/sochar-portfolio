import React from 'react';
import { Maximize2, Video, CheckCircle2, Clock, Landmark } from 'lucide-react';
import { Artwork } from '@/types';

interface ArtworkCardProps {
  artwork: Artwork;
  onOpen: (artwork: Artwork) => void;
  onQuickInquire: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onOpen,
  onQuickInquire,
}) => {
  const getStatusBadge = () => {
    switch (artwork.status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-[#EBF2EF] text-[#2D4F44] border border-[#2D4F44]/20">
            <CheckCircle2 className="w-3 h-3 text-[#2D4F44]" />
            K dispozici
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-[#FFF7ED] text-[#9A3412] border border-[#9A3412]/20">
            <Clock className="w-3 h-3 text-[#9A3412]" />
            Rezervováno
          </span>
        );
      case 'sold':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-[#F4F2EE] text-[#666560] border border-[#D4D0C5]">
            <Landmark className="w-3 h-3 text-[#666560]" />
            V soukromé sbírce
          </span>
        );
    }
  };

  return (
    <div className="group flex flex-col bg-transparent transition-all duration-300">
      {/* Visual Artwork Frame (Zero-Smog: Hairline border only) */}
      <div
        onClick={() => onOpen(artwork)}
        className="relative aspect-[3/4] bg-[#F4F2EE] border border-[#E5E2DA] group-hover:border-[#121214] transition-colors cursor-pointer overflow-hidden"
      >
        <img
          src={artwork.primaryImage}
          alt={artwork.title}
          className="w-full h-full object-cover object-center grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
        />

        {/* Video / 360 Indicator if available */}
        {artwork.videoUrl && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Video className="w-3 h-3" />
            <span>Video loop</span>
          </div>
        )}

        {/* Code watermark */}
        <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-white/90 drop-shadow-sm font-mono">
          {artwork.code}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(artwork);
            }}
            className="px-4 py-2.5 bg-[#FAF9F6] text-[#121214] text-xs uppercase tracking-wider font-medium shadow-md flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Detail plastiky</span>
          </button>
        </div>
      </div>

      {/* Typography & Hairline Ledger */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] uppercase tracking-widest text-[#98968F]">
            {artwork.year} · {artwork.category.toUpperCase()}
          </span>
          {getStatusBadge()}
        </div>

        <h3
          onClick={() => onOpen(artwork)}
          className="font-serif-sculpture text-xl text-[#121214] group-hover:text-[#666560] transition-colors cursor-pointer"
        >
          {artwork.title}
        </h3>

        <p className="text-xs text-[#666560] font-light mt-0.5 line-clamp-1">
          {artwork.material}
        </p>

        {/* Hairline Technical Dimension Row */}
        <div className="mt-3 pt-2.5 border-t border-[#E5E2DA] flex items-center justify-between text-xs">
          <span className="text-[#666560] font-mono text-[11px]">
            {artwork.dimensions.height} × {artwork.dimensions.width} × {artwork.dimensions.depth} cm · {artwork.dimensions.weight} kg
          </span>

          {artwork.status === 'available' && artwork.price && (
            <span className="font-medium text-[#121214]">{artwork.price}</span>
          )}
          {artwork.status === 'sold' && artwork.provenance && (
            <span className="text-[11px] text-[#98968F] truncate max-w-[120px]">
              {artwork.provenance}
            </span>
          )}
        </div>

        {/* Dominant Action for the Card */}
        <div className="mt-3 pt-2">
          {artwork.status === 'available' ? (
            <button
              onClick={() => onQuickInquire(artwork)}
              className="w-full py-2 bg-transparent text-[#121214] border border-[#D4D0C5] text-xs uppercase tracking-wider font-medium hover:bg-[#121214] hover:text-white hover:border-[#121214] transition-all"
            >
              Mám zájem o toto dílo
            </button>
          ) : (
            <button
              onClick={() => onOpen(artwork)}
              className="w-full py-2 bg-transparent text-[#666560] border border-[#E5E2DA] text-xs uppercase tracking-wider hover:border-[#121214] hover:text-[#121214] transition-all"
            >
              Prohlédnout v archivu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
