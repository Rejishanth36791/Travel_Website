import type { NotificationItem } from '@/types/community.types';
import { MOCK_USERS } from './users';

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'NEW_FOLLOWER',
    message: 'started following your travel journey and expeditions.',
    actor: MOCK_USERS[1], // Elena Rostova
    targetUrl: '/travelers/user-2',
    isRead: false,
    createdAt: '2026-09-17T08:30:00Z',
  },
  {
    id: 'notif-2',
    type: 'STORY_LIKE',
    message: 'liked your travel story "Traversing the High Passes of the Swiss Valais".',
    actor: MOCK_USERS[2], // Marcus Chen
    targetUrl: '/stories/story-2',
    isRead: false,
    createdAt: '2026-09-17T07:15:00Z',
  },
  {
    id: 'notif-3',
    type: 'STORY_COMMENT',
    message: 'commented on your story: "The description of the Charles Kuonen bridge gave me chills! Adding to my Swiss bucket list."',
    actor: MOCK_USERS[3], // Maya Patel
    targetUrl: '/stories/story-2',
    isRead: true,
    createdAt: '2026-09-16T18:45:00Z',
  },
  {
    id: 'notif-4',
    type: 'PHOTO_LIKE',
    message: 'liked your high-alpine photo "Matterhorn reflected in Riffelsee".',
    actor: MOCK_USERS[4], // Liam O’Connor
    targetUrl: '/photos/photo-4',
    isRead: true,
    createdAt: '2026-09-16T14:20:00Z',
  },
  {
    id: 'notif-5',
    type: 'REVIEW_HELPFUL',
    message: 'found your detailed review of Santorini Caldera helpful.',
    actor: MOCK_USERS[5], // Sophie Martin
    targetUrl: '/destinations/dest-1',
    isRead: true,
    createdAt: '2026-09-15T10:00:00Z',
  },
];
