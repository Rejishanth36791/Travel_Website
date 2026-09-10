import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while retrieving travel data. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-rose-50/50 rounded-3xl border border-rose-200/80 max-w-lg mx-auto my-8 animate-fade-in">
      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
};
