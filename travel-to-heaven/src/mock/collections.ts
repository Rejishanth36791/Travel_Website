import type { Collection, Favorite } from '@/types/community.types';
import { MOCK_DESTINATIONS } from './destinations';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    name: 'Mediterranean Summer Escapes',
    description: 'Cliffside whitewashed villages, pastel Italian coves, and crystal azure bays.',
    coverImageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    itemsCount: 4,
    isPrivate: false,
    destinations: [MOCK_DESTINATIONS[0], MOCK_DESTINATIONS[3]],
    createdAt: '2026-08-01T12:00:00Z',
  },
  {
    id: 'col-2',
    name: 'High Alpine Expeditions',
    description: 'Towering granite massifs, glacial turquoise tarns, and wild mountain passes.',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    itemsCount: 3,
    isPrivate: false,
    destinations: [MOCK_DESTINATIONS[2], MOCK_DESTINATIONS[5]],
    createdAt: '2026-08-10T15:30:00Z',
  },
  {
    id: 'col-3',
    name: 'Ancient Sanctuaries & Heritage',
    description: 'Lost cloud citadel temples, rose-red rock cities, and centuries-old pilgrimage trails.',
    coverImageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    itemsCount: 3,
    isPrivate: false,
    destinations: [MOCK_DESTINATIONS[1], MOCK_DESTINATIONS[6], MOCK_DESTINATIONS[8]],
    createdAt: '2026-08-18T10:00:00Z',
  },
];

export const MOCK_FAVORITES: Favorite[] = [
  {
    id: 'fav-1',
    targetId: 'dest-1',
    targetType: 'DESTINATION',
    destination: MOCK_DESTINATIONS[0], // Santorini
    createdAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'fav-2',
    targetId: 'dest-3',
    targetType: 'DESTINATION',
    destination: MOCK_DESTINATIONS[2], // Banff
    createdAt: '2026-08-22T14:30:00Z',
  },
  {
    id: 'fav-3',
    targetId: 'dest-6',
    targetType: 'DESTINATION',
    destination: MOCK_DESTINATIONS[5], // Matterhorn
    createdAt: '2026-08-25T09:15:00Z',
  },
];
