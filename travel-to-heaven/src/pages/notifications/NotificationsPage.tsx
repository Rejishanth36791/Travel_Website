import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  Bell, BellOff, CheckCheck, Heart, MessageCircle,
  UserPlus, Star, Camera, MapPin, Settings,
  Shield, Palette, Globe, LogOut, ChevronRight, Mail, Lock,
  User as UserIcon, Eye, EyeOff, Trash2, Check,
  Bookmark, Grid3X3, Tag, Plus, ExternalLink, X, Send
} from 'lucide-react';
import type { NotificationType } from '@/types/community.types';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useTravel } from '@/context/TravelContext';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/common/ThemeToggle';

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

const PROFILE_POSTS = [
  {
    id: 'p-1',
    title: 'Sunrise above the Clouds in Lauterbrunnen',
    location: 'Lauterbrunnen, Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    likes: 1420,
    comments: 64,
    caption: 'The early morning light hitting the Swiss alpine peaks is unlike anything on earth. Stay tuned for the hiking trail guide! 🏔️✨',
  },
  {
    id: 'p-2',
    title: 'Morning Serenity in Arashiyama Bamboo Grove',
    location: 'Kyoto, Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    likes: 2180,
    comments: 98,
    caption: 'Arrived at 6:15 AM before anyone else. The quiet rustle of the bamboo stalks in the morning breeze is pure meditation. 🎋',
  },
  {
    id: 'p-3',
    title: 'Cliffside Golden Hour in Oia',
    location: 'Santorini, Greece',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    likes: 3410,
    comments: 142,
    caption: 'Caldera views from the edge of the world. Whitewashed buildings bathed in warm Mediterranean amber light. 🇬🇷🌅',
  },
  {
    id: 'p-4',
    title: 'Turquoise Waters of Lake Louise',
    location: 'Banff, Canada',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    likes: 1890,
    comments: 77,
    caption: 'Glacial mineral runoff gives this water its otherworldly turquoise glow. Canoeing here felt like gliding on glass. 🛶',
  },
  {
    id: 'p-5',
    title: 'Coastal Drama along the Amalfi Cliffside',
    location: 'Amalfi Coast, Italy',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    likes: 2740,
    comments: 115,
    caption: 'Lemon trees clinging to vertical cliffs above the Tyrrhenian sea. The Path of the Gods trail is a must-do! 🍋🇮🇹',
  },
  {
    id: 'p-6',
    title: 'Serengeti Golden Plains Sunset',
    location: 'Serengeti, Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    likes: 3105,
    comments: 133,
    caption: 'Watched a pride of lions resting under an umbrella acacia as the fiery red sun dipped below the African savanna horizon. 🦁🌅',
  },
  {
    id: 'p-7',
    title: 'Neon Nights in Shinjuku',
    location: 'Tokyo, Japan',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    likes: 1650,
    comments: 59,
    caption: 'Drizzle on the asphalt, reflections of towering billboards, and tiny izakayas serving hot ramen. 🍜✨',
  },
  {
    id: 'p-8',
    title: 'Fjords and Waterfalls of Geiranger',
    location: 'Geirangerfjord, Norway',
    imageUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    likes: 2430,
    comments: 88,
    caption: 'Cascading waterfalls roaring down sheer rock walls directly into the emerald fjord waters. Nature at its most epic. 🇳🇴💦',
  },
  {
    id: 'p-9',
    title: 'Secret Cove along the Algarve Cliffs',
    location: 'Algarve, Portugal',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    likes: 1970,
    comments: 72,
    caption: 'Found this secluded sea arch after a 40-minute hike along the cliff tops. Not a soul in sight. 🌊🇵🇹',
  },
];

