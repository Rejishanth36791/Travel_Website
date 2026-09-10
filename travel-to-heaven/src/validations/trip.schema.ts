import { z } from 'zod';

export const tripSchema = z
  .object({
    title: z.string().min(3, 'Trip title must be at least 3 characters'),
    destinationId: z.string().min(1, 'Please select a destination'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    travelersCount: z.number().min(1, 'At least 1 traveler is required'),
    description: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      message: 'End date cannot be before start date',
      path: ['endDate'],
    }
  );

export type TripInput = z.infer<typeof tripSchema>;
