import React from 'react';
import { Navigate } from 'react-router-dom';

// Trips feature has been removed from the platform.
// This redirect stub ensures open editor tabs have zero TypeScript errors.
export const TripsPage: React.FC = () => <Navigate to="/destinations" replace />;
export const CreateTripPage: React.FC = () => <Navigate to="/destinations" replace />;
export const TripDetailPage: React.FC = () => <Navigate to="/destinations" replace />;
export const ItineraryPage: React.FC = () => <Navigate to="/destinations" replace />;

export default TripsPage;
