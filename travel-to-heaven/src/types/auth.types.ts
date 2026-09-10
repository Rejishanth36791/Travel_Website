import type { User } from './user.types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}
