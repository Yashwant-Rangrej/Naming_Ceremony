import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import { OrnamentalDivider } from './FloralDecoration';

export const VenueSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { venue } = CEREMONY_DATA;
  const hasDirectionsUrl = Boolean(venue.googleMapsUrl && venue.googleMapsUrl.trim().length > 0);

  return (
    <section id="venue" className={`scroll-mt-24 ${className}`} aria-labelledby="venue-heading">
      <div className="royal-card-frame">
        <div className="royal-inner-border" />

        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#B08D57] block mb-1">
            Ceremony Location
          </span>
          <h3 id="venue-heading" className="text-2xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            The Venue
          </h3>
          <p className="text-xs sm:text-sm text-[#6F5A48] max-w-md mx-auto mb-4">
            We look forward to hosting you in Bengaluru to celebrate this joyful milestone.
          </p>

          <OrnamentalDivider className="my-2" />

          {/* Location Content Box */}
          <div className="my-6 sm:my-8 p-4 sm:p-8 rounded-2xl bg-white/80 border border-[#B08D57]/30 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center text-[#81532F] mb-3">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#81532F]" />
            </div>

            {/* Real Venue Name & Address */}
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#81532F] mb-1">
              {venue.name}
            </h4>
            <p className="text-sm sm:text-base font-serif font-medium text-[#81532F]/90 mb-1">
              {venue.address}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#B08D57] mb-3">
              {venue.city}, {venue.stateCountry}
            </p>

            <div className="pt-2 border-t border-[#B08D57]/20">
              <span className="text-[11px] sm:text-xs text-[#8E7A69] bg-[#FFFAF5] py-1 px-3 rounded-full border border-[#B08D57]/25 inline-flex items-center gap-1.5">
                <span>📍</span>
                <span>Coordinates: 13.065476, 77.555595</span>
              </span>
            </div>

            {/* Embedded Live Google Map Preview */}
            <div className="mt-5 rounded-xl overflow-hidden border border-[#B08D57]/30 shadow-xs relative">
              <iframe
                title="Ceremony Venue Map"
                src="https://maps.google.com/maps?q=13.0654760,77.5555950&hl=en&z=15&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-44 sm:h-56 filter contrast-[1.02]"
              />
            </div>

            {/* Get Directions Button */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {hasDirectionsUrl && (
                <a
                  href={venue.googleMapsUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label="Open directions to the venue in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
