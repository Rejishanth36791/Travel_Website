import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  MapPin,
  BookOpen,
  Camera,
  Map,
  Users,
  Heart,
  Bookmark,
  Bell,
  User as UserIcon,
  LogOut,
  Shield,
  Menu,
  X,
  Search,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTravel } from '@/context/TravelContext';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadNotificationsCount, favoriteDestinationIds } = useTravel();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Discover', path: '/discover', icon: MapPin },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Photos', path: '/photos', icon: Camera },
    { name: 'Trips', path: '/trips', icon: Map },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Map', path: '/map', icon: MapPin },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-slate-900 leading-none">
                Travel to Heaven
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-600">
                Global Travel Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-48 lg:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 text-slate-900 text-xs rounded-full pl-9 pr-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </form>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Plan Your Trip Button matching reference design */}
                <Link to="/trips/create">
                  <button className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Plan Your Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>

                {/* Create Story Button */}
                <Link to="/stories/create">
                  <Button variant="outline" size="sm" leftIcon={<PlusCircle className="w-4 h-4 text-sky-600" />}>
                    Write Story
                  </Button>
                </Link>

                {/* Favorites */}
                <Link
                  to="/favorites"
                  className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                  title="Saved Favorites"
                >
                  <Heart className="w-5 h-5" />
                  {favoriteDestinationIds.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {favoriteDestinationIds.length}
                    </span>
                  )}
                </Link>

                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="relative p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Link>

                {/* Light/Dark Theme Switcher */}
                <ThemeToggle variant="button" size="md" />

                {/* User Dropdown */}
                <div className="relative ml-1">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none cursor-pointer"
                  >
                    <Avatar name={user?.name || 'User'} src={user?.avatarUrl} size="sm" />
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 animate-scale-in z-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        Profile
                      </Link>
                      <Link
                        to="/collections"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400" />
                        My Collections
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-sky-700 font-semibold hover:bg-sky-50"
                        >
                          <Shield className="w-4 h-4 text-sky-600" />
                          Admin Console
                        </Link>
                      )}

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle variant="button" size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-slide-down">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2.5"
            />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={user?.name || 'User'} src={user?.avatarUrl} size="md" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="px-2 py-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Theme Mode</div>
                  <ThemeToggle variant="pill" className="w-full justify-between" />
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-700 rounded-xl hover:bg-slate-50"
                >
                  My Profile
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-700 rounded-xl hover:bg-slate-50"
                >
                  Favorites & Saved Places
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-sky-700 font-semibold rounded-xl bg-sky-50"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 font-medium rounded-xl hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
