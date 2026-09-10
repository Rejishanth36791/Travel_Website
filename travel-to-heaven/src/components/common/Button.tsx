import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow-md border border-transparent',
    secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md border border-transparent',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 shadow-2xs',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-md border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
