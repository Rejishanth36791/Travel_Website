import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export const TripsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('My Trips & Itineraries');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Trip Planner</h1>
      <p className="text-slate-600 text-sm">Organize and manage your travel itineraries and budgets.</p>
    </div>
  );
};

export const CreateTripPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Create New Trip');
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Start a New Trip</h1>
      <p className="text-slate-600 text-sm">Plan dates, destinations, and itinerary goals.</p>
    </div>
  );
};

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Trip Overview #${id || ''}`);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Trip Overview</h1>
      <p className="text-slate-600 text-sm">Trip ID: {id}</p>
    </div>
  );
};

export const ItineraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Day-by-Day Itinerary`);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Day-by-Day Itinerary</h1>
      <p className="text-slate-600 text-sm">Trip ID: {id}</p>
    </div>
  );
};
