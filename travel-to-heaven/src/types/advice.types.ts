export type AdviceCategory =
  | 'SAFETY'
  | 'BEST_TIME'
  | 'LOCAL_CUSTOMS'
  | 'FOOD_DINING'
  | 'TRANSPORT'
  | 'BUDGET_TIPS';

export interface TravelAdvice {
  id: string;
  destinationId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
    location?: string;
  };
  title: string;
  content: string;
  category: AdviceCategory;
  helpfulCount: number;
  isHelpful?: boolean;
  verifiedLocal?: boolean;
  createdAt: string;
  season?: string;
}
