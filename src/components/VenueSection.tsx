import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import { CornerOrnament, OrnamentalDivider } from './FloralDecoration';

export const VenueSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { venue } = CEREMONY_DATA;
  const [copied, setCopied] = useState(false);
  const hasDirectionsUrl = Boolean(venue.googleMapsUrl && venue.googleMapsUrl.trim().length > 0);

  const fullAddress = `${venue.name}, ${venue.address}, ${venue.city}, ${venue.stateCountry}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="venue" className={`scroll-mt-24 ${className}`} aria-labelledby="venue-heading">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FFFAF4] to-[#FFFDFB] relative overflow-hidden border-[#B08D57]/35 shadow-md">
        <CornerOrnament position="top-left" size={38} />
        <CornerOrnament position="top-right" size={38} />
        <CornerOrnament position="bottom-left" size={38} />
        <CornerOrnament position="bottom-right" size={38} />
        <div className="royal-inner-border" />

        <div className="text-center relative z-10 max-w-2xl mx-auto px-2 sm:px-4 py-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-[10px] sm:text-xs uppercase tracking-widest text-[#81532F] font-semibold mb-2 shadow-xs">
            <span>Ceremony Location</span>
          </div>

          <h3 id="venue-heading" className="text-2xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            The Venue
          </h3>
          <p className="text-xs sm:text-sm text-[#6F5A48] max-w-md mx-auto mb-3 sm:mb-4 leading-relaxed">
            We look forward to welcoming you in Bengaluru to celebrate this joyful milestone.
          </p>

          <OrnamentalDivider className="my-2" />

          {/* Location Content Box */}
          <div className="my-5 sm:my-7 p-4 sm:p-7 rounded-2xl bg-white/90 border border-[#B08D57]/35 shadow-xs relative overflow-hidden text-center">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center text-[#81532F] mb-3 shadow-xs border border-[#B08D57]/20">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#81532F]" />
            </div>

            {/* Venue Name & Address */}
            <h4 className="font-serif text-xl sm:text-3xl font-bold text-[#81532F] mb-1 gold-gradient-text leading-tight">
              {venue.name}
            </h4>
            <p className="text-xs sm:text-base font-serif font-medium text-[#81532F]/90 mb-1">
              {venue.address}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#B08D57] mb-3">
              {venue.city}, {venue.stateCountry}
            </p>

            <div className="pt-2 border-t border-[#B08D57]/20">
              <span className="text-[10px] sm:text-xs text-[#8E7A69] bg-[#FFFAF5] py-1 px-3 rounded-full border border-[#B08D57]/25 inline-flex items-center gap-1.5 shadow-xs">
                <span>📍</span>
                <span>Vidyaranyapura, Bengaluru</span>
              </span>
            </div>

            {/* Embedded Live Google Map Preview */}
            <div className="mt-4 rounded-xl overflow-hidden border border-[#B08D57]/30 shadow-xs relative">
              <iframe
                title="Ceremony Venue Map"
                src="https://maps.google.com/maps?q=13.0654760,77.5555950&hl=en&z=15&output=embed"
                width="100%"
                height="190"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-40 sm:h-52 filter contrast-[1.02]"
              />
            </div>

            {/* Mobile-Friendly Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              {hasDirectionsUrl && (
                <a
                  href={venue.googleMapsUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto text-sm py-2.5 px-5"
                  aria-label="Open directions to the venue in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyAddress}
                className="btn-secondary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-4"
                aria-label="Copy venue address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-700 font-semibold">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
