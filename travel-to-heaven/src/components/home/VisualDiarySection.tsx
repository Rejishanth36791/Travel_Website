import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play, Camera } from 'lucide-react';
import { homeService, type VisualDiaryItem } from '@/services/home.service';

export const VisualDiarySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Italy');
  const [items, setItems] = useState<VisualDiaryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const filters = ['Italy', 'Dubai', 'London', 'Berlin', 'Rome', 'Lisbon', 'India', 'China', 'Japan'];

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const data = await homeService.getVisualDiaryItems(activeFilter);
        setItems(data);
        setActiveIndex(0);
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [activeFilter]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % (items.length || 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + (items.length || 1)) % (items.length || 1));
  };

  return (
    <section className="py-20 bg-white rounded-3xl my-8 border border-slate-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-8">
        {/* Header (Image 1 exact wording style) */}
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            GALLERY
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            My Visual Diary
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See the world through my lens: adventures in photos and videos
          </p>
        </div>

        {/* Pill-shaped Location Filters (Image 1 exact design) */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 pt-2">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            );
          })}
          <button className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
            <span>View More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3D Overlapping Card Slider Container (Image 1 exact design) */}
        <div className="relative py-10 min-h-[440px] flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <div className="w-80 h-96 bg-slate-100 rounded-3xl animate-pulse" />
          ) : items.length === 0 ? (
            <p className="text-slate-400 text-sm">No photos found for {activeFilter}</p>
          ) : (
            <div className="relative w-full max-w-5xl flex items-center justify-center gap-4 sm:gap-6">
              {items.map((item, idx) => {
                // Calculate position relative to active index
                const offset = (idx - activeIndex + items.length) % items.length;

                // Only render active, 1 previous, 1 next, 2 next
                if (offset !== 0 && offset !== 1 && offset !== items.length - 1 && offset !== 2) {
                  return null;
                }

                const isCenter = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === items.length - 1;

                let cardStyles = 'scale-90 opacity-40 blur-[1px] hidden md:block';
                let zIndex = 'z-0';

                if (isCenter) {
                  cardStyles = 'scale-105 opacity-100 shadow-2xl z-30';
                  zIndex = 'z-30';
                } else if (isNext || isPrev) {
                  cardStyles = 'scale-95 opacity-80 shadow-lg z-10 hidden sm:block';
                  zIndex = 'z-10';
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-72 sm:w-80 h-[380px] sm:h-[440px] rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer ${cardStyles} ${zIndex}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Media Type Icon Badge */}
                    {item.isVideo && (
                      <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    )}

                    {!item.isVideo && isCenter && (
                      <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-xs">
                        <Camera className="w-4 h-4" />
                      </div>
                    )}

                    {/* Title overlay */}
                    <div className="absolute bottom-5 left-5 right-14 text-left text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                        {item.location}, {item.country}
                      </p>
                      <h4 className="text-base font-bold font-serif line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Carousel Arrows (Image 1 exact design) */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-800 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            aria-label="Previous photo"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-800 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            aria-label="Next photo"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
