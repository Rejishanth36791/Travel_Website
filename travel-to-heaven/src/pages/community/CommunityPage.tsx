import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { setPageTitle, cn } from '@/lib/utils';
import {
  MapPin, PlusSquare, Search, UserPlus, UserCheck
} from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import type { UserProfile } from '@/types/user.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useTravel } from '@/context/TravelContext';
import { CURRENT_DEV_USER } from '@/mock';
import { InstagramStoriesBar } from '@/components/instagram/InstagramStoriesBar';
import { InstagramFeedCard, type FeedPost } from '@/components/instagram/InstagramFeedCard';
import { CreatePostModal } from '@/components/instagram/CreatePostModal';

const INITIAL_INSTAGRAM_POSTS: FeedPost[] = [
  {
    id: 'post-ig-1',
    author: {
      id: 'user-elena',
      name: 'Elena Vassiliou',
      username: 'elena_santorini',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      location: 'Oia, Santorini, Greece',
      isVerified: true,
    },
    destination: {
      id: 'dest-1',
      name: 'Santorini Caldera',
      city: 'Oia',
      country: 'Greece',
    },
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    caption: 'Nothing compares to golden hour overlooking the cobalt Aegean caldera. Pro-tip: skip the castle ruins crowds and head to Imerovigli for a peaceful sunset. #santorini #greece #caldera #sunsetlovers #wanderlust',
    likesCount: 1420,
    commentsCount: 38,
    createdAt: '2 HOURS AGO',
    isLiked: true,
    isSaved: true,
    comments: [
      { id: 'c-1', userName: 'alex_rivera', text: 'Stunning capture Elena! Adding Imerovigli to my next trip itinerary.', timeAgo: '1h' },
      { id: 'c-2', userName: 'marco_amalfi', text: 'The light on the white cubic villas is pure poetry! 🏛️', timeAgo: '30m' },
    ],
  },
  {
    id: 'post-ig-2',
    author: {
      id: 'user-kenji',
      name: 'Kenji Sato',
      username: 'kenji_kyoto',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      location: 'Kyoto, Japan',
      isVerified: true,
    },
    destination: {
      id: 'dest-2',
      name: 'Arashiyama Bamboo Grove',
      city: 'Kyoto',
      country: 'Japan',
    },
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    caption: 'Arrived at 6:15 AM before the first tour bus. Hearing the wind gently rustle the towering green stalks in total silence is an unforgettable Zen experience. #kyoto #japan #arashiyama #zen #slowtravel',
    likesCount: 2185,
    commentsCount: 64,
    createdAt: '5 HOURS AGO',
    isLiked: false,
    comments: [
      { id: 'c-3', userName: 'yuki_travels', text: 'Best advice ever! Early morning is the only way to experience it.', timeAgo: '3h' },
    ],
  },
  {
    id: 'post-ig-3',
    author: {
      id: 'user-clara',
      name: 'Clara Tremblay',
      username: 'clara_rockies',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      location: 'Banff National Park, Canada',
      isVerified: true,
    },
    destination: {
      id: 'dest-3',
      name: 'Banff & Moraine Lake',
      city: 'Banff',
      country: 'Canada',
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    caption: 'Paddling through glacial rock-flour turquoise waters under the Ten Peaks. Remember to reserve the Parks Canada shuttle well in advance! #banff #canada #rockies #naturelovers #adventure',
    likesCount: 1890,
    commentsCount: 42,
    createdAt: '8 HOURS AGO',
    isLiked: false,
  },
  {
    id: 'post-ig-4',
    author: {
      id: 'user-marco',
      name: 'Marco Rossi',
      username: 'marco_amalfi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      location: 'Positano, Italy',
      isVerified: false,
    },
    destination: {
      id: 'dest-4',
      name: 'Amalfi Coast & Positano',
      city: 'Positano',
      country: 'Italy',
    },
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: 'portrait',
    caption: 'Pastel cliffside villas tumbling into the Tyrrhenian Sea. Always take the sea ferry between towns — the breeze and views are unmatched. #positano #amalficoast #italytravel #mediterranean',
    likesCount: 1640,
    commentsCount: 29,
    createdAt: '12 HOURS AGO',
    isLiked: false,
  },
];

export const CommunityPage: React.FC = () => {
  const { travelers, isUserFollowed, toggleFollowUser } = useTravel();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_INSTAGRAM_POSTS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'forYou' | 'following' | 'advice'>('forYou');

  useEffect(() => {
    setPageTitle('Travel Community Feed — Travel to Heaven');
    if (searchParams.get('create') === 'true') {
      setIsCreateOpen(true);
    }
  }, [searchParams]);

  const handlePostCreated = (newPost: FeedPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLikeToggle = (postId: string, isLiked: boolean) => {
    setPosts((list) =>
      list.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked,
              likesCount: p.likesCount + (isLiked ? 1 : -1),
            }
          : p
      )
    );
  };

  const handleSaveToggle = (postId: string, isSaved: boolean) => {
    setPosts((list) =>
      list.map((p) => (p.id === postId ? { ...p, isSaved } : p))
    );
  };

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'following') {
      return isUserFollowed(p.author.id);
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Instagram Stories Bar */}
      <InstagramStoriesBar onAddStoryClick={() => setIsCreateOpen(true)} />

      {/* Main Grid: Instagram Feed on Left + Sticky Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feed Stream */}
        <div className="lg:col-span-8 space-y-6">
          {/* Feed Filter Segmented Bar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('forYou')}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer',
                  activeTab === 'forYou'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                )}
              >
                For You
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer',
                  activeTab === 'following'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                )}
              >
                Following
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusSquare className="w-4 h-4" />}
              onClick={() => setIsCreateOpen(true)}
            >
              New Post
            </Button>
          </div>

          {/* Feed Stream */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <InstagramFeedCard
                key={post.id}
                post={post}
                onLikeToggle={handleLikeToggle}
                onSaveToggle={handleSaveToggle}
              />
            ))}
          </div>
        </div>

        {/* Right Sticky Sidebar (Desktop only) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          {/* Current User Row */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600">
                <img
                  src={CURRENT_DEV_USER.avatarUrl}
                  alt={CURRENT_DEV_USER.name}
                  className="w-full h-full rounded-full object-cover p-px bg-white"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {CURRENT_DEV_USER.name.toLowerCase().replace(/\s+/g, '_')}
                </p>
                <p className="text-[11px] text-slate-400">{CURRENT_DEV_USER.name}</p>
              </div>
            </div>
            <Link to="/profile" className="text-xs font-bold text-teal-600 hover:underline">
              View
            </Link>
          </div>

          {/* Suggested Explorers */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Suggested for you</span>
              <Link to="/travelers" className="text-xs font-bold text-slate-900 hover:underline">
                See All
              </Link>
            </div>

            <div className="space-y-3.5">
              {travelers.slice(0, 5).map((t) => {
                const isFollowing = isUserFollowed(t.id);
                return (
                  <div key={t.id} className="flex items-center justify-between">
                    <Link to={`/travelers/${t.id}`} className="flex items-center gap-2.5 group">
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-100 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                          {t.name.toLowerCase().replace(/\s+/g, '_')}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-28">
                          {t.location || 'Explorer'}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={() => toggleFollowUser(t.id)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer',
                        isFollowing
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-xs'
                      )}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trending Travel Hashtags */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Trending Destinations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                '#santorini', '#kyoto', '#amalficoast', '#banff',
                '#swissalps', '#solotravel', '#slowtravel', '#naturelovers'
              ].map((tag) => (
                <Link
                  key={tag}
                  to={`/destinations?query=${encodeURIComponent(tag.replace('#', ''))}`}
                  className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Meta */}
          <div className="text-[11px] text-slate-400 space-y-1 px-1">
            <p>© 2026 TRAVEL TO HEAVEN FROM GLOBETROTTERS</p>
            <p>Built for authentic exploration, trip planning & advice</p>
          </div>
        </aside>
      </div>

      {/* Instagram Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export const TravelerCard: React.FC<{ traveler: UserProfile }> = ({ traveler }) => {
  const { isUserFollowed, toggleFollowUser } = useTravel();
  const isFollowing = isUserFollowed(traveler.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col items-center text-center space-y-3 hover:shadow-md transition-all group">
      <Link to={`/travelers/${traveler.id}`} className="space-y-2">
        <Avatar name={traveler.name} imageUrl={traveler.avatarUrl} size="lg" className="mx-auto group-hover:scale-105 transition-transform" />
        <div>
          <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{traveler.name}</h3>
          {traveler.location && (
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> {traveler.location}
            </p>
          )}
        </div>
      </Link>

      {traveler.bio && (
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{traveler.bio}</p>
      )}

      {/* Stats */}
      <div className="w-full grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 text-center">
        <div>
          <p className="text-xs font-bold text-slate-800">{traveler.storiesCount || 0}</p>
          <p className="text-[9px] text-slate-400">Stories</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">{traveler.photosCount || 0}</p>
          <p className="text-[9px] text-slate-400">Photos</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">{traveler.followersCount || 0}</p>
          <p className="text-[9px] text-slate-400">Followers</p>
        </div>
      </div>

      <button
        onClick={() => toggleFollowUser(traveler.id)}
        className={cn(
          'w-full py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
          isFollowing
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm'
        )}
      >
        {isFollowing ? (
          <span className="flex items-center justify-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Following</span>
        ) : (
          <span className="flex items-center justify-center gap-1"><UserPlus className="w-3.5 h-3.5" /> Follow</span>
        )}
      </button>
    </div>
  );
};

export const TravelersPage: React.FC = () => {
  const { travelers } = useTravel();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 350);

  useEffect(() => { setPageTitle('Explore Travelers — Travel to Heaven'); }, []);

  const filtered = travelers.filter((t) =>
    !debouncedQuery || t.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || t.bio?.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="font-serif text-3xl font-extrabold text-slate-900">Travelers Directory</h1>
        <p className="text-slate-600 text-sm">Discover fellow explorers and nomads from around the globe.</p>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, location, or bio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((t) => <TravelerCard key={t.id} traveler={t} />)}
      </div>
    </div>
  );
};

export const TravelerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { travelers, isUserFollowed, toggleFollowUser } = useTravel();
  const traveler = travelers.find((t) => t.id === id) || travelers[0];
  const isFollowing = isUserFollowed(traveler.id);

  useEffect(() => {
    if (traveler) {
      setPageTitle(`${traveler.name} — Travel to Heaven`);
    }
  }, [traveler]);

  if (!traveler) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {/* Cover */}
        <div className="h-40 bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500" />

        {/* Profile Info */}
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <Avatar name={traveler.name} imageUrl={traveler.avatarUrl} size="xl" className="ring-4 ring-white" />
            <div className="flex-1 space-y-1">
              <h1 className="font-serif text-2xl font-bold text-slate-900">{traveler.name}</h1>
              {traveler.location && (
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {traveler.location}
                </p>
              )}
            </div>
            <button
              onClick={() => toggleFollowUser(traveler.id)}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm',
                isFollowing
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
              )}
            >
              {isFollowing ? 'Following' : 'Follow Traveler'}
            </button>
          </div>

          {traveler.bio && (
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{traveler.bio}</p>
          )}

          {/* Interests */}
          {traveler.travelInterests && (
            <div className="mt-4 flex flex-wrap gap-2">
              {traveler.travelInterests.map((interest) => (
                <span key={interest} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-extrabold text-slate-900">{traveler.storiesCount || 0}</p>
              <p className="text-xs text-slate-400">Stories</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{traveler.photosCount || 0}</p>
              <p className="text-xs text-slate-400">Photos</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{traveler.tripsCount || 0}</p>
              <p className="text-xs text-slate-400">Spots</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{traveler.followersCount || 0}</p>
              <p className="text-xs text-slate-400">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
