import React from 'react';
import { MapPin, Mail, Phone, Clock, ArrowUpRight, Camera } from 'lucide-react';
import { SiteSettings } from '@/lib/schemas';

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  if (!settings) return null;

  return (
    <section id="kontakt" className="py-20 bg-[#F4F2EE] border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#98968F] font-mono">
              Osobní setkání
            </span>
            <h2 className="font-serif-sculpture text-3xl sm:text-4xl text-[#121214]">
              Návštěva ateliéru & Kontakt
            </h2>
            <p className="text-sm sm:text-base text-[#666560] font-light leading-relaxed">
              Ateliér se nachází v industriálním areálu bývalých dílen v pražských Holešovicích.
              Rád Vás přivítám k osobní prohlídce rozpracovaných i dokončených plastik a konzultaci
              vhodného umístění v architektuře.
            </p>

            <div className="pt-2 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2D4F44] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#121214] block">Sochařský ateliér Viktor Marek</strong>
                  <span className="text-[#666560]">
                    {settings.studioAddress.street}, {settings.studioAddress.zip} {settings.studioAddress.city}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2D4F44] flex-shrink-0" />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-[#121214] hover:underline"
                >
                  {settings.contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2D4F44] flex-shrink-0" />
                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="text-[#121214] hover:underline">
                  {settings.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#2D4F44] flex-shrink-0" />
                <span className="text-[#666560]">
                  Návštěvy ateliéru po předchozí telefonické či e-mailové domluvě.
                </span>
              </div>
            </div>
          </div>

          {/* Consultation info card */}
          <div className="lg:col-span-6 bg-white border border-[#E5E2DA] p-8 space-y-6">
            <h3 className="font-serif-sculpture text-xl text-[#121214]">
              Zakázková tvorba do architektury
            </h3>
            <p className="text-xs sm:text-sm text-[#666560] font-light leading-relaxed">
              Kromě volné ateliérové tvorby se věnuji realizacím soch přímo do konkrétního
              architektonického kontextu (soukromé zahrady, atria, vstupní haly firemních sídel).
              Spolupracuji s architekty od fáze skici přes statické posouzení až po finální montáž.
            </p>

            <div className="pt-2 border-t border-[#E5E2DA] flex flex-wrap items-center justify-between gap-4">
              {settings.socialLinks.instagram ? (
                <div className="flex items-center gap-2 text-xs text-[#121214]">
                  <Camera className="w-4 h-4 text-[#2D4F44]" />
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1 font-medium"
                  >
                    @viktormarek.sculpture
                    <ArrowUpRight className="w-3 h-3 text-[#98968F]" />
                  </a>
                </div>
              ) : null}

              {settings.companyId ? (
                <span className="text-[11px] text-[#98968F]">
                  {settings.companyId}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
