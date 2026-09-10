import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export const PhotosPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Photo Gallery');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travel Photo Hub</h1>
      <p className="text-slate-600 text-sm">Visual inspiration captured by global explorers.</p>
    </div>
  );
};

export const PhotoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Photo #${id || ''}`);
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Photo View</h1>
      <p className="text-slate-600 text-sm">Photo ID: {id}</p>
    </div>
  );
};
