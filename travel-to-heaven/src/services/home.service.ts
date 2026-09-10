import type { Destination } from '@/types/destination.types';
import type { Story } from '@/types/story.types';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  imageUrl: string;
  badge: string;
}

export interface VisualDiaryItem {
  id: string;
  title: string;
  location: string;
  country: string;
  imageUrl: string;
  isVideo?: boolean;
}

export const homeService = {
  async getHeroSlides(): Promise<HeroSlide[]> {
    // Standard mock payload adhering to backend contract
    return [
      {
        id: 'hero-1',
        title: 'Travel Beyond the Ordinary',
        subtitle: 'Explore extraordinary places, compare travel options, and uncover experiences that match your travel style.',
        location: 'Lake Braies, Dolomites',
        country: 'Italy',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
        badge: 'Travel Beyond Expectations',
      },
      {
        id: 'hero-2',
        title: 'Nagano Prefecture',
        subtitle: 'Set within the majestic Japan Alps, a cultural treasure trove with historic shrines, Zenko-ji temple, and pristine snow peaks.',
        location: 'Nagano Alps',
        country: 'Japan',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80',
        badge: 'Cultural Wonder',
      },
      {
        id: 'hero-3',
        title: 'Cameo Island Paradise',
        subtitle: 'Experience crystal clear turquoise waters, hidden coves, and serene wooden footbridges in Zakynthos.',
        location: 'Zakynthos',
        country: 'Greece',
        imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80',
        badge: 'Island Sanctuary',
      },
      {
        id: 'hero-4',
        title: 'Cinque Terre Charm',
        subtitle: 'Clifftop colorful fishing villages perched above the sparkling Ligurian sea coastline.',
        location: 'Vernazza',
        country: 'Italy',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80',
        badge: 'Coastal Royalty',
      },
      {
        id: 'hero-5',
        title: 'Majestic Grand Canal',
        subtitle: 'Gondola voyages past historical Venetian palaces, stone bridges, and romantic sunset vistas.',
        location: 'Venice',
        country: 'Italy',
        imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2000&q=80',
        badge: 'Historic Masterpiece',
      },
    ];
  },

  async getVisualDiaryItems(filter = 'Italy'): Promise<VisualDiaryItem[]> {
    const items: Record<string, VisualDiaryItem[]> = {
      Italy: [
        {
          id: 'vd-1',
          title: 'Alpine Wooden Boat Lake',
          location: 'Lake Braies',
          country: 'Italy',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'vd-2',
          title: 'Sunset Above the Clouds',
          location: 'Dolomites',
          country: 'Italy',
          imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'vd-3',
          title: 'Vintage Camera & Travel Gear',
          location: 'Rome',
          country: 'Italy',
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
          isVideo: true,
        },
        {
          id: 'vd-4',
          title: 'Moraine Glacial Waters',
          location: 'Amalfi Coast',
          country: 'Italy',
          imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'vd-5',
          title: 'Colosseum Evening Glow',
          location: 'Rome',
          country: 'Italy',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        },
      ],
      Dubai: [
        {
          id: 'vd-6',
          title: 'Burj Khalifa Horizon',
          location: 'Downtown Dubai',
          country: 'UAE',
          imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'vd-7',
          title: 'Desert Dunes Safari',
          location: 'Arabian Desert',
          country: 'UAE',
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
          isVideo: true,
        },
      ],
      Japan: [
        {
          id: 'vd-8',
          title: 'Kyoto Cherry Blossom Shrine',
          location: 'Kyoto',
          country: 'Japan',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'vd-9',
          title: 'Mount Fuji Reflections',
          location: 'Kawaguchiko',
          country: 'Japan',
          imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };

    return items[filter] || items['Italy'];
  },

  async getFeaturedDestinations(): Promise<Destination[]> {
    return [
      {
        id: 'dest-1',
        name: 'Marrakech & Sahara',
        country: 'Morocco',
        city: 'Marrakech',
        region: 'North Africa',
        category: 'Adventure',
        description: 'Golden desert dunes, ancient medinas, vibrant spice markets, and starry night camps.',
        rating: 4.9,
        reviewsCount: 1420,
        coverImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
        images: [],
        coordinates: { latitude: 31.6295, longitude: -7.9811 },
        featured: true,
        createdAt: '2026-01-15',
      },
      {
        id: 'dest-2',
        name: 'Yosemite Valley',
        country: 'USA',
        city: 'California',
        region: 'Sierra Nevada',
        category: 'Mountain',
        description: 'Towering granite cliffs, ancient giant sequoia trees, roaring waterfalls, and wilderness trails.',
        rating: 4.9,
        reviewsCount: 2380,
        coverImageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
        images: [],
        coordinates: { latitude: 37.8651, longitude: -119.5383 },
        featured: true,
        createdAt: '2026-01-20',
      },
      {
        id: 'dest-3',
        name: 'Tarifa & Los Lances',
        country: 'Spain',
        city: 'Tarifa',
        region: 'Andalusia',
        category: 'Beach',
        description: 'Unspoiled wind-swept golden beaches where the Atlantic Ocean meets the Mediterranean Sea.',
        rating: 4.8,
        reviewsCount: 980,
        coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        images: [],
        coordinates: { latitude: 36.0143, longitude: -5.6045 },
        featured: true,
        createdAt: '2026-02-01',
      },
      {
        id: 'dest-4',
        name: 'Kyoto Historic Shrines',
        country: 'Japan',
        city: 'Kyoto',
        region: 'Kansai',
        category: 'Cultural',
        description: 'Wooden zen temples, bamboo groves, geisha districts, and serene Japanese gardens.',
        rating: 4.95,
        reviewsCount: 3100,
        coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        images: [],
        coordinates: { latitude: 35.0116, longitude: 135.7681 },
        featured: true,
        createdAt: '2026-02-10',
      },
    ];
  },

  async getFeaturedStories(): Promise<Story[]> {
    return [
      {
        id: 'story-1',
        title: 'Chasing Sunrises Across the Italian Dolomites',
        excerpt: 'How waking up at 4 AM led us to the most breathtaking reflections at Lake Braies and jagged alpine peaks.',
        content: 'Full story text...',
        category: 'Adventure',
        tags: ['Italy', 'Hiking', 'Mountains'],
        coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        author: {
          id: 'user-1',
          name: 'Elena Rostova',
          email: 'elena@travel.com',
          role: 'USER',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          createdAt: '2025-05-10',
        },
        readingTimeMinutes: 6,
        likesCount: 842,
        commentsCount: 94,
        status: 'PUBLISHED',
        publishedAt: '2026-08-20',
        createdAt: '2026-08-20',
      },
      {
        id: 'story-2',
        title: 'Lost in the Ancient Temples of Kyoto',
        excerpt: 'A peaceful solitary journey through torii gates, matcha tea ceremonies, and evening rain in Gion.',
        content: 'Full story text...',
        category: 'Culture',
        tags: ['Japan', 'Kyoto', 'Temples'],
        coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        author: {
          id: 'user-2',
          name: 'Kenji Takahashi',
          email: 'kenji@travel.com',
          role: 'USER',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          createdAt: '2025-06-12',
        },
        readingTimeMinutes: 8,
        likesCount: 1250,
        commentsCount: 142,
        status: 'PUBLISHED',
        publishedAt: '2026-08-25',
        createdAt: '2026-08-25',
      },
    ];
  },
};
