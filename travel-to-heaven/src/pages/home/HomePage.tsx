import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Discover Places That Feel Like Heaven');
  }, []);

  return (
    <div className="space-y-16 py-8">
      {/* Foundation Hero Preview */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-16 max-w-7xl mx-auto shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center opacity-35 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400" /> Phase 1 Foundation Verified
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Places That Feel Like Heaven
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Welcome to Travel to Heaven — the global travel discovery, story blogging, trip planning, budgeting, photo sharing, and traveler community platform.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/discover">
              <Button size="lg" variant="primary" leftIcon={<MapPin className="w-5 h-5" />} rightIcon={<ArrowRight className="w-5 h-5" />}>
                Explore Destinations
              </Button>
            </Link>
            <Link to="/trips">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Start Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
