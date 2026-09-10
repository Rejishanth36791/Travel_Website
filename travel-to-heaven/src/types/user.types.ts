export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  travelInterests?: string[];
  followersCount?: number;
  followingCount?: number;
  storiesCount?: number;
  photosCount?: number;
  tripsCount?: number;
  createdAt: string;
  enabled?: boolean;
}

export interface UserProfile extends User {
  isFollowing?: boolean;
}
