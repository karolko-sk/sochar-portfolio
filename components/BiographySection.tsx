import React from 'react';
import { Award, GraduationCap, Building2, Download } from 'lucide-react';
import { ArtistProfile } from '@/lib/schemas';

interface BiographySectionProps {
  profile: ArtistProfile | null;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="biografie" className="py-20 border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sculptor Portrait & Studio Atmosphere */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/5] bg-[#F4F2EE] border border-[#E5E2DA] overflow-hidden relative">
              <img
                src={profile.portraitImage}
                alt={`Sochař ${profile.name} v ateliéru`}
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 border border-[#E5E2DA]">
                <span className="text-xs uppercase tracking-widest text-[#121214] font-medium block">
                  {profile.name} (*{profile.birthYear})
                </span>
                <span className="text-[11px] text-[#666560]">
                  Sochařský ateliér Praha – Holešovice
                </span>
              </div>
            </div>

            {profile.catalogPdfUrl ? (
              <div className="pt-2">
                <a
                  href={profile.catalogPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white border border-[#D4D0C5] text-[#121214] text-xs uppercase tracking-wider font-medium hover:border-[#121214] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#2D4F44]" />
                  <span>Stáhnout kurátorské CV & Portfolio (PDF)</span>
                </a>
              </div>
            ) : null}
          </div>

          {/* Autorský manifest & Strukturované CV */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#98968F] font-mono">
                Autorský manifest
              </span>
              <h2 className="font-serif-sculpture text-3xl sm:text-4xl text-[#121214] mt-1">
                {profile.manifestoHeading}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#666560] font-light leading-relaxed">
              {profile.manifestoText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <blockquote className="border-l-2 border-[#121214] pl-4 py-2 font-serif-sculpture text-lg text-[#121214] italic">
                „{profile.manifestoQuote}“
              </blockquote>
            </div>

            {/* Structured Resume Items (Zero-Smog hairline list) */}
            <div className="pt-4 border-t border-[#E5E2DA] space-y-6">
              {profile.education.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F4F2EE] border border-[#E5E2DA] text-[#2D4F44] mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#121214] font-semibold">
                      Vzdělání & Ateliérová praxe
                    </h4>
                    <div className="text-xs text-[#666560] mt-1 space-y-0.5">
                      {profile.education.map((edu, i) => (
                        <div key={i}>
                          <strong>{edu.period}:</strong> {edu.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {profile.collections.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F4F2EE] border border-[#E5E2DA] text-[#2D4F44] mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#121214] font-semibold">
                      Zastoupení ve veřejných a privátních sbírkách
                    </h4>
                    <p className="text-xs text-[#666560] mt-1">
                      {profile.collections.map((c) => c.title).join(' · ')}
                    </p>
                  </div>
                </div>
              )}

              {profile.awards.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F4F2EE] border border-[#E5E2DA] text-[#2D4F44] mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#121214] font-semibold">
                      Ocenění & Sympózia
                    </h4>
                    <div className="text-xs text-[#666560] mt-1 space-y-0.5">
                      {profile.awards.map((award, i) => (
                        <div key={i}>
                          <strong>{award.year}:</strong> {award.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
