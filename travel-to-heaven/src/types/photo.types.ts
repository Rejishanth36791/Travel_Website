import type { User } from './user.types';
import type { Destination } from './destination.types';

export interface PhotoComment {
  id: string;
  photoId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  photographer: User;
  destination?: Destination;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  createdAt: string;
}
