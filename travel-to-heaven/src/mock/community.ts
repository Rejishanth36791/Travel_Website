import type { ContentReport } from '@/types/community.types';
import { MOCK_USERS } from './users';

export interface CommunityPost {
  id: string;
  author: typeof MOCK_USERS[0];
  content: string;
  location?: string;
  image?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: string;
  tags?: string[];
}

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: MOCK_USERS[1], // Elena
    content: 'Just completed the 14-day Portuguese Camino along the Atlantic coast from Porto to Santiago de Compostela. The coastal breezes and seafood along the Costa Verde were extraordinary. Happy to share my packing gear list and daily stage breakdown with anyone planning it this autumn!',
    location: 'Porto to Santiago de Compostela',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    likesCount: 142,
    commentsCount: 28,
    isLiked: true,
    tags: ['CaminoDeSantiago', 'SoloTravel', 'Hiking', 'Portugal'],
    createdAt: '2026-09-16T15:20:00Z',
  },
  {
    id: 'post-2',
    author: MOCK_USERS[2], // Marcus
    content: 'Quick tip for wildlife photographers heading to the Serengeti: dust is your biggest enemy during September river crossings. Bring two camera bodies so you never change lenses in open game-drive vehicles, and invest in neoprene dry bags.',
    location: 'Serengeti National Park, Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    likesCount: 219,
    commentsCount: 35,
    isLiked: false,
    tags: ['WildlifePhotography', 'SafariTips', 'Conservation'],
    createdAt: '2026-09-15T11:40:00Z',
  },
  {
    id: 'post-3',
    author: MOCK_USERS[3], // Maya
    content: 'Has anyone visited the remote mountain temples around Koyasan during the late November autumn foliage illumination? Wondering if a shukubo (temple lodging) overnight is warm enough for winter chill.',
    location: 'Mount Koya, Wakayama',
    likesCount: 88,
    commentsCount: 19,
    isLiked: false,
    tags: ['JapanTravel', 'Temples', 'WinterTravel'],
    createdAt: '2026-09-14T09:15:00Z',
  },
];

export const MOCK_REPORTS: ContentReport[] = [
  {
    id: 'rep-1',
    reporter: MOCK_USERS[2],
    targetId: 'story-99',
    targetType: 'STORY',
    reason: 'SPAM',
    notes: 'Repeated promotional commercial link posted in story body.',
    status: 'PENDING',
    createdAt: '2026-09-16T14:30:00Z',
  },
  {
    id: 'rep-2',
    reporter: MOCK_USERS[4],
    targetId: 'rev-99',
    targetType: 'REVIEW',
    reason: 'INAPPROPRIATE_CONTENT',
    notes: 'Off-topic derogatory language toward local tour guides.',
    status: 'PENDING',
    createdAt: '2026-09-15T18:20:00Z',
  },
  {
    id: 'rep-3',
    reporter: MOCK_USERS[1],
    targetId: 'photo-99',
    targetType: 'PHOTO',
    reason: 'COPYRIGHT_CONCERN',
    notes: 'Image taken from commercial stock archive without attribution.',
    status: 'RESOLVED',
    createdAt: '2026-09-12T10:00:00Z',
  },
];
