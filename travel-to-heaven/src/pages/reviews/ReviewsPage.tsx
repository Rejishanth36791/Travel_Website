import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const ReviewsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Travel Reviews');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travel Reviews</h1>
      <p className="text-slate-600 text-sm">Read authentic community reviews for destinations, hotels, and experiences.</p>
    </div>
  );
};
