import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sky' | 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sky',
  size = 'md',
  className = '',
}) => {
  const variants = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide uppercase font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
