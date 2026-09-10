import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading...',
  className = '',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-6 gap-3 text-slate-500', className)} role="status">
      <Loader2 className={cn('animate-spin text-sky-600', sizes[size])} />
      {label && <span className="text-sm font-medium text-slate-600 animate-pulse">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
};
