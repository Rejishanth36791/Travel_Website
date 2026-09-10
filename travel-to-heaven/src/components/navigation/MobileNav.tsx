import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, MapPin, Map, Users, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Discover', path: '/discover', icon: MapPin },
    { name: 'Trips', path: '/trips', icon: Map },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                active ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
