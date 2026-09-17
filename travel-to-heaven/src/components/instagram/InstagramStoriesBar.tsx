import React, { useState, useEffect } from 'react';
import { Plus, X, Heart, Send, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURRENT_DEV_USER } from '@/mock';

export interface StorySlide {
  id: string;
  mediaUrl: string;
  caption: string;
  location: string;
  timeAgo: string;
}

export interface UserStory {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isUnseen: boolean;
  slides: StorySlide[];
}

const MOCK_STORIES_DATA: UserStory[] = [
  {
    id: 'story-1',
    userId: 'user-elena',
    userName: 'elena_santorini',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isUnseen: true,
    slides: [
      {
        id: 's1-1',
        mediaUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
        caption: 'Golden hour hitting the caldera windmills in Oia 🌅 #santorini',
        location: 'Oia, Santorini, Greece',
        timeAgo: '2h ago',
      },
      {
        id: 's1-2',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        caption: 'Secret cove at Red Beach before the tourist catamarans arrive 🌊',
        location: 'Akrotiri, Santorini',
        timeAgo: '1h ago',
      },
    ],
  },
  {
    id: 'story-2',
    userId: 'user-kenji',
    userName: 'kenji_kyoto',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isUnseen: true,
    slides: [
      {
        id: 's2-1',
        mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
        caption: 'Morning mist floating through the Arashiyama bamboo path 🎋',
        location: 'Arashiyama, Kyoto, Japan',
        timeAgo: '4h ago',
      },
      {
        id: 's2-2',
        mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85',
        caption: '10,000 Torii gates under soft sunrise light ✨',
        location: 'Fushimi Inari, Kyoto',
        timeAgo: '3h ago',
      },
    ],
  },
  {
    id: 'story-3',
    userId: 'user-clara',
    userName: 'clara_rockies',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    isUnseen: true,
    slides: [
      {
        id: 's3-1',
        mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
        caption: 'Moraine Lake looking completely surreal this morning 🏔️',
        location: 'Banff National Park, Canada',
        timeAgo: '5h ago',
      },
    ],
  },
  {
    id: 'story-4',
    userId: 'user-marco',
    userName: 'marco_amalfi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isUnseen: false,
    slides: [
      {
        id: 's4-1',
        mediaUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
        caption: 'Limone granita with a cliffside view of Positano 🍋',
        location: 'Positano, Amalfi Coast, Italy',
        timeAgo: '7h ago',
      },
    ],
  },
  {
    id: 'story-5',
    userId: 'user-juma',
    userName: 'juma_safari',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    isUnseen: false,
    slides: [
      {
        id: 's5-1',
        mediaUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
        caption: 'Pride of lions resting under acacia branches at dawn 🦁',
        location: 'Serengeti, Tanzania',
        timeAgo: '8h ago',
      },
    ],
  },
  {
    id: 'story-6',
    userId: 'user-yuki',
    userName: 'yuki_travels',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    isUnseen: false,
    slides: [
      {
        id: 's6-1',
        mediaUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85',
        caption: 'Desert sunset road trip across the southwest canyons 🏜️',
        location: 'Utah, United States',
        timeAgo: '11h ago',
      },
    ],
  },
];

