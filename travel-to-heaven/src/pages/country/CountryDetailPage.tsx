import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Compass, MapPin, Globe, Coins, Languages, Calendar, Users,
  Search, ArrowRight, ExternalLink, CloudSun, Utensils, Star,
  Heart
} from 'lucide-react';
import { countryService, type CountryInfo } from '@/services/country.service';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useTravel } from '@/context/TravelContext';
import { cn, setPageTitle } from '@/lib/utils';

export const CountryDetailPage: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const { isDestinationFavorite, toggleFavoriteDestination } = useTravel();

  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    const fetchCountry = async () => {
      if (!countryName) return;
      setIsLoading(true);
      try {
        const data = await countryService.getCountryByName(countryName);
        if (data) {
          setCountry(data);
          setPageTitle(`Explore ${data.name} ${data.flag} — Travel to Heaven`);
        } else {
          // Fallback to Japan if not found
          const fallback = await countryService.getCountryByName('japan');
          setCountry(fallback);
          if (fallback) setPageTitle(`Explore ${fallback.name} ${fallback.flag}`);
        }
      } catch (err) {
        console.error('Failed to load country', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [countryName]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/country/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
      setSearchQuery('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner size="lg" label="Discovering country details..." />
        <p className="text-sm text-slate-500 font-medium">Gathering geographic facts, weather, and destinations...</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Globe className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Country not found</h2>
        <p className="text-slate-600">We couldn't retrieve information for this destination.</p>
        <Link to="/" className="inline-block px-6 py-2.5 rounded-full bg-teal-500 text-slate-950 font-bold text-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  const filteredDestinations = country.destinations.filter((dest) => {
    if (activeCategory === 'ALL') return true;
    return dest.category.toUpperCase() === activeCategory.toUpperCase();
  });

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero Banner with Country Photo, Name & Flag */}
      <section className="relative min-h-137.5 w-full flex items-end overflow-hidden">
        <img
          src={country.heroImage}
          alt={country.name}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90 saturate-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.15),transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-6">
          {/* Top Country Search Bar Overlay */}
          <div className="max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search another country (e.g. Sri Lanka, Italy, France)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm rounded-full pl-11 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-xl"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-teal-300 text-xs font-bold uppercase tracking-widest">
              <span>{country.region} • {country.subregion}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none flex items-center gap-3">
              <span>EXPLORE {country.name.toUpperCase()}</span>
              <span className="text-4xl sm:text-6xl">{country.flag}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl font-light leading-relaxed">
              {country.introduction}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/15">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> Capital
              </div>
              <p className="font-bold text-sm text-slate-100 mt-1 truncate">{country.capital}</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <Languages className="w-3.5 h-3.5" /> Languages
              </div>
              <p className="font-bold text-sm text-slate-100 mt-1 truncate">{country.languages[0]}</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <Coins className="w-3.5 h-3.5" /> Currency
              </div>
              <p className="font-bold text-sm text-slate-100 mt-1 truncate">
                {country.currency.code} ({country.currency.symbol})
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> Best Season
              </div>
              <p className="font-bold text-sm text-slate-100 mt-1 truncate">Spring / Autumn</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Population
              </div>
              <p className="font-bold text-sm text-slate-100 mt-1 truncate">
                {(country.population / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-white">
              <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" /> Plan Trip
              </div>
              <Link
                to="/trips"
                className="font-bold text-xs text-teal-300 hover:underline mt-1 inline-flex items-center gap-1"
              >
                Create Route <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. About the Country & Weather Guide */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-[#0c1e28] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-1 bg-teal-500 rounded-full" />
              <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                About {country.name}
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {country.introduction}
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Cultural & Travel Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {country.culturalHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weather & Climate Overview */}
          <div className="lg:col-span-5 bg-linear-to-br from-teal-950 to-slate-950 rounded-3xl p-6 sm:p-8 border border-teal-500/20 shadow-xl text-white space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-400/20 text-teal-300">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Climate & Best Time to Visit</h3>
                <p className="text-xs text-teal-300/80">Reliable travel season guidelines</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
                  Optimal Travel Months
                </span>
                <p className="font-semibold text-white">{country.bestTimeToVisit}</p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {country.weatherOverview}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Popular Destinations within this Country */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-1 bg-teal-500 rounded-full" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Popular Destinations in {country.name}
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Explore recommended attractions, natural wonders, and historic sites
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['ALL', 'CULTURAL', 'HISTORICAL', 'MOUNTAIN', 'CITY', 'FOOD', 'ROMANTIC'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border',
                    activeCategory === cat
                      ? 'bg-teal-500 text-slate-950 border-teal-500 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400'
                  )}
                >
                  {cat === 'ALL' ? 'All Places' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const isFav = isDestinationFavorite(dest.id);
              return (
                <div
                  key={dest.id}
                  className="group bg-white dark:bg-[#0c1e28] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.coverImageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                      {dest.category}
                    </span>

                    <button
                      onClick={() => toggleFavoriteDestination(dest.id)}
                      className={cn(
                        'absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer border',
                        isFav
                          ? 'bg-rose-500 text-white border-rose-400 scale-105'
                          : 'bg-slate-900/60 text-white border-white/20 hover:bg-rose-600'
                      )}
                      aria-label="Toggle favorite"
                    >
                      <Heart className={cn('w-4 h-4', isFav && 'fill-white')} />
                    </button>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-400" />
                          {dest.city}, {dest.country}
                        </span>
                        <div className="flex items-center gap-1 text-amber-300 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{dest.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-3 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {dest.bestTimeToVisit ? `Best: ${dest.bestTimeToVisit.split('&')[0]}` : 'Year-round'}
                      </span>
                      <Link
                        to={`/destinations/${dest.id}`}
                        className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group-hover:scale-105"
                      >
                        <span>Explore Place</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Traditional Food & Local Culinary Experiences */}
        {country.traditionalFood && country.traditionalFood.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-1 bg-amber-500 rounded-full" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-500" />
                  Food & Local Culinary Experiences in {country.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                  Authentic heritage dishes, street food flavors, and regional specialties to sample
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.traditionalFood.map((food, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0c1e28] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-md flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">{food.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {food.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Google Redirect Research Bar for Country Details */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-teal-400">
            <Search className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold">Research {country.name} on Google</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl font-light">
            Need current visa regulations, health guidelines, or transport pass pricing? Use these quick Google search shortcuts:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {[
              `Current Visa Requirements for ${country.name}`,
              `Best Travel SIM card in ${country.name}`,
              `Public Transport Pass in ${country.capital}`,
              `Safety and Travel Advisories for ${country.name}`,
              `Top 10 Hidden Gem Attractions in ${country.name}`,
            ].map((query, idx) => (
              <a
                key={idx}
                href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-white/15"
              >
                <span>{query}</span>
                <ExternalLink className="w-3 h-3 text-teal-400" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CountryDetailPage;
