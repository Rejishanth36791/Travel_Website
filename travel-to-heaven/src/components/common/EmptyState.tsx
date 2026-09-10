import React from 'react';
import { Compass } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Compass className="w-12 h-12 text-sky-500 stroke-[1.5]" />,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-2xs max-w-md mx-auto my-8 animate-fade-in">
      <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center mb-5 text-sky-600 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
