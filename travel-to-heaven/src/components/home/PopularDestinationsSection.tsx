import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { homeService } from '@/services/home.service';
import type { Destination } from '@/types/destination.types';
import { RatingStars } from '@/components/common/RatingStars';

export const PopularDestinationsSection: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await homeService.getFeaturedDestinations();
        setDestinations(data);
      } catch (err) {
        console.error('Failed to load featured destinations:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDestinations();
  }, []);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 my-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              FEATURED SPOTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Popular Tours & Celestial Destinations
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Curated locations loved by global explorers for their natural beauty, history, and unique experiences.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 group"
          >
            <span>Explore All Places</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Card Grid (Image 3 & 4 style vertical cards) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => {
              const isFav = favorites[dest.id];
              return (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between p-6 text-white"
                >
                  {/* Background Image */}
                  <img
                    src={dest.coverImageUrl}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Bar: Category Tag & Heart */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-wider uppercase text-white">
                      {dest.category}
                    </span>
                    <button
                      onClick={(e) => toggleFav(dest.id, e)}
                      className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                        isFav
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-black/30 hover:bg-black/60 text-white border-white/20'
                      }`}
                      aria-label="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 space-y-2">
                    <p className="text-xs text-sky-300 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {dest.city}, {dest.country}
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-sky-200 transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <RatingStars rating={dest.rating} reviewsCount={dest.reviewsCount} size="sm" />
                      <span className="text-xs font-semibold text-white/80 group-hover:translate-x-1 transition-transform">
                        Details ↗
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
