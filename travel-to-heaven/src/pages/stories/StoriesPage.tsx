import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const StoriesPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Travel Stories');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travel Stories</h1>
      <p className="text-slate-600 text-sm">Read authentic experiences shared by travelers worldwide.</p>
    </div>
  );
};