const STORY_HIGHLIGHTS = [
  { id: 'h-1', title: 'Swiss Alps', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80' },
  { id: 'h-2', title: 'Kyoto \'24', cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80' },
  { id: 'h-3', title: 'Santorini', cover: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=200&q=80' },
  { id: 'h-4', title: 'Banff Lakes', cover: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=200&q=80' },
  { id: 'h-5', title: 'Safari \'23', cover: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80' },
  { id: 'h-6', title: 'Food & Cafes', cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80' },
];

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { destinations, favoriteDestinationIds } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [selectedPost, setSelectedPost] = useState<typeof PROFILE_POSTS[0] | null>(null);
  const [postLikes, setPostLikes] = useState<Record<string, number>>({});
  const [postLiked, setPostLiked] = useState<Record<string, boolean>>({});
  const [postComments, setPostComments] = useState<Record<string, Array<{ id: string; user: string; text: string; time: string }>>>({});
  const [commentInput, setCommentInput] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const [doubleTapAnim, setDoubleTapAnim] = useState(false);

  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [bio, setBio] = useState(user?.bio || 'Alpine mountaineer, documentary photographer & slow-travel advocate. Exploring hidden valleys & mountain summits 🏔️🎒 Pure exploration, zero bookings.');
  const [location, setLocation] = useState(user?.location || 'Zurich, Switzerland');

  useEffect(() => {
    setPageTitle('Alex Rivera (@alex_rivera) • Travel to Heaven Profile');
  }, []);

  const currentUser = user || {
    name: 'Alex Rivera',
    email: 'alex.rivera@traveltoheaven.com',
    bio: 'Alpine mountaineer, documentary photographer & slow-travel advocate. Exploring hidden valleys & mountain summits 🏔️🎒 Pure exploration, zero bookings.',
    location: 'Zurich, Switzerland',
    travelInterests: ['Alpine Treks', 'Cultural Heritage', 'Eco-Lodges'],
    storiesCount: 18,
    photosCount: PROFILE_POSTS.length,
    tripsCount: 7,
    followersCount: 3840,
    followingCount: 412,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  };

  const handleSaveProfile = (e: React.FormEvent) => {
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

  const savedDestinations = destinations.filter((d) => favoriteDestinationIds.includes(d.id));

  const getLikes = (post: typeof PROFILE_POSTS[0]) => {
    return postLikes[post.id] ?? post.likes;
  };

  const isLiked = (postId: string) => {
    return postLiked[postId] || false;
  };

  const togglePostLike = (post: typeof PROFILE_POSTS[0]) => {
    const current = isLiked(post.id);
    const count = getLikes(post);
    setPostLiked((prev) => ({ ...prev, [post.id]: !current }));
    setPostLikes((prev) => ({ ...prev, [post.id]: current ? count - 1 : count + 1 }));
  };

  const handleDoubleTapPost = (post: typeof PROFILE_POSTS[0]) => {
    setDoubleTapAnim(true);
    if (!isLiked(post.id)) {
      togglePostLike(post);
    }
    setTimeout(() => setDoubleTapAnim(false), 900);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newEntry = {
      id: `c-${Date.now()}`,
      user: 'alex_rivera',
      text: commentInput.trim(),
      time: 'Just now',
    };
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newEntry],
    }));
    setCommentInput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Instagram Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 pb-6 border-b border-slate-200">
        {/* Large Circular Avatar with Instagram Story Gradient Ring */}
        <div className="relative shrink-0 group cursor-pointer">
          <div className="p-1 rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600 shadow-lg">
            <div className="p-0.5 bg-white rounded-full">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Profile Info Block */}
        <div className="flex-1 space-y-4 text-center sm:text-left min-w-0">
          {/* Row 1: Username & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>alex_rivera</span>
              <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]" title="Verified Traveler">
                <Check className="w-2.5 h-2.5 stroke-3" />
              </span>
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors cursor-pointer"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2000);
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors cursor-pointer relative"
              >
                {shareCopied ? 'Link Copied!' : 'Share Profile'}
              </button>
              <Link
                to="/settings"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Account Settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Row 2: Instagram Counters (Posts, Followers, Following) */}
          <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 text-sm">
            <div>
              <span className="font-extrabold text-slate-900">{PROFILE_POSTS.length}</span>{' '}
              <span className="text-slate-500">posts</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900">{(currentUser.followersCount || 3840).toLocaleString()}</span>{' '}
              <span className="text-slate-500">followers</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900">{currentUser.followingCount || 412}</span>{' '}
              <span className="text-slate-500">following</span>
            </div>
          </div>

          {/* Row 3: Bio Details */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 mt-3 text-left">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Edit</h3>
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Save</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-slate-900">{currentUser.name}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Documentary Photographer & Mountaineer
              </div>
              <p className="text-slate-700 leading-relaxed max-w-lg">
                {currentUser.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs pt-1">
                {currentUser.location && (
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" /> {currentUser.location}
                  </span>
                )}
                <a
                  href="https://traveltoheaven.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 font-bold hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> traveltoheaven.com/alex
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Story Highlights Tray */}
      <div className="space-y-2">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 no-scrollbar">
          {STORY_HIGHLIGHTS.map((hl) => (
            <div key={hl.id} className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 border border-slate-300 group-hover:border-slate-400 transition-colors shadow-xs">
                <img
                  src={hl.cover}
                  alt={hl.title}
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 group-hover:text-slate-900 line-clamp-1 max-w-17.5 text-center">
                {hl.title}
              </span>
            </div>
          ))}

          {/* Add Highlight */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-slate-300 hover:border-slate-400 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 line-clamp-1">New</span>
          </div>
        </div>
      </div>

      {/* 3. Instagram Tabs: POSTS / SAVED / TAGGED */}
      <div className="border-t border-slate-200">
        <div className="flex justify-center gap-12 sm:gap-16 -mt-px text-xs uppercase tracking-widest font-bold">
          <button
            onClick={() => setActiveTab('posts')}
            className={cn(
              'flex items-center gap-1.5 py-3 border-t-2 transition-all cursor-pointer',
              activeTab === 'posts'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            )}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={cn(
              'flex items-center gap-1.5 py-3 border-t-2 transition-all cursor-pointer',
              activeTab === 'saved'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            )}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            className={cn(
              'flex items-center gap-1.5 py-3 border-t-2 transition-all cursor-pointer',
              activeTab === 'tagged'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            )}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Tagged</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6">
          {PROFILE_POSTS.map((post) => {
            const liked = isLiked(post.id);
            const likes = getLikes(post);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square bg-slate-900 rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Classic Instagram Hover Scrim */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 sm:gap-7 text-white font-bold text-xs sm:text-base pointer-events-none">
                  <div className="flex items-center gap-1.5 drop-shadow-md">
                    <Heart className={cn('w-4 h-4 sm:w-5 sm:h-5', liked ? 'fill-rose-500 text-rose-500' : 'fill-white text-white')} />
                    <span>{likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 drop-shadow-md">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Only you can see what you've saved</p>
            <Link to="/discover" className="text-xs font-bold text-sky-600 hover:underline">
              Browse More Spots →
            </Link>
          </div>

          {savedDestinations.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-12 text-center space-y-2 border border-slate-200">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-sm text-slate-800">No saved places yet</p>
              <p className="text-xs text-slate-500">Save your dream spots from Discover or Destinations to view them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {savedDestinations.map((dest) => (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all"
                >
                  <img src={dest.coverImageUrl} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-1 inline-block">
                      {dest.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{dest.name}</h4>
                    <p className="text-[10px] text-slate-300 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-sky-400" /> {dest.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'tagged' && (
        <div className="bg-slate-50 rounded-2xl p-12 text-center space-y-2 border border-slate-200">
          <Tag className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-bold text-sm text-slate-800">Photos of you</p>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">When fellow travelers tag you in their adventure shots, they will appear here.</p>
        </div>
      )}

      {/* 5. Instagram Profile Post Viewer Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Photo with Double Tap Heart */}
            <div
              className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer group/photo min-h-70 md:min-h-125"
              onDoubleClick={() => handleDoubleTapPost(selectedPost)}
            >
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover max-h-[50vh] md:max-h-[80vh]"
              />

              {doubleTapAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                  <div className="animate-in zoom-in-50 fade-in duration-200">
                    <Heart className="w-24 h-24 text-white fill-white drop-shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-pulse" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white/90 font-medium pointer-events-none opacity-70 group-hover/photo:opacity-100 transition-opacity">
                Double tap to like
              </div>
            </div>

            {/* Right Instagram Sidebar */}
            <div className="md:w-2/5 flex flex-col h-full bg-white max-h-[45vh] md:max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 truncate block">alex_rivera</span>
                    <p className="text-[10px] text-slate-500 truncate flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-sky-500" /> {selectedPost.location}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Caption & Comments Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <p className="text-slate-800 leading-relaxed">
                      <strong className="font-bold text-slate-900 mr-1.5">alex_rivera</strong>
                      {selectedPost.caption}
                    </p>
                    <p className="text-[10px] text-slate-400">1d ago</p>
                  </div>
                </div>

                {/* Default comments */}
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-50">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                    EL
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <p className="text-slate-800">
                      <strong className="font-bold text-slate-900 mr-1.5">elena_nomad</strong>
                      Incredible composition! Did you shoot this on 35mm or digital?
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span>4h</span>
                      <span>8 likes</span>
                    </div>
                  </div>
                </div>

                {(postComments[selectedPost.id] || []).map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 animate-in fade-in">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                      AR
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <p className="text-slate-800">
                        <strong className="font-bold text-slate-900 mr-1.5">{c.user}</strong>
                        {c.text}
                      </p>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions & Comment Input */}
              <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePostLike(selectedPost)}
                      className="p-1 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5 transition-transform active:scale-125',
                          isLiked(selectedPost.id) ? 'text-rose-600 fill-rose-600' : ''
                        )}
                      />
                    </button>
                    <button
                      onClick={() => {
                        const input = document.getElementById('profile-comment-input');
                        input?.focus();
                      }}
                      className="p-1 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        setShareCopied(true);
                        setTimeout(() => setShareCopied(false), 2000);
                      }}
                      className="p-1 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-1 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs font-bold text-slate-900">
                  {getLikes(selectedPost).toLocaleString()} likes
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(selectedPost.id);
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <input
                    id="profile-comment-input"
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-900 placeholder:opacity-50 focus:outline-none py-1"
                  />
                  {commentInput.trim() && (
                    <button type="submit" className="text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer">
                      Post
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
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
              <h2 className="text-lg font-bold text-slate-900">Appearance Settings</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Interface Theme</label>
                  <ThemeToggle variant="pill" size="md" />
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
