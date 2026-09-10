import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Destination #${id || ''}`);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Destination Overview</h1>
      <p className="text-slate-600 text-sm">Destination ID: {id}</p>
    </div>
  );
};
