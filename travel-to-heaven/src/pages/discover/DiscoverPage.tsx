import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const DiscoverPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Discover Destinations');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Discover Destinations</h1>
      <p className="text-slate-600 text-sm">Explore world destinations by categories, popularity, and climate.</p>
    </div>
  );
};
