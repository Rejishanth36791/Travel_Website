import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import type { Destination, DestinationCategory } from '@/types/destination.types';
import { homeService } from '@/services/home.service';
import { DestinationCard, DestinationCardSkeleton } from '@/components/destination/DestinationCard';
import { Pagination } from '@/components/common/Pagination';
import { FilterPanel } from '@/components/common/FilterPanel';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 12;

export const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter/Sort state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | ''>((searchParams.get('category') || '') as DestinationCategory | '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  const debouncedQuery = useDebounce(searchQuery, 350);

  useEffect(() => {
    setPageTitle('All Destinations');
  }, []);

  // Load destinations (in production this calls the API with params)
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await homeService.getFeaturedDestinations();
        setAllDestinations(data);
      } catch {
        setError('Unable to load destinations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
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
    let result = [...allDestinations];

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
  }, [allDestinations, debouncedQuery, selectedCategory, selectedCountry, minRating, sortBy]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Destinations Catalog
        </h1>
        <p className="text-slate-600 text-sm">
          Browse, search and filter {filteredDestinations.length.toLocaleString()} global destinations with server-side pagination.
        </p>
      </header>

      {/* Search + Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations, countries, cities..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Button (mobile) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-medium flex items-center gap-2 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-3 transition-colors cursor-pointer',
                viewMode === 'grid' ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50'
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-3 transition-colors cursor-pointer',
                viewMode === 'list' ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50'
              )}
              aria-label="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid: Filter Sidebar + Results */}
      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <FilterPanel
            isOpen={true}
            onClose={() => {}}
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
        </div>

        {/* Mobile Filter Drawer */}
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

        {/* Results Area */}
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
              title="No destinations found"
              description="Try adjusting your filters or search query to discover new places."
              action={
                <button
                  onClick={handleClearAll}
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors cursor-pointer"
                >
                  Clear Filters
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
                    destination={dest}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="pt-4"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
