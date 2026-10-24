'use client';

import React, { useState } from 'react';
import { X, Check, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Artwork, InquiryFormData } from '@/types';

interface AcquisitionModalProps {
  artwork: Artwork | null;
  initialType?: 'purchase' | 'visit';
  onClose: () => void;
}

export const AcquisitionModal: React.FC<AcquisitionModalProps> = ({
  artwork,
  initialType = 'purchase',
  onClose,
}) => {
  const [inquiryType, setInquiryType] = useState<'purchase' | 'visit'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!artwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email to sculptor
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface (Zero-Smog: 1 outer border, clean hairlines) */}
      <div className="relative bg-[#FAF9F6] border border-[#E5E2DA] max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666560] hover:text-[#121214] hover:bg-[#F4F2EE] transition-colors"
          title="Zavřít formulář"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EBF2EF] text-[#2D4F44] mx-auto flex items-center justify-center border border-[#2D4F44]/20">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif-sculpture text-2xl text-[#121214]">
              Poptávka byla úspěšně odeslána
            </h3>
            <p className="text-sm text-[#666560] leading-relaxed max-w-sm mx-auto">
              Děkujeme za Váš zájem o dílo <strong className="text-[#121214]">{artwork.title}</strong> ({artwork.code}).
              Sochař Viktor Marek Vás bude osobně kontaktovat během 24 hodin na uvedený e-mail či telefon.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black"
              >
                Zavřít a pokračovat v prohlídce
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#98968F] font-mono">
                {artwork.code} · Akviziční formulář
              </span>
              <h3 className="font-serif-sculpture text-2xl text-[#121214] mt-1">
                {artwork.title}
              </h3>
              <p className="text-xs text-[#666560] mt-0.5">
                {artwork.material} · {artwork.dimensions.height} × {artwork.dimensions.width} cm
                {artwork.price ? ` · ${artwork.price}` : ''}
              </p>
            </div>

            {/* Inquiry Track Selector (Dual-Track) */}
            <div className="grid grid-cols-2 gap-2 border-b border-[#E5E2DA] pb-4">
              <button
                type="button"
                onClick={() => setInquiryType('purchase')}
                className={`py-2 px-3 text-xs uppercase tracking-wider text-center border transition-all ${
                  inquiryType === 'purchase'
                    ? 'bg-[#121214] text-white border-[#121214] font-medium'
                    : 'bg-white text-[#666560] border-[#E5E2DA] hover:border-[#121214]'
                }`}
              >
                Poptávka koupě
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('visit')}
                className={`py-2 px-3 text-xs uppercase tracking-wider text-center border transition-all ${
                  inquiryType === 'visit'
                    ? 'bg-[#121214] text-white border-[#121214] font-medium'
                    : 'bg-white text-[#666560] border-[#E5E2DA] hover:border-[#121214]'
                }`}
              >
                Návštěva v ateliéru
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#666560] mb-1">
                  Jméno a příjmení *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="např. Ing. Petr Novák"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D4D0C5] text-sm text-[#121214] focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666560] mb-1">
                    E-mailová adresa *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vas@email.cz"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D4D0C5] text-sm text-[#121214] focus:outline-none focus:border-[#121214]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#666560] mb-1">
                    Telefonní číslo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+420 777 000 000"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D4D0C5] text-sm text-[#121214] focus:outline-none focus:border-[#121214]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#666560] mb-1">
                  {inquiryType === 'purchase'
                    ? 'Doplňující dotaz (např. doprava, umístění, fakturace)'
                    : 'Preferovaný termín návštěvy ateliéru'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    inquiryType === 'purchase'
                      ? 'Rád bych se informoval o možnostech instalace v interiéru rodinného domu...'
                      : 'Mám zájem o prohlídku díla v ateliéru v Holešovicích příští týden...'
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D4D0C5] text-sm text-[#121214] focus:outline-none focus:border-[#121214] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#121214] text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Odesílám poptávku...</span>
                  ) : (
                    <>
                      <span>
                        {inquiryType === 'purchase'
                          ? 'Odeslat nezávaznou poptávku'
                          : 'Požádat o termín v ateliéru'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#98968F] text-center">
                Odeslání je nezávazné. Vaše kontaktní údaje slouží výhradně pro komunikaci s autorem.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
