import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import {
  Compass, Palmtree, Mountain, Building2, TreePine, Bike,
  Landmark, Theater, PawPrint, UtensilsCrossed, Gem, Wallet,
  HeartHandshake, ArrowUpRight, Sparkles, Heart, Search,
  Bookmark, MapPin, Star, Plus, Check, X, Layers, Flame
} from 'lucide-react';
import { useTravel } from '@/context/TravelContext';
import type { Destination, DestinationCategory } from '@/types/destination.types';
import { cn } from '@/lib/utils';

interface VisualCategory {
  name: DestinationCategory;
  tagline: string;
  image: string;
  icon: React.ElementType;
  gradient: string;
  count: number;
}

const VISUAL_CATEGORIES: VisualCategory[] = [
  {
    name: 'Beach',
    tagline: 'Turquoise Waters & Palms',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    icon: Palmtree,
    gradient: 'from-cyan-900/80 via-cyan-950/40 to-transparent',
    count: 24,
  },
  {
    name: 'Mountain',
    tagline: 'Alpine Peaks & Fjords',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    icon: Mountain,
    gradient: 'from-emerald-900/80 via-teal-950/40 to-transparent',
    count: 18,
  },
  {
    name: 'City',
    tagline: 'Neon Skylines & Culture',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    icon: Building2,
    gradient: 'from-indigo-900/80 via-slate-950/40 to-transparent',
    count: 32,
  },
  {
    name: 'Nature',
    tagline: 'Rainforests & Waterfalls',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    icon: TreePine,
    gradient: 'from-green-900/80 via-emerald-950/40 to-transparent',
    count: 19,
  },
  {
    name: 'Adventure',
    tagline: 'Expeditions & Trails',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80',
    icon: Bike,
    gradient: 'from-orange-900/80 via-amber-950/40 to-transparent',
    count: 15,
  },
  {
    name: 'Historical',
    tagline: 'Ancient Temples & Ruins',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    icon: Landmark,
    gradient: 'from-amber-900/80 via-stone-950/40 to-transparent',
    count: 22,
  },
  {
    name: 'Cultural',
    tagline: 'Local Heritage & Arts',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    icon: Theater,
    gradient: 'from-rose-900/80 via-pink-950/40 to-transparent',
    count: 27,
  },
  {
    name: 'Wildlife',
    tagline: 'Safaris & Ocean Life',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    icon: PawPrint,
    gradient: 'from-yellow-900/80 via-amber-950/40 to-transparent',
    count: 11,
  },
  {
    name: 'Food',
    tagline: 'Gourmet Routes & Markets',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    icon: UtensilsCrossed,
    gradient: 'from-red-900/80 via-orange-950/40 to-transparent',
    count: 16,
  },
  {
    name: 'Luxury',
    tagline: 'Overwater Villas & Spa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    icon: Gem,
    gradient: 'from-purple-900/80 via-fuchsia-950/40 to-transparent',
    count: 14,
  },
  {
    name: 'Budget',
    tagline: 'Backpacker Secrets',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80',
    icon: Wallet,
    gradient: 'from-teal-900/80 via-slate-950/40 to-transparent',
    count: 20,
  },
  {
    name: 'Romantic',
    tagline: 'Sunsets & Honeymoons',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    icon: HeartHandshake,
    gradient: 'from-pink-900/80 via-rose-950/40 to-transparent',
    count: 21,
  },
];

const MOOD_FILTERS = [
  { id: 'all', label: '🔥 All Pins', icon: Flame },
  { id: 'Beach', label: '🏝️ Tropical Coastal', icon: Palmtree },
  { id: 'Mountain', label: '🏔️ Alpine & Fjords', icon: Mountain },
  { id: 'City', label: '🌆 Urban Skylines', icon: Building2 },
  { id: 'Nature', label: '🌿 Wild Nature', icon: TreePine },
  { id: 'Cultural', label: '⛩️ Sacred Heritage', icon: Landmark },
  { id: 'Luxury', label: '💎 Luxury Retreats', icon: Gem },
];

const MOODBOARDS = [
  {
    id: 'board-1',
    title: 'Turquoise Lagoons & Coastal Cliffs',
    subtitle: '18 Saved Places',
    cover: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Beach',
  },
  {
    id: 'board-2',
    title: 'Ancient Zen Temples & Sacred Forests',
    subtitle: '24 Saved Places',
    cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cultural',
  },
  {
    id: 'board-3',
    title: 'Majestic Peaks & Glacier Valleys',
    subtitle: '15 Saved Places',
    cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Mountain',
  },
];

