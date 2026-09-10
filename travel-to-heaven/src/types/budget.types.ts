export type BudgetCategory =
  | 'ACCOMMODATION'
  | 'TRANSPORTATION'
  | 'FOOD'
  | 'ACTIVITIES'
  | 'SHOPPING'
  | 'FLIGHTS'
  | 'OTHER';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'LKR';

export interface BudgetItem {
  id: string;
  tripId: string;
  name: string;
  category: BudgetCategory;
  estimatedAmount: number;
  actualAmount: number;
  currency: Currency;
  date?: string;
  notes?: string;
  createdAt: string;
}

export interface BudgetCategorySummary {
  category: BudgetCategory;
  estimated: number;
  actual: number;
}

export interface BudgetSummary {
  tripId: string;
  currency: Currency;
  totalEstimated: number;
  totalActual: number;
  remainingBudget: number;
  categories: BudgetCategorySummary[];
}
