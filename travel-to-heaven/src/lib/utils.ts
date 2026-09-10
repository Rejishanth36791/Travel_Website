import type { Currency } from '@/types/budget.types';

/**
 * Format currency amounts consistently
 */
export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  const symbolMap: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    LKR: 'Rs.',
  };

  const symbol = symbolMap[currency] || '$';
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format dates cleanly
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Set page title dynamically following branding standard: "Travel to Heaven | [Title]"
 */
export function setPageTitle(title?: string): void {
  if (title) {
    document.title = `Travel to Heaven | ${title}`;
  } else {
    document.title = 'Travel to Heaven | Global Travel Platform';
  }
}

/**
 * Class name builder utility
 */
export function cn(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}
