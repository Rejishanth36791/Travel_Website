import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                Travel to Heaven
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover celestial destinations, browse authentic travel stories and photos, explore insider advice, and connect with a global community of passionate explorers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <Globe className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Global Travel Platform
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Discover</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/discover" className="hover:text-sky-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-sky-400 transition-colors">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link to="/photos" className="hover:text-sky-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-sky-400 transition-colors">
                  Interactive Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Tips */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/community" className="hover:text-sky-400 transition-colors">
                  Traveler Community
                </Link>
              </li>
              <li>
                <Link to="/destinations#advice" className="hover:text-sky-400 transition-colors">
                  Traveler Advice
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-sky-400 transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-sky-400 transition-colors">
                  Travel Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400 cursor-default">About Us</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">Support & FAQ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Travel to Heaven. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for global travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};
