import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  imageUrl?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, imageUrl, name, size = 'md', className = '' }) => {
  const imgSrc = src || imageUrl;
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const getInitials = (str: string) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt={name}
        className={cn('rounded-full object-cover border border-slate-200 shadow-2xs', sizes[size], className)}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-linear-to-tr from-sky-600 to-emerald-500 text-white flex items-center justify-center font-medium shadow-2xs uppercase tracking-wider',
        sizes[size],
        className
      )}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};
