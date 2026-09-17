import React, { useEffect, useState } from 'react';
import { setPageTitle, cn } from '@/lib/utils';
import { MapPin, Search, Layers, ZoomIn, ZoomOut, LocateFixed, Compass } from 'lucide-react';
import type { Destination } from '@/types/destination.types';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { useTravel } from '@/context/TravelContext';

export const MapPage: React.FC = () => {
  const { destinations, toggleFavoriteDestination } = useTravel();
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setPageTitle('Interactive World Map — Travel to Heaven');
    if (destinations.length > 0) {
      setSelectedDest(destinations[0]);
    }
  }, [destinations]);

  const filtered = destinations.filter(
    (d) =>
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Map Search & Filter Bar */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 z-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations, cities, or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500">
            {filtered.length} locations mapped
          </span>
          <button
            onClick={() => setSelectedDest(destinations[0])}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Recenter view"
            aria-label="Locate me"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Map layers"
            aria-label="Toggle layers"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div className="flex-1 relative bg-linear-to-br from-sky-100 via-blue-50 to-indigo-100 overflow-hidden">
        {/* SVG World Map Illustration */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="relative w-full max-w-4xl h-full max-h-125 px-6">
            {/* World Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 800 500" fill="none">
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 80} y1={0} x2={i * 80} y2={500} stroke="currentColor" strokeWidth="0.5" className="text-slate-500" />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`h-${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} stroke="currentColor" strokeWidth="0.5" className="text-slate-500" />
              ))}
            </svg>

            {/* Destination Pin Markers */}
            {filtered.map((dest) => {
              // Convert lat/lng to percentage coordinates
              const topPct = Math.max(15, Math.min(85, ((90 - dest.coordinates.latitude) / 180) * 100));
              const leftPct = Math.max(10, Math.min(90, ((dest.coordinates.longitude + 180) / 360) * 100));
              const isSelected = selectedDest?.id === dest.id;

              return (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group z-10"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  aria-label={`View ${dest.name}`}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold transition-all',
                      isSelected
                        ? 'bg-sky-600 text-white scale-110 ring-4 ring-sky-300'
                        : 'bg-white text-slate-800 hover:bg-sky-50 hover:scale-105 border border-slate-200'
                    )}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.city}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-30 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Destination Card Floating Panel */}
        {selectedDest && (
          <div className="absolute left-4 bottom-4 z-20 w-80 max-w-[calc(100vw-2rem)] animate-fade-in">
            <DestinationCard
              destination={selectedDest}
              variant="compact"
              onToggleFavorite={toggleFavoriteDestination}
            />
          </div>
        )}

        {/* Status Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs text-slate-700 font-medium flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600 animate-spin-slow" />
            <span>Interactive World Geographic Explorer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
