import React, { useEffect } from 'react';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  BarChart3, Users, MapPin, BookOpen, Camera, MessageSquare,
  Flag, TrendingUp, TrendingDown, ArrowUpRight,
  CheckCircle2, XCircle, AlertTriangle, Search,
  MoreHorizontal,
} from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';

// === Dashboard ===
export const AdminDashboardPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Dashboard'); }, []);

  const stats = [
    { label: 'Total Users', value: '24,580', change: '+12%', trend: 'up', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Destinations', value: '1,842', change: '+5%', trend: 'up', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Stories', value: '8,234', change: '+18%', trend: 'up', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Photos', value: '52,100', change: '+24%', trend: 'up', icon: Camera, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Reviews', value: '15,680', change: '+8%', trend: 'up', icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Open Reports', value: '23', change: '-15%', trend: 'down', icon: Flag, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Platform Analytics</h2>
            <p className="text-xs text-slate-500">Real-time statistics across Travel to Heaven</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.bg, stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  'flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                )}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recent User Signups</h3>
          {['Sarah Chen', 'Tom Walker', 'Maria Garcia', 'Hiroshi Yamada', 'Anna Schmidt'].map((name, i) => (
            <div key={name} className="flex items-center gap-3">
              <Avatar name={name} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{name}</p>
                <p className="text-[10px] text-slate-400">{i + 1}h ago</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">New</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Pending Actions</h3>
          {[
            { action: '5 stories awaiting review', type: 'warning' },
            { action: '3 photos flagged for content', type: 'danger' },
            { action: '12 new reviews to moderate', type: 'info' },
            { action: '2 content reports pending', type: 'danger' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <AlertTriangle className={cn('w-4 h-4', item.type === 'danger' ? 'text-rose-500' : item.type === 'warning' ? 'text-amber-500' : 'text-sky-500')} />
              <p className="text-sm text-slate-700 flex-1">{item.action}</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// === Admin Users ===
export const AdminUsersPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Users'); }, []);

  const users = [
    { id: 'u1', name: 'Elena Rostova', email: 'elena@travel.com', role: 'USER', enabled: true, stories: 42, joined: '2025-05-10' },
    { id: 'u2', name: 'Kenji Takahashi', email: 'kenji@travel.com', role: 'USER', enabled: true, stories: 28, joined: '2025-06-12' },
    { id: 'u3', name: 'Sophia Laurent', email: 'sophia@travel.com', role: 'USER', enabled: true, stories: 67, joined: '2025-07-01' },
    { id: 'u4', name: 'Marco Rossi', email: 'marco@travel.com', role: 'USER', enabled: false, stories: 34, joined: '2025-08-15' },
    { id: 'u5', name: 'Admin User', email: 'admin@travel.com', role: 'ADMIN', enabled: true, stories: 0, joined: '2025-01-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">User Management</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search users..." className="bg-white border border-slate-200 text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-2xs w-56" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-3 text-left font-semibold">User</th>
              <th className="px-5 py-3 text-left font-semibold">Role</th>
              <th className="px-5 py-3 text-left font-semibold">Stories</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Joined</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={u.name} size="sm" />
                    <div>
                      <p className="font-medium text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold',
                    u.role === 'ADMIN' ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-600'
                  )}>{u.role}</span>
                </td>
                <td className="px-5 py-3 text-slate-600">{u.stories}</td>
                <td className="px-5 py-3">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold',
                    u.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  )}>
                    {u.enabled ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {u.enabled ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">{formatDate(u.joined)}</td>
                <td className="px-5 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// === Admin Destinations ===
export const AdminDestinationsPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Destinations'); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Destination Moderation</h2>
        <Button variant="primary" size="sm">+ Add Destination</Button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 text-center space-y-3">
        <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-500">1,842 destinations in the database.</p>
        <p className="text-xs text-slate-400">Destination CRUD operations connect to the Spring Boot backend API.</p>
      </div>
    </div>
  );
};

// === Admin Stories ===
export const AdminStoriesPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Stories'); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Story Moderation</h2>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 text-center space-y-3">
        <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-500">8,234 stories published. 5 pending review.</p>
        <p className="text-xs text-slate-400">Review, feature, or archive travel stories via the moderation API.</p>
      </div>
    </div>
  );
};

// === Admin Photos ===
export const AdminPhotosPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Photos'); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Photo Moderation</h2>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 text-center space-y-3">
        <Camera className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-500">52,100 photos uploaded. 3 flagged for review.</p>
        <p className="text-xs text-slate-400">Moderate community photo uploads with bulk actions.</p>
      </div>
    </div>
  );
};

// === Admin Reviews ===
export const AdminReviewsPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Reviews'); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Review Moderation</h2>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-8 text-center space-y-3">
        <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-500">15,680 reviews submitted. 12 pending moderation.</p>
        <p className="text-xs text-slate-400">Approve, reject, or flag user reviews via the backend API.</p>
      </div>
    </div>
  );
};

// === Admin Reports ===
export const AdminReportsPage: React.FC = () => {
  useEffect(() => { setPageTitle('Admin Reports'); }, []);

  const reports = [
    { id: 'rp1', reporter: 'Sarah Chen', target: 'Offensive review on Marrakech', reason: 'INAPPROPRIATE_CONTENT', status: 'PENDING', date: '2026-09-17' },
    { id: 'rp2', reporter: 'Tom Walker', target: 'Spam story about travel deals', reason: 'SPAM', status: 'PENDING', date: '2026-09-16' },
    { id: 'rp3', reporter: 'Maria Garcia', target: 'Copyright concern on photo', reason: 'COPYRIGHT_CONCERN', status: 'REVIEWED', date: '2026-09-15' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Content Reports</h2>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-3 text-left font-semibold">Reporter</th>
              <th className="px-5 py-3 text-left font-semibold">Target</th>
              <th className="px-5 py-3 text-left font-semibold">Reason</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Date</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-800">{r.reporter}</td>
                <td className="px-5 py-3 text-slate-600 max-w-50 truncate">{r.target}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold">
                    {r.reason.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold',
                    r.status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  )}>
                    {r.status === 'PENDING' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">{formatDate(r.date)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 cursor-pointer" title="Resolve">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 cursor-pointer" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
