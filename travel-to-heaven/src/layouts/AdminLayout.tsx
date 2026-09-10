import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MapPin,
  BookOpen,
  Camera,
  Star,
  Flag,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/common/Avatar';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Destinations', path: '/admin/destinations', icon: MapPin },
    { name: 'Stories', path: '/admin/stories', icon: BookOpen },
    { name: 'Photos', path: '/admin/photos', icon: Camera },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Content Reports', path: '/admin/reports', icon: Flag },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm tracking-tight">Admin Console</h2>
              <p className="text-[10px] text-slate-400 font-medium">Travel to Heaven</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-sky-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Admin
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 font-serif">Platform Administration</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{user?.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Administrator</p>
            </div>
            <Avatar name={user?.name || 'Admin'} src={user?.avatarUrl} size="sm" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
