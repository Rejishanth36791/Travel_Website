import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import { Search, SlidersHorizontal, Grid3X3, LayoutList, PlusCircle, Check, X, Sparkles, MapPin } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import type { DestinationCategory } from '@/types/destination.types';
import { DestinationCard, DestinationCardSkeleton } from '@/components/destination/DestinationCard';
import { Pagination } from '@/components/common/Pagination';
import { FilterPanel } from '@/components/common/FilterPanel';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

import { useTravel } from '@/context/TravelContext';

const PAGE_SIZE = 12;

export const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { destinations, addDestination, isDestinationFavorite, toggleFavoriteDestination } = useTravel();

  // State
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Destination Form State
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCategory, setNewCategory] = useState<DestinationCategory>('Romantic');
  const [newRegion, setNewRegion] = useState('');
  const [newBestSeason, setNewBestSeason] = useState('May to October');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCountry.trim() || !newDescription.trim()) return;

    const fallbackImages = [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    ];

    const img = newImageUrl.trim() || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    addDestination({
      name: newName.trim(),
      country: newCountry.trim(),
      city: newCity.trim() || newName.trim(),
      region: newRegion.trim() || newCountry.trim(),
      category: newCategory,
      description: newDescription.trim(),
      bestTimeToVisit: newBestSeason,
      coverImageUrl: img,
      images: [{ id: `img-${Date.now()}`, url: img, isPrimary: true, caption: newName.trim() }],
      coordinates: { latitude: 35.0, longitude: 25.0 },
    });

    setNewName('');
    setNewCountry('');
    setNewCity('');
    setNewRegion('');
    setNewImageUrl('');
    setNewDescription('');
    setShowAddModal(false);

    setToastMessage(`"${newName.trim()}" was successfully added to places!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter/Sort state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | ''>((searchParams.get('category') || '') as DestinationCategory | '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  const debouncedQuery = useDebounce(searchQuery, 350);

  useEffect(() => {
    setPageTitle('All Destinations — Travel to Heaven');
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedQuery) params.query = debouncedQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedCountry) params.country = selectedCountry;
    if (minRating > 0) params.rating = String(minRating);
    if (sortBy !== 'popularity') params.sort = sortBy;
    if (currentPage > 1) params.page = String(currentPage);
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, selectedCategory, selectedCountry, minRating, sortBy, currentPage, setSearchParams]);

  // Client-side filter/sort (in production this is API-side)
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (selectedCountry) {
      result = result.filter((d) => d.country === selectedCountry);
    }

    if (minRating > 0) {
      result = result.filter((d) => d.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popularity — sort by reviews count
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [destinations, debouncedQuery, selectedCategory, selectedCountry, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / PAGE_SIZE));
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCountry('');
    setMinRating(0);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold backdrop-blur-md border border-sky-400/20">
            <span>🌎 Explore the Globe</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Destinations Catalog
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover breathtaking wonders, vibrant cities, and hidden gems. Search, filter, and plan your next journey across the world.
          </p>
        </div>
      </div>

      {/* Search Bar & View Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by destination name, country, or city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-200/80 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Button (mobile trigger) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {(selectedCategory || selectedCountry || minRating > 0) && (
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              )}
            </button>

            {/* Suggest a Place Button */}
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => setShowAddModal(true)}
              className="whitespace-nowrap"
            >
              Suggest a Place
            </Button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-lg transition-all cursor-pointer',
                  viewMode === 'grid' ? 'bg-white text-sky-600 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-lg transition-all cursor-pointer',
                  viewMode === 'list' ? 'bg-white text-sky-600 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                )}
                aria-label="List view"
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Metadata & Active Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-900">{filteredDestinations.length}</span> destinations
          </div>
          {(selectedCategory || selectedCountry || minRating > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-medium text-slate-400 mr-1">Active:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-medium border border-sky-200/60">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="hover:text-sky-900 cursor-pointer">×</button>
                </span>
              )}
              {selectedCountry && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
                  {selectedCountry}
                  <button onClick={() => setSelectedCountry('')} className="hover:text-emerald-900 cursor-pointer">×</button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-200/60">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)} className="hover:text-amber-900 cursor-pointer">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-slate-900 cursor-pointer">×</button>
                </span>
              )}
              <button
                onClick={handleClearAll}
                className="text-rose-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Layout: Filter Sidebar + Results */}
      <div className="flex gap-8">
        {/* Unified Responsive FilterPanel */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
          selectedCountry={selectedCountry}
          onCountryChange={(c) => { setSelectedCountry(c); setCurrentPage(1); }}
          minRating={minRating}
          onMinRatingChange={(r) => { setMinRating(r); setCurrentPage(1); }}
          sortBy={sortBy}
          onSortChange={(s) => { setSortBy(s); setCurrentPage(1); }}
          onClearAll={handleClearAll}
        />

        {/* Results Grid */}
        <div className="flex-1 min-w-0 space-y-6">
          {isLoading ? (
            <div className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            )}>
              {Array.from({ length: 6 }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          ) : paginatedDestinations.length === 0 ? (
            <EmptyState
              title="No destinations match your search"
              description="Try changing your filters or searching for another location."
              action={
                <button
                  onClick={handleClearAll}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              }
            />
          ) : (
            <>
              <div className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              )}>
                {paginatedDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={{
                      ...dest,
                      isFavorite: isDestinationFavorite(dest.id),
                    }}
                    onToggleFavorite={toggleFavoriteDestination}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="pt-6"
              />
            </>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up text-sm font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Suggest / Add Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Suggest a Destination</h3>
                  <p className="text-xs text-slate-500">Contribute a new wonder or hidden gem to explore</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDestination} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hallstatt Alpine Village"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Austria"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City / Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Hallstatt"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category Vibe</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as DestinationCategory)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="Romantic">Romantic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Mountain">Mountain</option>
                    <option value="Beach">Beach</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Best Season</label>
                  <input
                    type="text"
                    placeholder="e.g. May – October"
                    value={newBestSeason}
                    onChange={(e) => setNewBestSeason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cover Photo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Overview & Description</label>
                <textarea
                  rows={3}
                  placeholder="What makes this place special? Describe the views, atmosphere, and reasons travelers should visit..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <Button variant="primary" size="sm" type="submit" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                  Add Destination
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
