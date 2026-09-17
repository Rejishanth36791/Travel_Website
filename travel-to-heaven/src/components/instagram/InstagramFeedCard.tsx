import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal,
  MapPin, Check, Smile, Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURRENT_DEV_USER } from '@/mock';

export interface FeedPost {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    location?: string;
    isVerified?: boolean;
  };
  destination?: {
    id: string;
    name: string;
    city: string;
    country: string;
  };
  image: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
  comments?: Array<{
    id: string;
    userName: string;
    userAvatar?: string;
    text: string;
    timeAgo: string;
  }>;
}

interface InstagramFeedCardProps {
  post: FeedPost;
  onLikeToggle?: (postId: string, isLiked: boolean) => void;
  onSaveToggle?: (postId: string, isSaved: boolean) => void;
  onAddComment?: (postId: string, commentText: string) => void;
}

export const InstagramFeedCard: React.FC<InstagramFeedCardProps> = ({
  post,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(
    post.comments || [
      {
        id: 'c-1',
        userName: 'wanderer_lucas',
        text: 'The colors in this shot are absolutely breathtaking! Added to my travel bucket list 📸',
        timeAgo: '2h',
      },
      {
        id: 'c-2',
        userName: 'sophia.explores',
        text: 'Did you need a permit or guide to reach this viewpoint?',
        timeAgo: '45m',
      },
    ]
  );
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Double-tap to like
  const handleImageDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      onLikeToggle?.(post.id, true);
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 900);
  };

  const toggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikesCount((prev) => prev + (next ? 1 : -1));
    onLikeToggle?.(post.id, next);
  };

  const toggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    onSaveToggle?.(post.id, next);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: `comm-${Date.now()}`,
      userName: CURRENT_DEV_USER.name.toLowerCase().replace(/\s+/g, '_'),
      text: newComment.trim(),
      timeAgo: 'Just now',
    };

    setCommentsList((prev) => [...prev, added]);
    onAddComment?.(post.id, newComment.trim());
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/destinations/${post.destination?.id || 'dest-1'}`);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2500);
    setShowMenu(false);
  };

  // Format caption to highlight hashtags
  const renderCaption = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-teal-600 font-semibold cursor-pointer hover:underline">
            {part}{' '}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden max-w-xl mx-auto transition-all">
      {/* 1. Card Header */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/travelers/${post.author.id}`} className="relative group">
            <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-tr from-amber-500 via-rose-500 to-fuchsia-600">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-full h-full rounded-full object-cover p-px bg-white"
              />
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <Link
                to={`/travelers/${post.author.id}`}
                className="text-xs font-bold text-slate-900 hover:text-teal-600 transition-colors"
              >
                {post.author.username || post.author.name.toLowerCase().replace(/\s+/g, '_')}
              </Link>
              {post.author.isVerified && (
                <span className="w-3.5 h-3.5 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              )}
            </div>
            {post.destination ? (
              <Link
                to={`/destinations/${post.destination.id}`}
                className="text-[11px] text-slate-500 hover:text-teal-600 flex items-center gap-0.5 transition-colors font-medium"
              >
                <MapPin className="w-3 h-3 text-teal-600" />
                <span>{post.destination.name}, {post.destination.country}</span>
              </Link>
            ) : post.author.location ? (
              <span className="text-[11px] text-slate-400 flex items-center gap-0.5 font-medium">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{post.author.location}</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* 3-Dots Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 z-30 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-1 animate-scale-in text-xs font-semibold text-slate-700">
              <button
                onClick={handleShare}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Post</span>
              </button>
              <button
                onClick={toggleSave}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Remove from Saved' : 'Save to Board'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Edge-to-Edge Media with Double-Tap to Like */}
      <div
        onDoubleClick={handleImageDoubleClick}
        className="relative bg-slate-950 aspect-4/5 w-full overflow-hidden select-none cursor-pointer flex items-center justify-center"
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
        />

        {/* Pulsing White/Red Heart Overlay on Double Tap */}
        {showHeartOverlay && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-ping opacity-90" />
          </div>
        )}
      </div>

      {/* 3. Action Bar (Heart, Comment, Share, Bookmark) */}
      <div className="p-3.5 sm:p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="group cursor-pointer transition-transform active:scale-125"
              aria-label="Like post"
            >
              <Heart
                className={cn(
                  'w-6 h-6 transition-colors',
                  isLiked
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-800 hover:text-slate-600'
                )}
              />
            </button>
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="cursor-pointer text-slate-800 hover:text-slate-600 transition-transform active:scale-110"
              aria-label="Comment"
            >
              <MessageCircle className="w-6 h-6 stroke-[1.8]" />
            </button>
            <button
              onClick={handleShare}
              className="cursor-pointer text-slate-800 hover:text-slate-600 transition-transform active:scale-110"
              aria-label="Share"
            >
              <Send className="w-5 h-5 -rotate-12 stroke-[1.8]" />
            </button>
          </div>

          <button
            onClick={toggleSave}
            className="cursor-pointer transition-transform active:scale-125"
            aria-label="Bookmark"
          >
            <Bookmark
              className={cn(
                'w-6 h-6 transition-colors stroke-[1.8]',
                isSaved ? 'text-slate-900 fill-slate-900' : 'text-slate-800 hover:text-slate-600'
              )}
            />
          </button>
        </div>

        {/* 4. Likes Counter */}
        <p className="text-xs font-bold text-slate-900">
          {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
        </p>

        {/* 5. Caption */}
        <div className="text-xs leading-relaxed space-x-1.5">
          <Link
            to={`/travelers/${post.author.id}`}
            className="font-bold text-slate-900 hover:underline"
          >
            {post.author.username || post.author.name.toLowerCase().replace(/\s+/g, '_')}
          </Link>
          <span className="text-slate-700">{renderCaption(post.caption)}</span>
        </div>

        {/* 6. Comments Preview */}
        {commentsList.length > 0 && (
          <div className="space-y-1 pt-1">
            {commentsList.length > 2 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-medium"
              >
                View all {commentsList.length} comments
              </button>
            )}

            <div className="space-y-1 text-xs">
              {(showAllComments ? commentsList : commentsList.slice(-2)).map((c) => (
                <div key={c.id} className="flex items-baseline gap-1.5 leading-snug">
                  <span className="font-bold text-slate-900">{c.userName}</span>
                  <span className="text-slate-600 flex-1">{c.text}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{c.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Timestamp */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {post.createdAt}
        </p>

        {/* 8. Inline Quick Comment Input Bar */}
        <form
          onSubmit={handlePostComment}
          className="flex items-center gap-2 pt-2 border-t border-slate-100"
        >
          <Smile className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder:opacity-50 focus:outline-none"
          />
          {newComment.trim() && (
            <button
              type="submit"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer transition-colors"
            >
              Post
            </button>
          )}
        </form>
      </div>

      {/* Toast */}
      {showCopiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-slate-800 animate-slide-up">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Post link copied to clipboard!</span>
        </div>
      )}
    </article>
  );
};
