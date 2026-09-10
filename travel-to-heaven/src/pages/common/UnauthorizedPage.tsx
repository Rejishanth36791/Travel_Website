import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { setPageTitle } from '@/lib/utils';

export const UnauthorizedPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('403 Access Denied');
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <span className="text-sm font-extrabold uppercase tracking-widest text-rose-600 mb-2">
        Error 403
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        Access Restricted
      </h1>
      <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
        You do not have administrative privileges to view this area of Travel to Heaven.
      </p>
      <Link to="/">
        <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Return to Platform
        </Button>
      </Link>
    </div>
  );
};
