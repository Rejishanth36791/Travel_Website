import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Compass, PenTool } from 'lucide-react';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white py-24 px-8 text-center my-12">
      {/* Background Image (Image 5 style) */}
      <img
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
        alt="Starry mountain sky travel inspiration"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-300 uppercase tracking-widest">
          <Compass className="w-4 h-4 text-sky-400" /> Start Your Celestial Voyage
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-tight text-white">
          Travel and Inspire Your Life
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Create an account to build day-by-day itineraries, track travel budgets, publish photo diaries, and save your dream destinations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/register">
            <Button size="lg" variant="primary" leftIcon={<Compass className="w-5 h-5" />}>
              Create Free Account
            </Button>
          </Link>
          <Link to="/stories/create">
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" leftIcon={<PenTool className="w-5 h-5" />}>
              Publish a Travel Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
