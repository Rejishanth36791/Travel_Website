import type { Destination } from './destination.types';

export type ItineraryItemType = 'ATTRACTION' | 'ACTIVITY' | 'RESTAURANT' | 'HOTEL' | 'TRANSPORT' | 'OTHER';

export interface ItineraryItem {
  id: string;
  dayId: string;
  title: string;
  type: ItineraryItemType;
  time?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  order: number;
}

export interface TripDay {
  id: string;
  tripId: string;
  dayNumber: number;
  date: string;
  title?: string;
  items: ItineraryItem[];
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  travelersCount: number;
  notes?: string;
  coverImageUrl?: string;
  days?: TripDay[];
  totalBudget?: number;
  totalSpent?: number;
  createdAt: string;
}
