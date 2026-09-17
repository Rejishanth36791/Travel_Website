import React, { useEffect, useState } from 'react';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  Bell, BellOff, CheckCheck, Heart, MessageCircle,
  UserPlus, Star, Camera, MapPin, BookOpen, Settings,
  Shield, Palette, Globe, LogOut, ChevronRight, Mail, Lock,
  User as UserIcon, Eye, EyeOff, Trash2, Check,
} from 'lucide-react';
import type { NotificationType } from '@/types/community.types';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useTravel } from '@/context/TravelContext';
import { useAuth } from '@/hooks/useAuth';

const NOTIFICATION_ICONS: Record<NotificationType, React.ElementType> = {
  NEW_FOLLOWER: UserPlus,
  STORY_LIKE: Heart,
  STORY_COMMENT: MessageCircle,
  PHOTO_LIKE: Camera,
  PHOTO_COMMENT: MessageCircle,
  REVIEW_HELPFUL: Star,
  COMMUNITY_ACTIVITY: Globe,
};

const NOTIFICATION_COLORS: Record<NotificationType, string> = {
  NEW_FOLLOWER: 'text-sky-600 bg-sky-50',
  STORY_LIKE: 'text-rose-600 bg-rose-50',
  STORY_COMMENT: 'text-violet-600 bg-violet-50',
  PHOTO_LIKE: 'text-amber-600 bg-amber-50',
  PHOTO_COMMENT: 'text-indigo-600 bg-indigo-50',
  REVIEW_HELPFUL: 'text-emerald-600 bg-emerald-50',
  COMMUNITY_ACTIVITY: 'text-teal-600 bg-teal-50',
};

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    removeNotification,
  } = useTravel();

  useEffect(() => {
    setPageTitle('Notifications — Travel to Heaven');
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              Notifications
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white text-xs font-bold">
                  {unreadNotificationsCount}
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-500">Activity and interactions across your journeys</p>
          </div>
        </div>
        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <BellOff className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const Icon = NOTIFICATION_ICONS[notif.type] || Bell;
            const colorClass = NOTIFICATION_COLORS[notif.type] || 'text-sky-600 bg-sky-50';
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-3.5 px-5 py-4 hover:bg-slate-50 transition-colors group',
                  !notif.isRead && 'bg-sky-50/40'
                )}
              >
                <div className="relative shrink-0">
                  <Avatar name={notif.actor.name} imageUrl={notif.actor.avatarUrl} size="sm" />
                  <div className={cn('absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-xs', colorClass)}>
                    <Icon className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-slate-700">
                    <strong className="font-semibold text-slate-900">{notif.actor.name}</strong>{' '}
                    {notif.message}
                  </p>
                  <p className="text-xs text-slate-400">{formatDate(notif.createdAt)}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {!notif.isRead && (
                    <button
                      onClick={() => markNotificationAsRead(notif.id)}
                      className="p-1.5 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Remove notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
        </div>
      </div>
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');

  useEffect(() => {
    setPageTitle('My Profile — Travel to Heaven');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({
        ...user,
        name,
        bio,
        location,
      });
    }
    setIsEditing(false);
  };

  const currentUser = user || {
    name: 'Alex Rivera',
    email: 'alex.rivera@traveltoheaven.com',
    bio: 'Alpine mountaineer, documentary photographer & slow-travel advocate.',
    location: 'Zurich, Switzerland',
    travelInterests: ['Alpine Treks', 'Cultural Heritage', 'Eco-Lodges'],
    storiesCount: 18,
    photosCount: 64,
    tripsCount: 7,
    followersCount: 3840,
    followingCount: 412,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="h-40 bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500" />
        <div className="px-6 pb-6 -mt-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full rounded-xl object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <h1 className="font-serif text-2xl font-bold text-slate-900">{currentUser.name}</h1>
              {currentUser.location && (
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {currentUser.location}
                </p>
              )}
            </div>
            <Button
              variant={isEditing ? 'ghost' : 'outline'}
              leftIcon={<Settings className="w-4 h-4" />}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Edit Profile Details</h2>
          <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Biography</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Changes</Button>
          </div>
        </form>
      ) : (
        <>
          {/* Bio */}
          {currentUser.bio && (
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200">
              {currentUser.bio}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Stories', value: currentUser.storiesCount || 18, icon: BookOpen },
              { label: 'Photos', value: currentUser.photosCount || 64, icon: Camera },
              { label: 'Trips', value: currentUser.tripsCount || 7, icon: MapPin },
              { label: 'Followers', value: currentUser.followersCount || 3840, icon: UserPlus },
              { label: 'Following', value: currentUser.followingCount || 412, icon: UserPlus },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-xs">
                  <Icon className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-slate-900">{s.value.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Travel Passions</h3>
            <div className="flex flex-wrap gap-2">
              {(currentUser.travelInterests || ['Alpine Treks', 'Slow Travel', 'Photography']).map((i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ToggleSwitch: React.FC<{ defaultChecked?: boolean }> = ({ defaultChecked = true }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={cn(
        'relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer',
        checked ? 'bg-sky-600' : 'bg-slate-300'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  );
};

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setPageTitle('Account Settings — Travel to Heaven');
  }, []);

  const TABS = [
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">Account Settings</h1>
        <p className="text-slate-600 text-sm">Manage profile details, security preferences, and experience options.</p>
      </header>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="lg:w-56 shrink-0 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left',
                  activeTab === tab.id
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <Icon className="w-4 h-4" /> {tab.label}
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              </button>
            );
          })}
          <button className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </nav>

        {/* Content Panel */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {activeTab === 'account' && (
            <>
              <h2 className="text-lg font-bold text-slate-900">Account Information</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input label="Full Name" defaultValue={user?.name || 'Alex Rivera'} leftIcon={<UserIcon className="w-4 h-4" />} />
                <Input label="Email Address" type="email" defaultValue={user?.email || 'alex.rivera@traveltoheaven.com'} leftIcon={<Mail className="w-4 h-4" />} />
                <Input label="Location" defaultValue={user?.location || 'Zurich, Switzerland'} leftIcon={<MapPin className="w-4 h-4" />} />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue={user?.bio || 'Passionate explorer seeking hidden gems across the globe.'}
                    className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-y"
                  />
                </div>
                <Button variant="primary" type="submit">Save Changes</Button>
              </form>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h2 className="text-lg font-bold text-slate-900">Security Settings</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input
                  label="Current Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <Input label="New Password" type="password" placeholder="••••••••" leftIcon={<Lock className="w-4 h-4" />} />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" leftIcon={<Lock className="w-4 h-4" />} />
                <Button variant="primary" type="submit">Update Password</Button>
              </form>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'New followers', desc: 'When someone follows your profile' },
                  { label: 'Story likes & comments', desc: 'When your stories receive engagement' },
                  { label: 'Photo likes', desc: 'When your photos get liked' },
                  { label: 'Review activity', desc: 'When reviews you wrote receive helpful votes' },
                  { label: 'Community updates', desc: 'Platform news and feature updates' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                    <ToggleSwitch defaultChecked />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <h2 className="text-lg font-bold text-slate-900">Appearance</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Theme</label>
                  <div className="flex gap-3">
                    {['Light', 'Dark', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={cn(
                          'px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer',
                          theme === 'Light'
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-400'
                        )}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Language</label>
                  <select className="w-full max-w-xs bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50">
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>日本語</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
