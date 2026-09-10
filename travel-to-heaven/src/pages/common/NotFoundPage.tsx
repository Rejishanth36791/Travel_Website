import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { setPageTitle } from '@/lib/utils';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('404 Page Not Found');
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50">
      <div className="w-24 h-24 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner animate-bounce">
        <Compass className="w-12 h-12 stroke-[1.5]" />
      </div>
      <span className="text-sm font-extrabold uppercase tracking-widest text-sky-600 mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
        Lost Somewhere Celestial?
      </h1>
      <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
        This destination doesn't exist or has been relocated to another corner of the globe. Let's get you back on track.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/discover">
          <Button variant="outline" leftIcon={<Search className="w-4 h-4 text-sky-600" />}>
            Explore Destinations
          </Button>
        </Link>
      </div>
    </div>
  );
};
