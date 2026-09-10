import apiClient from '@/lib/axios';
import type { Destination, DestinationFilters } from '@/types/destination.types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

export const destinationService = {
  async getDestinations(
    filters?: DestinationFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Destination>> {
    const params = { ...filters, ...pagination };
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Destination>>>('/destinations', { params });
    return response.data.data;
  },

  async getDestinationById(id: string): Promise<Destination> {
    const response = await apiClient.get<ApiResponse<Destination>>(`/destinations/${id}`);
    return response.data.data;
  },

  async getPopularDestinations(limit = 6): Promise<Destination[]> {
    const response = await apiClient.get<ApiResponse<Destination[]>>('/destinations/popular', { params: { limit } });
    return response.data.data;
  },

  async toggleFavorite(id: string): Promise<{ isFavorite: boolean }> {
    const response = await apiClient.post<ApiResponse<{ isFavorite: boolean }>>(`/destinations/${id}/favorite`);
    return response.data.data;
  },
};
