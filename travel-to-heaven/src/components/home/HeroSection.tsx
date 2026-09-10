import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { homeService, type HeroSlide } from '@/services/home.service';

export const HeroSection: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await homeService.getHeroSlides();
        setSlides(data);
      } catch (e) {
        console.error('Failed to load hero slides:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const currentSlide = slides[activeSlideIndex] || {
    title: 'Travel Beyond the Ordinary',
    subtitle: 'Explore extraordinary places, compare travel options, and uncover experiences that match your travel style.',
    location: 'Lake Braies, Dolomites',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    badge: 'Travel Beyond Expectations',
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % (slides.length || 1));
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1));
  };

  if (isLoading) {
    return (
      <div className="relative h-[85vh] min-h-[600px] w-full bg-slate-900 animate-pulse rounded-3xl overflow-hidden" />
    );
  }

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-950 text-white my-4">
      {/* Background Image with Dynamic Fade Transition */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <img
          src={currentSlide.imageUrl}
          alt={currentSlide.location}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Dark Radial Overlay matching Image 2 & Image 3 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between py-12">
        {/* Top Floating Glass Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-lg">
            <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
            <span>{currentSlide.badge}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest text-slate-300">
            <span className="text-white font-bold text-sm">0{activeSlideIndex + 1}</span> / 0{slides.length}
          </div>
        </div>

        {/* Hero Title & Description (Image 2 style: Serif + Italic Script Font mix) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
          <div className="lg:col-span-8 space-y-6 animate-slide-up">
            <div className="space-y-2">
              <span className="text-sky-300 font-medium text-sm tracking-widest uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-400" /> {currentSlide.location}, {currentSlide.country}
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                <span className="font-script block text-sky-200 text-5xl sm:text-7xl font-normal leading-tight">
                  {currentSlide.title}
                </span>
              </h1>
            </div>

            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-normal leading-relaxed drop-shadow-sm">
              {currentSlide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/discover">
                <button className="px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-medium text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-xl cursor-pointer">
                  <span>Explore Destinations</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Circular Destination Preview Selector (Image 2 exact style) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-3.5 pr-2">
            {slides.map((slide, index) => {
              const isActive = index === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(index)}
                  className={`flex items-center gap-3 p-1.5 pr-4 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-md border border-white/40 shadow-xl translate-x-0'
                      : 'bg-black/30 hover:bg-black/50 border border-white/10 opacity-70 hover:opacity-100 hover:translate-x-[-4px]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-transform duration-300 ${
                      isActive ? 'border-white scale-110 shadow-lg' : 'border-white/40'
                    }`}
                  >
                    <img src={slide.imageUrl} alt={slide.location} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {slide.location}
                    </p>
                    <p className="text-[10px] text-slate-300 font-medium">{slide.country}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Slide Navigation Arrows (Image 3 style) */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeSlideIndex ? 'w-8 bg-sky-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
