import type { User } from './user.types';
import type { Destination } from './destination.types';

export type StoryStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface StoryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface StoryComment {
  id: string;
  storyId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  images?: StoryImage[];
  author: User;
  destination?: Destination;
  readingTimeMinutes: number;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  status: StoryStatus;
  publishedAt: string;
  createdAt: string;
}

export interface StoryFilters {
  category?: string;
  tag?: string;
  destinationId?: string;
  query?: string;
  sortBy?: 'popular' | 'newest' | 'readingTime';
}