export const InstagramStoriesBar: React.FC<{ onAddStoryClick?: () => void }> = ({ onAddStoryClick }) => {
  const [stories, setStories] = useState<UserStory[]>(MOCK_STORIES_DATA);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [likedSlideIds, setLikedSlideIds] = useState<string[]>([]);
  const [showHeartSplash, setShowHeartSplash] = useState(false);

  // Auto-advance timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const currentStory = stories[activeStoryIndex];
    if (!currentStory) return;

    const timer = setTimeout(() => {
      if (activeSlideIndex < currentStory.slides.length - 1) {
        setActiveSlideIndex((prev) => prev + 1);
      } else if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex((prev) => (prev !== null ? prev + 1 : 0));
        setActiveSlideIndex(0);
      } else {
        // End of all stories
        setActiveStoryIndex(null);
        setActiveSlideIndex(0);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, activeSlideIndex, isPaused, stories]);

  const openStory = (storyIdx: number) => {
    setActiveStoryIndex(storyIdx);
    setActiveSlideIndex(0);
    // Mark as seen
    setStories((prev) =>
      prev.map((s, idx) => (idx === storyIdx ? { ...s, isUnseen: false } : s))
    );
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setActiveSlideIndex(0);
  };

  const handleNextSlide = () => {
    if (activeStoryIndex === null) return;
    const currentStory = stories[activeStoryIndex];
    if (activeSlideIndex < currentStory.slides.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    } else if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex((prev) => (prev !== null ? prev + 1 : 0));
      setActiveSlideIndex(0);
    } else {
      closeStory();
    }
  };

  const handlePrevSlide = () => {
    if (activeStoryIndex === null) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    } else if (activeStoryIndex > 0) {
      const prevStory = stories[activeStoryIndex - 1];
      setActiveStoryIndex((prev) => (prev !== null ? prev - 1 : 0));
      setActiveSlideIndex(prevStory.slides.length - 1);
    }
  };

  const handleHeartReaction = () => {
    if (activeStoryIndex === null) return;
    const currentSlide = stories[activeStoryIndex]?.slides[activeSlideIndex];
    if (!currentSlide) return;

    setShowHeartSplash(true);
    setTimeout(() => setShowHeartSplash(false), 800);

    setLikedSlideIds((prev) =>
      prev.includes(currentSlide.id) ? prev.filter((id) => id !== currentSlide.id) : [...prev, currentSlide.id]
    );
  };

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;
  const activeSlide = activeStory ? activeStory.slides[activeSlideIndex] : null;
  const isCurrentSlideLiked = activeSlide ? likedSlideIds.includes(activeSlide.id) : false;

  return (
    <>
      {/* Horizontal Story Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none py-1 px-1">
          {/* Your Story (+) Button */}
          <div
            onClick={onAddStoryClick}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 border-dashed border-slate-300 group-hover:border-teal-500 transition-colors">
                <img
                  src={CURRENT_DEV_USER.avatarUrl}
                  alt="Your story"
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center border-2 border-white shadow-xs">
                <Plus className="w-3.5 h-3.5 stroke-3" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-700 truncate max-w-16">
              Your story
            </span>
          </div>

          {/* User Stories List */}
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => openStory(idx)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group select-none"
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105',
                  story.isUnseen
                    ? 'bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600 shadow-xs'
                    : 'bg-slate-200'
                )}
              >
                <div className="w-full h-full rounded-full overflow-hidden p-0.5 bg-white">
                  <img
                    src={story.userAvatar}
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-700 truncate max-w-16 group-hover:text-teal-600 transition-colors">
                {story.userName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Instagram Story Viewer Modal */}
      {activeStory && activeSlide && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 animate-fade-in select-none">
          {/* Close Button */}
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Desktop Left / Right Slide Arrow Buttons */}
          <button
            onClick={handlePrevSlide}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextSlide}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Story Mobile/Modal Container */}
          <div
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="relative w-full max-w-md h-full sm:h-[88vh] max-h-205 bg-black sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Background Story Image */}
            <img
              src={activeSlide.mediaUrl}
              alt={activeSlide.caption}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

            {/* Tap Left / Tap Right Navigation Touch Areas */}
            <div className="absolute inset-0 grid grid-cols-2 z-20">
              <div onClick={handlePrevSlide} className="h-full cursor-pointer" />
              <div onClick={handleNextSlide} className="h-full cursor-pointer" />
            </div>

            {/* Center Bursting Heart Reaction Animation */}
            {showHeartSplash && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-ping opacity-90" />
              </div>
            )}

            {/* Top Bar: Progress Bars + User Info */}
            <div className="relative z-30 p-4 space-y-3">
              {/* Segmented Progress Bars */}
              <div className="flex items-center gap-1.5">
                {activeStory.slides.map((_, idx) => (
                  <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full bg-white transition-all',
                        idx < activeSlideIndex
                          ? 'w-full'
                          : idx === activeSlideIndex
                          ? 'w-full duration-5000 ease-linear'
                          : 'w-0'
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeStory.userAvatar}
                    alt={activeStory.userName}
                    className="w-9 h-9 rounded-full object-cover border border-white/40"
                  />
                  <div>
                    <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                      <span>{activeStory.userName}</span>
                      <span className="text-white/60 font-normal">• {activeSlide.timeAgo}</span>
                    </p>
                    {activeSlide.location && (
                      <p className="text-[10px] text-white/80 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-teal-400" />
                        <span>{activeSlide.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Caption + Quick Reply & Reaction */}
            <div className="relative z-30 p-4 space-y-3">
              {/* Caption */}
              {activeSlide.caption && (
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-white text-xs leading-relaxed">
                  {activeSlide.caption}
                </div>
              )}

              {/* Interaction Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`Reply to ${activeStory.userName}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className="w-full bg-white/15 border border-white/25 rounded-full px-4 py-2.5 text-xs text-white placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-md"
                  />
                </div>

                {replyText.trim() ? (
                  <button
                    onClick={() => setReplyText('')}
                    className="p-2.5 rounded-full bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleHeartReaction}
                    className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-transform active:scale-125 cursor-pointer backdrop-blur-md"
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5 transition-colors',
                        isCurrentSlideLiked ? 'text-rose-500 fill-rose-500' : 'text-white'
                      )}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
