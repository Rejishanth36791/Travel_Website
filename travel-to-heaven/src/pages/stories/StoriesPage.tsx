import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle, cn } from '@/lib/utils';
import {
  BookOpen, Sparkles, Clock, Heart, MessageCircle, PenLine,
  TrendingUp, ArrowUpRight, Search,
} from 'lucide-react';
import type { Story } from '@/types/story.types';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { useTravel } from '@/context/TravelContext';

const STORY_CATEGORIES = [
  'All',
  'Cultural Exploration',
  'Alpine Adventures',
  'Island Living',
  'Wildlife & Safari',
  'Slow Travel',
];

export const StoriesPage: React.FC = () => {
  const { stories } = useTravel();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPageTitle('Travel Stories & Guides — Travel to Heaven');
  }, []);

  const filteredStories = stories.filter((story) => {
    const matchesCat = activeCategory === 'All' || story.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> Travel Journal & Dispatches
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Travel Stories
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            First-person chronicles, slow-travel reflections, and in-depth cultural itineraries authored by passionate explorers.
          </p>
        </div>
        <Link to="/stories/create">
          <Button variant="primary" leftIcon={<PenLine className="w-4 h-4" />}>
            Write Story
          </Button>
        </Link>
      </header>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories, topics, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-xs"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STORY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer',
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-20 space-y-3 bg-white rounded-3xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-slate-900">No stories found</h3>
          <p className="text-sm text-slate-500">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, idx) => (
            <StoryCard key={story.id} story={story} featured={idx === 0} />
          ))}
        </div>
      )}

      {/* Trending Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 text-white p-10 sm:p-12 shadow-xl">
        <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Share Your Journey</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">Your Story Can Inspire Thousands</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Write about your travel experiences, share route tips, and connect with a global community of explorers on Travel to Heaven.
          </p>
          <Link to="/stories/create" className="inline-block mt-2">
            <span className="px-6 py-3 rounded-full bg-white text-indigo-700 text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shadow-md cursor-pointer">
              <PenLine className="w-4 h-4" /> Start Writing <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Story Card Component
const StoryCard: React.FC<{ story: Story; featured?: boolean }> = ({ story, featured }) => {
  return (
    <Link
      to={`/stories/${story.id}`}
      className={cn(
        'group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden',
        featured && 'md:col-span-2 lg:col-span-1'
      )}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={story.coverImageUrl}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-wider uppercase text-white">
          {story.category}
        </span>
        {featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-[10px] font-bold tracking-wider text-white flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
          {story.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {story.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Avatar name={story.author.name} imageUrl={story.author.avatarUrl} size="xs" />
            <span className="font-medium text-slate-700 truncate max-w-28">{story.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {story.readingTimeMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" /> {story.likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> {story.commentsCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
