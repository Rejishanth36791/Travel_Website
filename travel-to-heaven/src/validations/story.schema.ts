import { z } from 'zod';

export const storySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(120, 'Title is too long'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(300, 'Excerpt is too long'),
  content: z.string().min(50, 'Story content must be at least 50 characters'),
  category: z.string().min(1, 'Please select a category'),
  destinationId: z.string().optional(),
  tags: z.string().transform((val) => val.split(',').map((t) => t.trim()).filter(Boolean)),
  coverImageUrl: z.string().url('Please enter a valid cover image URL'),
});

export type StoryInput = z.infer<typeof storySchema>;
