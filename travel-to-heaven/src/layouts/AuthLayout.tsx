import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass, Globe } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 font-sans">
      {/* Left branding hero (desktop) */}
      <div className="hidden lg:flex relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-white">
              Travel to Heaven
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-4 max-w-lg">
          <h1 className="font-serif text-4xl font-bold leading-tight">
            Discover Places That Feel Like Heaven
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Join thousands of global travelers mapping adventures, sharing travel stories, and crafting memory-filled itineraries.
          </p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sky-400 font-semibold pt-2">
            <Globe className="w-4 h-4" /> Global Travel Discovery & Planning
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Travel to Heaven. All rights reserved.
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-2xl text-slate-900 tracking-tight">
              Travel to Heaven
            </span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
