import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'h-64 w-full rounded-2xl',
  };

  return (
    <div
      className={cn('skeleton-shimmer bg-slate-200', variantStyles[variant], className)}
      aria-hidden="true"
    />
  );
};
