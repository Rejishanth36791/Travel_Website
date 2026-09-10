import type { User } from './user.types';

export type ReviewTargetType = 'DESTINATION' | 'HOTEL' | 'RESTAURANT' | 'ACTIVITY';

export interface Review {
  id: string;
  targetId: string;
  targetType: ReviewTargetType;
  targetTitle: string;
  user: User;
  rating: number; // 1 to 5
  title?: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
  isHelpful?: boolean;
  createdAt: string;
}
