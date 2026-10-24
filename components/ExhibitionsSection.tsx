'use client';

import React from 'react';
import { Calendar, MapPin, ExternalLink, Download, Clock } from 'lucide-react';
import { Exhibition } from '@/types';

interface ExhibitionsSectionProps {
  exhibitions: Exhibition[];
}

export const ExhibitionsSection: React.FC<ExhibitionsSectionProps> = ({
  exhibitions,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  // Derived upcoming exhibition based on date invariant
  const upcoming = exhibitions.find((e) => e.endDate >= todayStr) || exhibitions[0];
  const past = exhibitions.filter((e) => e.id !== upcoming?.id);

  return (
    <section id="vystavy" className="py-20 border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#98968F] font-mono">
              Kurátorský program
            </span>
            <h2 className="font-serif-sculpture text-3xl sm:text-4xl text-[#121214] mt-1">
              Vernisáže & Výstavy
            </h2>
          </div>
          <p className="text-sm text-[#666560] max-w-md font-light">
            Přehled autorských a skupinových prezentací v galeriích moderního umění
            a institucionálních sbírkách v České republice i zahraničí.
          </p>
        </div>

        {/* Featured Upcoming Exhibition Card (Zero-Smog: Hairline ledger) */}
        {upcoming && (
          <div className="mb-16 bg-[#F4F2EE] border border-[#E5E2DA] p-8 sm:p-10 relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#2D4F44] text-[11px] font-medium tracking-wider uppercase border border-[#E5E2DA] mb-6">
              <Clock className="w-3.5 h-3.5" />
              Nadcházející samostatná výstava
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-serif-sculpture text-2xl sm:text-3xl text-[#121214]">
                  {upcoming.title}
                </h3>
                <p className="text-sm sm:text-base text-[#666560] font-light leading-relaxed">
                  {upcoming.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#121214]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#2D4F44]" />
                    <span className="font-medium">{upcoming.datesFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2D4F44]" />
                    <span>
                      {upcoming.venue}, {upcoming.city}
                    </span>
                  </div>
                  <div className="text-[#666560]">
                    Kurátor: <span className="font-medium text-[#121214]">{upcoming.curator}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                {upcoming.externalEventUrl && (
                  <a
                    href={upcoming.externalEventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium text-center hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Uložit do kalendáře</span>
                  </a>
                )}
                {upcoming.mapUrl && (
                  <a
                    href={upcoming.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-white border border-[#D4D0C5] text-[#121214] text-xs uppercase tracking-wider font-medium text-center hover:border-[#121214] transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Zobrazit na mapě</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Past Exhibitions Chronology (Zero-Smog Single Calm Surface) */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#98968F] font-semibold mb-6">
            Historie výstav a sympozií
          </h4>
          <div className="divide-y divide-[#E5E2DA] border-t border-b border-[#E5E2DA]">
            {past.map((item) => (
              <div
                key={item.id}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/40 transition-colors px-2"
              >
                <div className="md:col-span-3 text-xs font-mono text-[#666560]">
                  {item.datesFormatted}
                </div>
                <div className="md:col-span-5">
                  <h5 className="font-medium text-sm text-[#121214]">
                    {item.title}
                  </h5>
                  <p className="text-xs text-[#666560] font-light mt-0.5">
                    {item.description}
                  </p>
                </div>
                <div className="md:col-span-3 text-xs text-[#666560]">
                  {item.venue}, {item.city}
                </div>
                <div className="md:col-span-1 text-right">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F4F2EE] text-[#666560] border border-[#E5E2DA]">
                    {item.type === 'solo' ? 'Samostatná' : 'Skupinová'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
