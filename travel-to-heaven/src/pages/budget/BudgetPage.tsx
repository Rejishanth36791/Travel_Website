import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export const BudgetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle('Travel Budget Tracker');
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Trip Budget Tracker</h1>
      <p className="text-slate-600 text-sm">Trip ID: {id}</p>
    </div>
  );
};
