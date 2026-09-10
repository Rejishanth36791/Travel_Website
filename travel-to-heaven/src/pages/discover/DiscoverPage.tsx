import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import {
  Compass, Palmtree, Mountain, Building2, TreePine, Bike,
  Landmark, Theater, PawPrint, UtensilsCrossed, Gem, Wallet,
  Baby, HeartHandshake, ArrowUpRight, Sparkles,
} from 'lucide-react';
import { homeService } from '@/services/home.service';
import type { Destination } from '@/types/destination.types';
import { DestinationCard, DestinationCardSkeleton } from '@/components/destination/DestinationCard';

interface CategoryItem {
  name: string;
  icon: React.ElementType;
  gradient: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Beach', icon: Palmtree, gradient: 'from-sky-500 to-cyan-400' },
  { name: 'Mountain', icon: Mountain, gradient: 'from-emerald-600 to-teal-500' },
  { name: 'City', icon: Building2, gradient: 'from-indigo-600 to-violet-500' },
  { name: 'Nature', icon: TreePine, gradient: 'from-green-600 to-lime-500' },
  { name: 'Adventure', icon: Bike, gradient: 'from-orange-500 to-amber-400' },
  { name: 'Historical', icon: Landmark, gradient: 'from-stone-600 to-amber-600' },
  { name: 'Cultural', icon: Theater, gradient: 'from-rose-600 to-pink-500' },
  { name: 'Wildlife', icon: PawPrint, gradient: 'from-yellow-600 to-amber-500' },
  { name: 'Food', icon: UtensilsCrossed, gradient: 'from-red-500 to-orange-400' },
  { name: 'Luxury', icon: Gem, gradient: 'from-purple-600 to-fuchsia-500' },
  { name: 'Budget', icon: Wallet, gradient: 'from-teal-500 to-emerald-400' },
  { name: 'Family', icon: Baby, gradient: 'from-blue-500 to-sky-400' },
  { name: 'Romantic', icon: HeartHandshake, gradient: 'from-pink-500 to-rose-400' },
];

export const DiscoverPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageTitle('Discover Destinations');
    const load = async () => {
      try {
        const data = await homeService.getFeaturedDestinations();
        setDestinations(data);
      } catch (err) {
        console.error('Failed to load discover destinations:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" /> Explore the World
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Discover Destinations
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Explore world destinations by categories, popularity, and unique travel styles. Find your next celestial escape.
        </p>
      </header>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Browse by Category</h2>
          <Link
            to="/destinations"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            View All <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/destinations?category=${cat.name}`}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-700 text-center">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Trending Now</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Popular Destinations</h2>
          </div>
          <Link
            to="/destinations"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            See All <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <DestinationCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </section>

      {/* Travel Styles Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-10 sm:p-14 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
          alt="Starry night sky mountains"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Your Style, Your Journey</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Find Destinations That Match Your Travel Style
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Whether you seek adrenaline-fueled adventures, cultural immersion, serene beach retreats, or culinary explorations — Travel to Heaven has the perfect destination for you.
          </p>
          <Link to="/destinations">
            <button className="mt-4 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-medium flex items-center gap-2 transition-all cursor-pointer">
              Explore All Destinations <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
