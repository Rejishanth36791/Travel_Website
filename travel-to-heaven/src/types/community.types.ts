import type { User } from './user.types';
import type { Destination } from './destination.types';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  itemsCount: number;
  isPrivate?: boolean;
  destinations?: Destination[];
  createdAt: string;
}

export interface Favorite {
  id: string;
  targetId: string;
  targetType: 'DESTINATION' | 'HOTEL' | 'RESTAURANT' | 'ACTIVITY';
  destination?: Destination;
  createdAt: string;
}

export type NotificationType =
  | 'NEW_FOLLOWER'
  | 'STORY_LIKE'
  | 'STORY_COMMENT'
  | 'PHOTO_LIKE'
  | 'PHOTO_COMMENT'
  | 'REVIEW_HELPFUL'
  | 'COMMUNITY_ACTIVITY';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  actor: User;
  message: string;
  targetUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'FALSE_INFORMATION'
  | 'COPYRIGHT_CONCERN'
  | 'OTHER';

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'REJECTED';

export interface ContentReport {
  id: string;
  reporter: User;
  targetId: string;
  targetType: 'STORY' | 'PHOTO' | 'COMMENT' | 'REVIEW' | 'USER';
  reason: ReportReason;
  notes?: string;
  status: ReportStatus;
  createdAt: string;
}
