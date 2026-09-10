import apiClient from '@/lib/axios';
import type { Story, StoryFilters } from '@/types/story.types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

export const storyService = {
  async getStories(
    filters?: StoryFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Story>> {
    const params = { ...filters, ...pagination };
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Story>>>('/stories', { params });
    return response.data.data;
  },

  async getStoryById(id: string): Promise<Story> {
    const response = await apiClient.get<ApiResponse<Story>>(`/stories/${id}`);
    return response.data.data;
  },

  async createStory(storyData: Partial<Story>): Promise<Story> {
    const response = await apiClient.post<ApiResponse<Story>>('/stories', storyData);
    return response.data.data;
  },

  async updateStory(id: string, storyData: Partial<Story>): Promise<Story> {
    const response = await apiClient.put<ApiResponse<Story>>(`/stories/${id}`, storyData);
    return response.data.data;
  },

  async deleteStory(id: string): Promise<void> {
    await apiClient.delete(`/stories/${id}`);
  },

  async toggleLike(id: string): Promise<{ likesCount: number; isLiked: boolean }> {
    const response = await apiClient.post<ApiResponse<{ likesCount: number; isLiked: boolean }>>(`/stories/${id}/like`);
    return response.data.data;
  },

  async toggleBookmark(id: string): Promise<{ isBookmarked: boolean }> {
    const response = await apiClient.post<ApiResponse<{ isBookmarked: boolean }>>(`/stories/${id}/bookmark`);
    return response.data.data;
  },
};
