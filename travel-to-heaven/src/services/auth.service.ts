import apiClient from '@/lib/axios';
import type { User } from '@/types/user.types';
import type { AuthResponse } from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  async register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/users/profile', profileData);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
