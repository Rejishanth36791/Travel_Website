import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setPageTitle, cn } from '@/lib/utils';
import {
  Users, UserPlus, UserCheck, Globe, MapPin, BookOpen, Camera,
  Plane, Award, Search, MessageSquare, Heart, Share2, Send,
} from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import type { UserProfile } from '@/types/user.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useTravel } from '@/context/TravelContext';
import { MOCK_COMMUNITY_POSTS, type CommunityPost } from '@/mock/community';

export const CommunityPage: React.FC = () => {
  const { travelers, isUserFollowed, toggleFollowUser } = useTravel();
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>(['post-1']);

  useEffect(() => {
    setPageTitle('Traveler Community — Travel to Heaven');
  }, []);

  const stats = [
    { label: 'Active Travelers', value: '24.5K', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Stories Shared', value: '8.2K', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Photos Uploaded', value: '52K', icon: Camera, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Trips Planned', value: '15.8K', icon: Plane, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: travelers[0],
      content: newPostText.trim(),
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = prev.includes(postId);
      const next = isLiked ? prev.filter((id) => id !== postId) : [...prev, postId];
      setPosts((list) =>
        list.map((p) =>
          p.id === postId ? { ...p, likesCount: p.likesCount + (isLiked ? -1 : 1) } : p
        )
      );
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-widest">
          <Globe className="w-3.5 h-3.5" /> Global Community
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Traveler Community</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Connect with intrepid explorers, share real-time field dispatches, ask route advice, and find companions for your upcoming expeditions.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', s.bg, s.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Community Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Box */}
          <form onSubmit={handleCreatePost} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Share with the Community</h2>
            <textarea
              rows={3}
              placeholder="Where are you exploring right now? Ask travel tips or share a route insight..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Markdown formatting supported</span>
              <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
                Post Dispatch
              </Button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => {
              const isLiked = likedPosts.includes(post.id);
              return (
                <article key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <Link to={`/travelers/${post.author.id}`} className="flex items-center gap-3 group">
                      <Avatar name={post.author.name} imageUrl={post.author.avatarUrl} size="md" />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {post.author.name}
                        </h3>
                        {post.location && (
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {post.location}
                          </p>
                        )}
                      </div>
                    </Link>
                    <span className="text-[11px] text-slate-400">Just now</span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="rounded-xl overflow-hidden max-h-72 border border-slate-100">
                      <img src={post.image} alt="Post media" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-slate-500 text-xs font-semibold">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={cn('flex items-center gap-1.5 transition-colors', isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600')}
                    >
                      <Heart className={cn('w-4 h-4', isLiked && 'fill-rose-600')} /> {post.likesCount}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                      <MessageSquare className="w-4 h-4" /> {post.commentsCount} comments
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors ml-auto">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Travelers */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Featured Globetrotters</h2>
              <Link to="/travelers" className="text-xs font-bold text-sky-600 hover:text-sky-700">
                View All
              </Link>
            </div>
            <div className="space-y-3.5">
              {travelers.slice(0, 4).map((traveler) => {
                const isFollowing = isUserFollowed(traveler.id);
                return (
                  <div key={traveler.id} className="flex items-center justify-between gap-3">
                    <Link to={`/travelers/${traveler.id}`} className="flex items-center gap-3 min-w-0">
                      <Avatar name={traveler.name} imageUrl={traveler.avatarUrl} size="sm" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate hover:text-sky-600">{traveler.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{traveler.location || 'Global Nomad'}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleFollowUser(traveler.id)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer',
                        isFollowing ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-sky-600 text-white hover:bg-sky-700'
                      )}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white p-7 shadow-lg text-center space-y-3">
            <Award className="w-8 h-8 mx-auto text-amber-300" />
            <h3 className="font-serif text-xl font-bold">Become a Travel to Heaven Creator</h3>
            <p className="text-white/80 text-xs">
              Publish rich multimedia travelogues, guidebooks, and photography seen by hundreds of thousands of explorers.
            </p>
            <Link to="/stories/create" className="inline-block mt-2">
              <span className="px-5 py-2.5 rounded-full bg-white text-violet-700 text-xs font-bold hover:bg-white/90 shadow-md">
                Start Writing
              </span>
            </Link>
          </div>
        </div>
      </div>
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
              <p className="text-xs text-slate-400">Trips</p>
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
