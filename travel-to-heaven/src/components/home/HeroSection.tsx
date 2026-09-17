import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Play, Plane, MapPin, Building, Compass,
  Calendar, Users, ArrowUpDown, ChevronLeft, ChevronRight,
  ShieldCheck, Headphones, CalendarCheck, Lock, Star, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopularSpot {
  id: string;
  name: string;
  country: string;
  rating: number;
  image: string;
  destId: string;
}

const POPULAR_SPOTS: PopularSpot[] = [
  {
    id: 'spot-1',
    name: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    destId: 'dest-1',
  },
  {
    id: 'spot-2',
    name: 'Maldives',
    country: 'Indian Ocean',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
    destId: 'dest-4',
  },
  {
    id: 'spot-3',
    name: 'Swiss Alps',
    country: 'Switzerland',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    destId: 'dest-3',
  },
  {
    id: 'spot-4',
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    destId: 'dest-5',
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  // Booking Card State
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'experiences'>('flights');
  const [fromLocation, setFromLocation] = useState('New York (JFK)');
  const [toLocation, setToLocation] = useState('Bali, Indonesia');
  const [dates, setDates] = useState('May 20 – May 30');
  const [travelers, setTravelers] = useState('2 Adults');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [spotIndex, setSpotIndex] = useState(0);

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/destinations?query=${encodeURIComponent(toLocation.split(',')[0])}`);
  };

  const handleNextSpot = () => {
    setSpotIndex((prev) => (prev + 1) % POPULAR_SPOTS.length);
  };

  const handlePrevSpot = () => {
    setSpotIndex((prev) => (prev - 1 + POPULAR_SPOTS.length) % POPULAR_SPOTS.length);
  };

  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-950 text-white my-2 border border-emerald-950/40">
      {/* 1. Dramatic Island Landscape Background (Bali / Nusa Penida karst cliffs at sunset) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=85"
          alt="Tropical island sea cliffs and turquoise ocean at sunset"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-10000"
        />
        {/* Cinematic Atmospheric Vignettes & Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/50 to-slate-950/80" />
        <div className="absolute inset-0 bg-linear-to-t from-[#071318] via-transparent to-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.15),transparent_60%)]" />
      </div>

      {/* Dotted Flight Trajectory Line & Airplane Overlay */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M 120 420 Q 420 300, 560 200 T 800 240"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            d="M 540 480 Q 640 520, 680 620"
            stroke="rgba(45, 212, 191, 0.5)"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        </svg>

        {/* Airplane Icon along Path */}
        <div className="absolute top-[26%] left-[47%] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-white/10 p-2 rounded-full backdrop-blur-xs border border-white/20 shadow-lg">
          <Plane className="w-4 h-4 text-white" />
        </div>

        {/* Glowing Mint Location Pin in Ocean */}
        <div className="absolute top-[58%] left-[44%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-teal-400/30 animate-ping absolute" />
            <div className="w-7 h-7 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/50 relative z-10">
              <MapPin className="w-4 h-4 fill-slate-950" />
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-teal-300 text-[11px] font-bold border border-teal-400/30 shadow-md">
            Bali, Indonesia
          </span>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-12">
        {/* Top Hero Body: Left Typography + Right Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column: Heading & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 animate-slide-up">
            {/* Tagline with leading mint line */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-0.5 bg-teal-400 rounded-full" />
              <span className="text-teal-300 text-xs font-bold tracking-widest uppercase">
                THE WORLD IS WAITING
              </span>
            </div>

            {/* Massive Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Adventures <br />
              <span className="text-white">That Stay</span> <br />
              <span className="text-white">With You</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg max-w-lg font-normal leading-relaxed text-shadow-sm">
              Discover breathtaking destinations, unique experiences and unforgettable memories across the globe.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link to="/discover">
                <button className="px-7 py-3.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              {/* Watch Video Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 group cursor-pointer text-left"
              >
                <div className="w-11 h-11 rounded-full bg-white/15 group-hover:bg-white/25 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all group-hover:scale-110 shadow-md">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    Watch Video
                  </p>
                  <p className="text-xs text-slate-300 font-light">See Wanderlust in action</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: "Where to next?" Glassmorphism Booking Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#0c1e28]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5 text-white animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-white">Where to next?</h3>
                <p className="text-xs text-slate-300 font-medium">Find your perfect escape</p>
              </div>

              {/* Segmented Mode Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-black/30 rounded-2xl border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('flights')}
                  className={cn(
                    'py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                    activeTab === 'flights'
                      ? 'bg-white/20 text-teal-300 shadow-xs font-bold border border-white/10'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Flights</span>
                </button>
                <button
                  onClick={() => setActiveTab('hotels')}
                  className={cn(
                    'py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                    activeTab === 'hotels'
                      ? 'bg-white/20 text-teal-300 shadow-xs font-bold border border-white/10'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Hotels</span>
                </button>
                <button
                  onClick={() => setActiveTab('experiences')}
                  className={cn(
                    'py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                    activeTab === 'experiences'
                      ? 'bg-white/20 text-teal-300 shadow-xs font-bold border border-white/10'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Experiences</span>
                </button>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSearch} className="space-y-3">
                {/* From Field */}
                <div className="relative bg-black/40 border border-white/10 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block">From</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <input
                        type="text"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors ml-2 cursor-pointer"
                    title="Swap locations"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>

                {/* To Field */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block">To</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                    <input
                      type="text"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dates & Travelers Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-400" /> Dates
                    </span>
                    <input
                      type="text"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-white mt-1 focus:outline-none"
                    />
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3 text-teal-400" /> Travelers
                    </span>
                    <input
                      type="text"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-white mt-1 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] cursor-pointer mt-2"
                >
                  <span>
                    {activeTab === 'flights' ? 'Search Flights' : activeTab === 'hotels' ? 'Search Hotels' : 'Explore Experiences'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Popular Destinations Cards + Trust Guarantee Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-4 border-t border-white/10">
          {/* Left Column: Popular Destinations Mini Cards Carousel */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-lg text-white">Popular Destinations</span>
                <Link to="/destinations" className="text-xs font-semibold text-teal-300 hover:underline">
                  View all
                </Link>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSpot}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Previous spot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSpot}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Next spot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Responsive Destination Mini Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_SPOTS.map((spot, idx) => (
                <Link
                  key={spot.id}
                  to={`/destinations/${spot.destId}`}
                  className={cn(
                    'group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/15 shadow-md transition-all duration-300 hover:-translate-y-1',
                    idx === spotIndex && 'ring-2 ring-teal-400/80'
                  )}
                >
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs group-hover:text-teal-300 transition-colors truncate">
                        {spot.name}
                      </p>
                      <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-300">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>{spot.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-300 font-light truncate">{spot.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Trust & Quality Guarantee Glass Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c1e28]/75 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="space-y-1.5 flex flex-col items-center">
                  <div className="p-2 rounded-xl bg-white/10 text-teal-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 leading-tight">Best Price Guarantee</span>
                </div>

                <div className="space-y-1.5 flex flex-col items-center">
                  <div className="p-2 rounded-xl bg-white/10 text-teal-400">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 leading-tight">24/7 Travel Support</span>
                </div>

                <div className="space-y-1.5 flex flex-col items-center">
                  <div className="p-2 rounded-xl bg-white/10 text-teal-400">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 leading-tight">Flexible Bookings</span>
                </div>

                <div className="space-y-1.5 flex flex-col items-center">
                  <div className="p-2 rounded-xl bg-white/10 text-teal-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 leading-tight">Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Key Metric Stat Counter */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-white">500+</span>
            <span className="text-xs text-slate-300 font-medium">Destinations</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-white">10K+</span>
            <span className="text-xs text-slate-300 font-medium">Happy Travelers</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-white">150+</span>
            <span className="text-xs text-slate-300 font-medium">Travel Experts</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-white">4.9</span>
            <div className="space-y-0.5">
              <span className="text-xs text-slate-300 font-medium block">Average Rating</span>
              <div className="flex items-center gap-0.5 text-teal-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">See Wanderlust in Action</span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Wanderlust Travel Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
