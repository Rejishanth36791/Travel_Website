import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTravel } from '@/context/TravelContext';
import { cn } from '@/lib/utils';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { unreadNotificationsCount } = useTravel();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isCommunityActive = location.pathname.startsWith('/community') && !location.search.includes('create=true');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c1e28]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 px-3 py-2 shadow-2xl safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          to="/"
          className={cn(
            'flex flex-col items-center p-1.5 transition-transform active:scale-90',
            isActive('/') ? 'text-slate-950 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          )}
          aria-label="Home"
        >
          <Home className={cn('w-6 h-6', isActive('/') ? 'stroke-[2.5] fill-slate-900/10' : 'stroke-[1.8]')} />
        </Link>

        {/* 2. Explore / Search */}
        <Link
          to="/discover"
          className={cn(
            'flex flex-col items-center p-1.5 transition-transform active:scale-90',
            isActive('/discover') ? 'text-slate-950 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          )}
          aria-label="Explore"
        >
          <Search className={cn('w-6 h-6', isActive('/discover') ? 'stroke-[2.8]' : 'stroke-[1.8]')} />
        </Link>

        {/* 3. (+) Create Post Button */}
        <Link
          to="/community?create=true"
          className="flex flex-col items-center transition-transform active:scale-90"
          aria-label="Create Post"
        >
          <div className="p-1 rounded-xl bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600 shadow-md hover:opacity-95">
            <div className="p-1 rounded-[10px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center">
              <PlusSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>
        </Link>

        {/* 4. Community / Activity */}
        <Link
          to="/community"
          className={cn(
            'flex flex-col items-center p-1.5 relative transition-transform active:scale-90',
            isCommunityActive ? 'text-slate-950 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          )}
          aria-label="Community"
        >
          <Heart className={cn('w-6 h-6', isCommunityActive ? 'stroke-[2.5] fill-rose-500 text-rose-500' : 'stroke-[1.8]')} />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          )}
        </Link>

        {/* 5. Profile Avatar */}
        <Link
          to="/profile"
          className={cn(
            'flex flex-col items-center p-1 transition-transform active:scale-90',
            isActive('/profile') ? 'text-slate-950 dark:text-white' : 'text-slate-500'
          )}
          aria-label="Profile"
        >
          <div
            className={cn(
              'w-7 h-7 rounded-full p-0.5 transition-all',
              isActive('/profile')
                ? 'bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600 ring-1 ring-slate-900'
                : 'border border-slate-300 dark:border-slate-700'
            )}
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || 'Profile'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
