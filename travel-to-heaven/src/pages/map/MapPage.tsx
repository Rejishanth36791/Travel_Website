import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const MapPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Interactive World Map');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Interactive Travel Map</h1>
      <p className="text-slate-600 text-sm">Explore global destination markers and trip itineraries on an interactive map.</p>
    </div>
  );
};
