import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  reviewsCount,
  interactive = false,
  onRate,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, idx) => {
          const starValue = idx + 1;
          const isFilled = rating >= starValue;
          const isHalf = rating > idx && rating < starValue;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate && onRate(starValue)}
              className={cn(
                'focus:outline-none transition-transform',
                interactive && 'cursor-pointer hover:scale-110'
              )}
              aria-label={`Rate ${starValue} out of ${maxRating}`}
            >
              <Star
                className={cn(
                  iconSizes[size],
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-300 fill-slate-100'
                )}
              />
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-slate-700 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