export const DiscoverPage: React.FC = () => {
  const {
    destinations,
    isDestinationFavorite,
    toggleFavoriteDestination,
    collections,
    addDestinationToCollection,
  } = useTravel();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMood, setActiveMood] = useState('all');
  const [saveModalDest, setSaveModalDest] = useState<Destination | null>(null);
  const [addedCollectionId, setAddedCollectionId] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Discover Visual Travel Inspiration — Travel to Heaven');
  }, []);

  // Filtered pins
  const filteredPins = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        !searchQuery ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMood = activeMood === 'all' || dest.category === activeMood;

      return matchesSearch && matchesMood;
    });
  }, [destinations, searchQuery, activeMood]);

  const handleSaveToCollection = (collectionId: string) => {
    if (saveModalDest) {
      addDestinationToCollection(collectionId, saveModalDest);
      setAddedCollectionId(collectionId);
      setTimeout(() => {
        setAddedCollectionId(null);
        setSaveModalDest(null);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Pinterest Hero Header */}
      <div className="relative overflow-hidden bg-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pinterest-Inspired Travel Discovery</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover Your Next Escape
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Explore world destinations through visual moodboards, traveler pins, and curated aesthetics. Bookmark locations directly to your boards.
          </p>

          {/* Interactive Pinterest Search Pill */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-sky-400">
              <Search className="w-5 h-5 text-slate-300 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search pins, countries, beaches, mountains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-slate-100 text-sm px-4 py-2 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-white mr-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Mood Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {MOOD_FILTERS.map((mood) => {
              const isSelected = activeMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400/50 font-semibold'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                  )}
                >
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-10">
        {/* 2. Visual Categories Carousel / Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-extrabold text-slate-900 tracking-tight">
                Explore by Vibe & Category
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Tap a moodboard to view all destinations matching that travel style
              </p>
            </div>
            <Link
              to="/destinations"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group bg-sky-50 hover:bg-sky-100/80 px-3.5 py-2 rounded-xl transition-colors"
            >
              Catalog View <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {VISUAL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/destinations?category=${cat.name}`}
                  className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/60"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className={cn('absolute inset-0 bg-linear-to-t', cat.gradient)} />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

                  <div className="relative h-full p-3.5 flex flex-col justify-between text-white z-10">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/60 text-slate-200 backdrop-blur-md">
                        {cat.count} spots
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base text-white leading-tight group-hover:text-sky-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-300 line-clamp-1 font-medium mt-0.5">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Pinterest Moodboards / Showcase Boards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-slate-900 tracking-tight">
                  Curated Travel Moodboards
                </h2>
                <p className="text-xs text-slate-500 font-medium">Hand-crafted visual pinboards by top globetrotters</p>
              </div>
            </div>
            <Link
              to="/collections"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl transition-colors"
            >
              All Boards <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOODBOARDS.map((board) => (
              <Link
                key={board.id}
                to={`/destinations?category=${board.category}`}
                className="group bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                {/* Image Stack Collage */}
                <div className="grid grid-cols-3 gap-1.5 h-52 rounded-2xl overflow-hidden">
                  <div className="col-span-2 h-full overflow-hidden relative">
                    <img
                      src={board.cover}
                      alt={board.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-1.5 h-full">
                    <div className="overflow-hidden relative h-full">
                      <img
                        src={board.thumbs[0]}
                        alt="Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="overflow-hidden relative h-full">
                      <img
                        src={board.thumbs[1]}
                        alt="Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {board.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{board.subtitle}</p>
                  </div>
                  <div className="p-2 rounded-full bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-slate-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Pinterest Pin Explorer Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-slate-900 tracking-tight">
                  Discover Traveler Pins ({filteredPins.length})
                </h2>
                <p className="text-xs text-slate-500 font-medium">Click heart to favorite, or Save to add to your visual boards</p>
              </div>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Clear Search filter
              </button>
            )}
          </div>

          {filteredPins.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No pins found for "{searchQuery}"</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for another destination, country, or choosing a different travel mood pill above.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveMood('all'); }}
                className="px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Pinterest Masonry Card Layout */
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredPins.map((dest, idx) => {
                const isFav = isDestinationFavorite(dest.id);
                // Alternate aspect ratio heights for Pinterest visual feel
                const isTall = idx % 3 === 0;

                return (
                  <div
                    key={dest.id}
                    className="break-inside-avoid group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Pin Image */}
                    <div className={cn('relative w-full overflow-hidden bg-slate-100', isTall ? 'h-80' : 'h-64')}>
                      <img
                        src={dest.coverImageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide border border-white/10">
                          {dest.category}
                        </span>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavoriteDestination(dest.id);
                          }}
                          className={cn(
                            'p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md',
                            isFav
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-900/60 text-white hover:bg-rose-600 hover:scale-110'
                          )}
                          aria-label="Favorite pin"
                        >
                          <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
                        </button>
                      </div>

                      {/* Pinterest Red Save Action Overlay (visible on hover) */}
                      <div className="absolute top-3 right-14 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSaveModalDest(dest);
                          }}
                          className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                        >
                          <Bookmark className="w-3.5 h-3.5" /> Save
                        </button>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-3 inset-x-3 text-white z-10 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{dest.rating}</span>
                            <span className="text-slate-300 font-normal">({dest.reviewsCount})</span>
                          </div>
                          <span className="text-[11px] font-medium text-slate-300 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-sky-400" /> {dest.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pin Footer Content */}
                    <div className="p-4 space-y-2">
                      <Link to={`/destinations/${dest.id}`} className="block group/link">
                        <h3 className="font-serif font-bold text-base text-slate-900 group-hover/link:text-sky-600 transition-colors line-clamp-1">
                          {dest.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{dest.bestTimeToVisit}</span>
                        <Link
                          to={`/destinations/${dest.id}`}
                          className="text-sky-600 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Details <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* 5. Save to Collection Modal */}
      {saveModalDest && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-base">Save to Collection</h3>
              </div>
              <button
                onClick={() => setSaveModalDest(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Destination Preview */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <img
                src={saveModalDest.coverImageUrl}
                alt={saveModalDest.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{saveModalDest.name}</h4>
                <p className="text-xs text-slate-500">{saveModalDest.city}, {saveModalDest.country}</p>
              </div>
            </div>

            {/* Collection List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Board</label>
              {collections.map((col) => {
                const isAdded = addedCollectionId === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => handleSaveToCollection(col.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-2xl text-left border transition-all cursor-pointer',
                      isAdded
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800'
                    )}
                  >
                    <div>
                      <div className="font-bold text-xs">{col.name}</div>
                      <div className="text-[10px] text-slate-400">{(col.destinations?.length || col.itemsCount || 0)} items</div>
                    </div>
                    {isAdded ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                        <Check className="w-4 h-4" /> Saved!
                      </span>
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSaveModalDest(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
