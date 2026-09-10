import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Star } from 'lucide-react';
import type { Destination } from '@/types/destination.types';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  variant?: 'default' | 'compact' | 'horizontal';
  onToggleFavorite?: (id: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  variant = 'default',
  onToggleFavorite,
}) => {
  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(destination.id);
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/destinations/${destination.id}`}
        className="group flex gap-4 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-lg transition-all overflow-hidden"
      >
        <div className="relative w-40 h-32 shrink-0 overflow-hidden">
          <img
            src={destination.coverImageUrl}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center py-3 pr-4 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600">
            {destination.category}
          </span>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
            {destination.name}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {destination.city}, {destination.country}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-slate-700">{destination.rating.toFixed(1)}</span>
            <span className="text-slate-400">({destination.reviewsCount})</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/destinations/${destination.id}`}
        className="group relative h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <img
          src={destination.coverImageUrl}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-300">
            {destination.country}
          </p>
          <h4 className="text-sm font-bold line-clamp-1">{destination.name}</h4>
        </div>
      </Link>
    );
  }

  // Default variant — tall immersive card
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group relative h-[380px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between p-5 text-white"
    >
      <img
        src={destination.coverImageUrl}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      {/* Top: Category + Favorite */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white">
          {destination.category}
        </span>
        <button
          onClick={handleFavClick}
          className={cn(
            'p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer',
            destination.isFavorite
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-black/30 hover:bg-black/60 text-white border-white/20'
          )}
          aria-label={destination.isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={cn('w-4 h-4', destination.isFavorite && 'fill-white')} />
        </button>
      </div>

      {/* Bottom: Info */}
      <div className="relative z-10 space-y-2">
        <p className="text-xs text-sky-300 font-semibold tracking-widest uppercase flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" /> {destination.city}, {destination.country}
        </p>
        <h3 className="font-serif text-xl font-bold text-white group-hover:text-sky-200 transition-colors line-clamp-2">
          {destination.name}
        </h3>
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-white">{destination.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-300">({destination.reviewsCount.toLocaleString()})</span>
          </div>
          <span className="text-xs font-semibold text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all">
            Explore ↗
          </span>
        </div>
      </div>
    </Link>
  );
};

// Skeleton loading card
export const DestinationCardSkeleton: React.FC<{ variant?: 'default' | 'compact' }> = ({ variant = 'default' }) => {
  return (
    <div
      className={cn(
        'rounded-3xl bg-slate-200 skeleton-shimmer',
        variant === 'default' ? 'h-[380px]' : 'h-56'
      )}
      aria-hidden="true"
    />
  );
};
