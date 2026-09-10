import apiClient from '@/lib/axios';
import type { Trip, ItineraryItem } from '@/types/trip.types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

export const tripService = {
  async getTrips(pagination?: PaginationParams): Promise<PaginatedResponse<Trip>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Trip>>>('/trips', { params: pagination });
    return response.data.data;
  },

  async getTripById(id: string): Promise<Trip> {
    const response = await apiClient.get<ApiResponse<Trip>>(`/trips/${id}`);
    return response.data.data;
  },

  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    const response = await apiClient.post<ApiResponse<Trip>>('/trips', tripData);
    return response.data.data;
  },

  async updateTrip(id: string, tripData: Partial<Trip>): Promise<Trip> {
    const response = await apiClient.put<ApiResponse<Trip>>(`/trips/${id}`, tripData);
    return response.data.data;
  },

  async deleteTrip(id: string): Promise<void> {
    await apiClient.delete(`/trips/${id}`);
  },

  async addItineraryItem(tripId: string, dayId: string, item: Partial<ItineraryItem>): Promise<ItineraryItem> {
    const response = await apiClient.post<ApiResponse<ItineraryItem>>(`/trips/${tripId}/days/${dayId}/items`, item);
    return response.data.data;
  },
};
