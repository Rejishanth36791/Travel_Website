import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const DestinationsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('All Destinations');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Destinations Catalog</h1>
      <p className="text-slate-600 text-sm">Browse and filter global destinations with server-side pagination.</p>
    </div>
  );
};
