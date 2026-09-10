import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export const CommunityPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Traveler Community');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Traveler Community</h1>
      <p className="text-slate-600 text-sm">Connect with global adventurers, recommendations, and recent activity.</p>
    </div>
  );
};

export const TravelersPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Explore Travelers');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travelers Directory</h1>
      <p className="text-slate-600 text-sm">Discover fellow explorers around the globe.</p>
    </div>
  );
};

export const TravelerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Traveler Profile`);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Traveler Profile</h1>
      <p className="text-slate-600 text-sm">Traveler ID: {id}</p>
    </div>
  );
};
