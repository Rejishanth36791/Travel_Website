import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { DestinationCategory } from '@/types/destination.types';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: DestinationCategory | '';
  onCategoryChange: (cat: DestinationCategory | '') => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
}

const CATEGORIES: DestinationCategory[] = [
  'Beach', 'Mountain', 'City', 'Nature', 'Adventure',
  'Historical', 'Cultural', 'Wildlife', 'Food', 'Luxury',
  'Budget', 'Family', 'Romantic',
];

const COUNTRIES = [
  'Italy', 'Japan', 'Greece', 'Spain', 'USA', 'Morocco',
  'France', 'Thailand', 'Australia', 'Peru', 'India', 'Iceland',
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name A-Z' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
  onClearAll,
}) => {
  const hasActiveFilters = selectedCategory || selectedCountry || minRating > 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'bg-white border border-slate-200 rounded-3xl shadow-lg p-6 space-y-6 transition-all duration-300',
          'fixed inset-y-0 right-0 w-80 z-50 lg:relative lg:inset-auto lg:z-auto lg:w-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">Filters & Sort</h3>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sort By</label>
          <div className="grid grid-cols-2 gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  'px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
                  sortBy === opt.value
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(selectedCategory === cat ? '' : cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-400'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Country</label>
          <div className="flex flex-wrap gap-1.5">
            {COUNTRIES.map((country) => (
              <button
                key={country}
                onClick={() => onCountryChange(selectedCountry === country ? '' : country)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer',
                  selectedCountry === country
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-400'
                )}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Min Rating */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Minimum Rating</label>
          <div className="flex items-center gap-2">
            {[0, 3, 3.5, 4, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => onMinRatingChange(minRating === r ? 0 : r)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer',
                  minRating === r && r > 0
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-400'
                )}
              >
                {r === 0 ? 'Any' : `${r}+`}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
