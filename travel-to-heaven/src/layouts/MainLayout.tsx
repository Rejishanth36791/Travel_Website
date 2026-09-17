import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MobileNav } from '@/components/navigation/MobileNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 font-sans antialiased relative">
      {/* 
        Global Scenic Travel Background Image Layer 
        Replaces flat plain white background with a cinematic tropical island backdrop matching reference design
      */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541385355340-2ab888752c9b?auto=format&fit=crop&w=2560&q=85"
          alt="Scenic travel background"
          className="w-full h-full object-cover object-center scale-102 opacity-75 dark:opacity-65 transition-opacity duration-700 brightness-95 saturate-110"
        />
        {/* Soft Ambient Cinematic Vignettes & Gradients for Legibility */}
        <div className="absolute inset-0 bg-slate-950/35 dark:bg-[#071318]/50" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.08),transparent_70%)]" />
      </div>

      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};
