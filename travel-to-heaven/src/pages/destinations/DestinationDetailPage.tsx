import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import {
  MapPin, Heart, Star, Clock, Globe, Languages, Coins,
  Calendar, Camera, ArrowLeft, PlusCircle, Share2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { Destination } from '@/types/destination.types';
import { homeService } from '@/services/home.service';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { cn } from '@/lib/utils';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In production, this calls destinationService.getDestinationById(id)
        const all = await homeService.getFeaturedDestinations();
        const found = all.find((d) => d.id === id) || all[0];
        setDestination(found);
        setPageTitle(found.name);
      } catch {
        setError('Unable to load destination details.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading destination..." />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState message={error || 'Destination not found.'} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  // Build gallery images array
  const galleryImages = [
    { url: destination.coverImageUrl, caption: destination.name },
    ...(destination.images || []).map((img) => ({ url: img.url, caption: img.caption || '' })),
  ];

  const infoItems = [
    { icon: Calendar, label: 'Best Time', value: destination.bestTimeToVisit || 'Year-round' },
    { icon: Languages, label: 'Language', value: destination.language || 'Various' },
    { icon: Coins, label: 'Currency', value: destination.currency || 'Multiple' },
    { icon: Clock, label: 'Time Zone', value: destination.timeZone || 'Varies' },
    { icon: Star, label: 'Average Rating', value: destination.rating.toFixed(1) },
    { icon: Globe, label: 'Region', value: destination.region },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={galleryImages[activeImageIndex]?.url || destination.coverImageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Destinations
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              'p-3 rounded-full backdrop-blur-md border transition-all cursor-pointer',
              isFavorite
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
            )}
            aria-label="Toggle favorite"
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-white')} />
          </button>
          <button
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all cursor-pointer"
            aria-label="Share destination"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Arrows */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            <button
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/80 px-2">
              {activeImageIndex + 1} / {galleryImages.length}
            </span>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold tracking-wider uppercase text-white">
              {destination.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                {destination.city}, {destination.country}
              </span>
              <RatingStars rating={destination.rating} reviewsCount={destination.reviewsCount} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Add to Trip
          </Button>
          <Button variant="outline" leftIcon={<Heart className="w-4 h-4 text-rose-500" />}>
            Save Destination
          </Button>
          <Button variant="outline" leftIcon={<Camera className="w-4 h-4 text-sky-600" />}>
            View Photos
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column — Description */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900">Overview</h2>
              <p className="text-slate-700 leading-relaxed">{destination.description}</p>
              {destination.overview && (
                <p className="text-slate-600 leading-relaxed">{destination.overview}</p>
              )}
            </section>

            {/* History */}
            {destination.history && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Historical Significance</h2>
                <p className="text-slate-600 leading-relaxed">{destination.history}</p>
              </section>
            )}

            {/* Cultural Importance */}
            {destination.culturalImportance && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Cultural Importance</h2>
                <p className="text-slate-600 leading-relaxed">{destination.culturalImportance}</p>
              </section>
            )}

            {/* Natural Beauty */}
            {destination.naturalBeauty && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Natural Beauty</h2>
                <p className="text-slate-600 leading-relaxed">{destination.naturalBeauty}</p>
              </section>
            )}

            {/* Activities */}
            {destination.activities && destination.activities.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">Activities & Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-shadow space-y-2"
                    >
                      <h4 className="font-bold text-sm text-slate-900">{activity.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{activity.description}</p>
                      {activity.rating && (
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-slate-700">{activity.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column — Key Info Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-slate-900">Key Information</h3>

              <div className="space-y-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <Button variant="primary" className="w-full" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  Add to Trip
                </Button>
                <Button variant="outline" className="w-full" leftIcon={<Star className="w-4 h-4 text-amber-500" />}>
                  Write Review
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-lg h-64 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              <div className="text-center space-y-2">
                <MapPin className="w-8 h-8 mx-auto text-sky-400" />
                <p className="text-xs font-semibold text-slate-500">
                  {destination.coordinates.latitude.toFixed(4)}, {destination.coordinates.longitude.toFixed(4)}
                </p>
                <p className="text-[10px] text-slate-400">Interactive map available with Map API key</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
