import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Saved Favorites');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Saved Favorites</h1>
      <p className="text-slate-600 text-sm">Your favorite destinations, hotels, and activities.</p>
    </div>
  );
};

export const CollectionsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Travel Collections');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travel Collections</h1>
      <p className="text-slate-600 text-sm">Organize places into customized travel buckets.</p>
    </div>
  );
};

export const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Collection #${id || ''}`);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Collection Detail</h1>
      <p className="text-slate-600 text-sm">Collection ID: {id}</p>
    </div>
  );
};
