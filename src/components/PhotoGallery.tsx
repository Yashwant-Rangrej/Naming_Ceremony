import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Eye } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import type { GalleryPhoto } from '../data/ceremony';
import { Lightbox } from './Lightbox';
import { OrnamentalDivider } from './FloralDecoration';

// Tasteful sample illustrations/mock items solely for demonstration when preview is toggled
const DEMO_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'demo-1',
    url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
    caption: 'Sample Moment: Auspicious Jasmine & Floral Decor (Demo Preview)',
    altText: 'Sample traditional Indian ceremony floral decor',
  },
  {
    id: 'demo-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    caption: 'Sample Moment: Auspicious Diya & Golden Lights (Demo Preview)',
    altText: 'Sample festive golden lighting and diya',
  },
  {
    id: 'demo-3',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    caption: 'Sample Moment: Traditional Silk Cushions & Garlands (Demo Preview)',
    altText: 'Sample celebration cushion arrangement',
  },
];

export const PhotoGallery: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { gallery } = CEREMONY_DATA;
  const [showDemoPreview, setShowDemoPreview] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activePhotos = gallery.photos.length > 0
    ? gallery.photos
    : showDemoPreview
    ? DEMO_GALLERY_PHOTOS
    : [];

  const handleOpenPhoto = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="memories" className={`scroll-mt-24 ${className}`} aria-labelledby="memories-heading">
      <div className="royal-card-frame">
        <div className="royal-inner-border" />

        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#B08D57] block mb-1">
            Glimpses of Love
          </span>
          <h3 id="memories-heading" className="text-3xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            Family Photo Gallery
          </h3>
          <p className="text-sm text-[#6F5A48] max-w-md mx-auto mb-4">
            Capturing the smiles, sacred moments, and blessed beginnings of our little girl.
          </p>

          <OrnamentalDivider className="my-2" />

          {activePhotos.length > 0 ? (
            <div className="my-8">
              {showDemoPreview && gallery.photos.length === 0 && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-[#F3DDE2] border border-[#B08D57]/40 rounded-full text-xs text-[#81532F]">
                  <span>Demonstrating gallery layout (Add real photos anytime in src/data/ceremony.ts)</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {activePhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => handleOpenPhoto(index)}
                    className="group relative rounded-2xl overflow-hidden border border-[#B08D57]/30 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#FFFAF5]">
                      <img
                        src={photo.url}
                        alt={photo.altText}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="text-white text-left">
                        <p className="text-xs font-serif line-clamp-1 text-[#E8D6B8]">
                          {photo.caption}
                        </p>
                        <span className="text-[10px] text-white/80 inline-flex items-center gap-1 mt-0.5">
                          <Eye className="w-3 h-3" /> View Photo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Tasteful Placeholder state when no photos are provided yet */
            <div className="my-8 p-8 rounded-2xl bg-white/60 border border-[#B08D57]/25 text-center">
              <div className="w-14 h-14 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center text-[#81532F] mb-4">
                <Camera className="w-7 h-7 text-[#81532F]" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#81532F] mb-1">
                Memories in the Making
              </h4>
              <p className="text-sm text-[#6F5A48] max-w-md mx-auto leading-relaxed mb-4">
                {gallery.placeholderMessage}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFAF5] border border-[#B08D57]/30 text-xs text-[#8E7A69]">
                <ImageIcon className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Photos can be configured anytime in <code>src/data/ceremony.ts</code></span>
              </div>

              {/* Optional Demo Preview Toggle button */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setShowDemoPreview(true)}
                  className="btn-secondary text-xs py-1.5 px-3.5"
                  aria-label="Preview gallery frame design"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Gallery & Lightbox Layout</span>
                </button>
              </div>
            </div>
          )}

          {showDemoPreview && (
            <button
              type="button"
              onClick={() => setShowDemoPreview(false)}
              className="text-xs text-[#8E7A69] underline hover:text-[#81532F] mt-2 block mx-auto"
            >
              Hide Demo Preview
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={activePhotos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activePhotos.length - 1))}
        onNext={() => setCurrentIndex((prev) => (prev < activePhotos.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
};
