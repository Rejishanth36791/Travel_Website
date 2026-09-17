import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Filter, Check, Star } from 'lucide-react';
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
  const activeCount = (selectedCategory ? 1 : 0) + (selectedCountry ? 1 : 0) + (minRating > 0 ? 1 : 0) + (sortBy !== 'popularity' ? 1 : 0);

  const panelContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Filters & Sort</h3>
            <p className="text-xs text-slate-500 font-medium">Refine your exploration</p>
          </div>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset ({activeCount})
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-2.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sort Destinations</label>
        <div className="grid grid-cols-2 gap-1.5">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = sortBy === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  'px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left flex items-center justify-between cursor-pointer',
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-600/20 font-semibold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category</label>
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange('')}
              className="text-[11px] text-sky-600 font-semibold hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isSelected ? '' : cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:border-slate-400 hover:text-slate-900'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Country Filter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Country</label>
          {selectedCountry && (
            <button
              onClick={() => onCountryChange('')}
              className="text-[11px] text-sky-600 font-semibold hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
          {COUNTRIES.map((country) => {
            const isSelected = selectedCountry === country;
            return (
              <button
                key={country}
                onClick={() => onCountryChange(isSelected ? '' : country)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'bg-sky-700 text-white shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:border-slate-400 hover:text-slate-900'
                )}
              >
                {country}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-2.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Minimum Rating</label>
        <div className="flex items-center gap-1.5">
          {[0, 3, 3.5, 4, 4.5].map((r) => {
            const isSelected = minRating === r;
            return (
              <button
                key={r}
                onClick={() => onMinRatingChange(isSelected && r > 0 ? 0 : r)}
                className={cn(
                  'flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer',
                  isSelected && r > 0
                    ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/20'
                    : isSelected && r === 0
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:border-slate-300'
                )}
              >
                {r > 0 && <Star className="w-3 h-3 fill-current text-amber-300 shrink-0" />}
                {r === 0 ? 'Any' : `${r}+`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-24 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
        {panelContent}
      </aside>

      {/* Mobile Drawer Slide-over */}
      <div className="lg:hidden">
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity"
            onClick={onClose}
          />
        )}

        {/* Drawer Panel */}
        <div
          className={cn(
            'fixed inset-y-0 right-0 w-85 max-w-[85vw] bg-white z-50 p-6 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out border-l border-slate-200',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-sky-600" />
              <h2 className="font-bold text-slate-900 text-base">Filter & Sort</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {panelContent}

          {/* Apply Mobile Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={onClose}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-2xl shadow-md transition-colors cursor-pointer text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
