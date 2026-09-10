export type DestinationCategory =
  | 'Beach'
  | 'Mountain'
  | 'City'
  | 'Nature'
  | 'Adventure'
  | 'Historical'
  | 'Cultural'
  | 'Wildlife'
  | 'Food'
  | 'Luxury'
  | 'Budget'
  | 'Family'
  | 'Romantic';

export interface DestinationCoordinates {
  latitude: number;
  longitude: number;
}

export interface DestinationImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface DestinationActivity {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedPrice?: number;
  rating?: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  city: string;
  region: string;
  category: DestinationCategory;
  description: string;
  overview?: string;
  history?: string;
  culturalImportance?: string;
  naturalBeauty?: string;
  bestTimeToVisit?: string;
  language?: string;
  currency?: string;
  timeZone?: string;
  rating: number;
  reviewsCount: number;
  coverImageUrl: string;
  images: DestinationImage[];
  activities?: DestinationActivity[];
  coordinates: DestinationCoordinates;
  isFavorite?: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface DestinationFilters {
  country?: string;
  city?: string;
  category?: DestinationCategory | '';
  minRating?: number;
  query?: string;
  sortBy?: 'popularity' | 'rating' | 'newest' | 'name';
}
