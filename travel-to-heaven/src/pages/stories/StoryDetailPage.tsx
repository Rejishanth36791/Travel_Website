import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  Heart, Bookmark, Share2, Clock, Calendar, ArrowLeft,
  MessageCircle, Send, Edit3, Trash2,
} from 'lucide-react';
import type { StoryComment } from '@/types/story.types';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ErrorState } from '@/components/common/ErrorState';
import { useTravel } from '@/context/TravelContext';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    stories,
    likedStoryIds,
    bookmarkedStoryIds,
    toggleLikeStory,
    toggleBookmarkStory,
    deleteStory,
    addStoryComment,
  } = useTravel();

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<StoryComment[]>([]);

  const story = stories.find((s) => s.id === id) || stories[0];
  const isLiked = story ? likedStoryIds.includes(story.id) : false;
  const isBookmarked = story ? bookmarkedStoryIds.includes(story.id) : false;

  useEffect(() => {
    if (story) {
      setPageTitle(`${story.title} — Travel to Heaven`);
    }
  }, [story]);

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState message="Story not found." onRetry={() => navigate('/stories')} />
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = addStoryComment(story.id, commentText.trim());
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this story?')) {
      deleteStory(story.id);
      navigate('/stories');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-95 w-full overflow-hidden">
        <img
          src={story.coverImageUrl}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Stories
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-semibold tracking-wider uppercase text-white">
              {story.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2">
              <div className="flex items-center gap-2">
                <Avatar name={story.author.name} imageUrl={story.author.avatarUrl} size="sm" />
                <span className="font-medium text-white">{story.author.name}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(story.publishedAt || story.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {story.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Floating Action Bar */}
        <div className="flex items-center justify-between py-3 border-y border-slate-200 text-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLikeStory(story.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer font-semibold',
                isLiked
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-rose-600')} />
              <span>{story.likesCount}</span>
            </button>
            <button
              onClick={() => toggleBookmarkStory(story.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer font-semibold',
                isBookmarked
                  ? 'bg-amber-50 text-amber-600'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-amber-600')} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => alert('Story URL copied to clipboard!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-all cursor-pointer font-semibold"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/stories/edit/${story.id}`}>
              <Button variant="ghost" size="sm" leftIcon={<Edit3 className="w-3.5 h-3.5" />}>
                Edit
              </Button>
            </Link>
            <Button variant="ghost" size="sm" leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>

        {/* Lead Excerpt */}
        <p className="text-xl font-serif text-slate-700 leading-relaxed italic border-l-4 border-sky-500 pl-6 py-1">
          {story.excerpt}
        </p>

        {/* Story Body */}
        <article className="prose prose-slate lg:prose-lg max-w-none space-y-6 text-slate-800 leading-relaxed font-sans">
          {story.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="font-serif text-2xl font-bold text-slate-900 mt-8 mb-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index} className="border-l-4 border-amber-500 pl-4 py-2 my-4 italic text-slate-600 bg-amber-50/50 rounded-r-xl">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={index} className="text-base text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
            {story.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar name={story.author.name} imageUrl={story.author.avatarUrl} size="lg" />
          <div className="space-y-1 flex-1">
            <h4 className="font-serif text-lg font-bold text-slate-900">Written by {story.author.name}</h4>
            <p className="text-sm text-slate-600">{story.author.bio || 'Passionate explorer sharing dispatches from the road.'}</p>
          </div>
          <Link to={`/travelers/${story.author.id}`}>
            <Button variant="outline" size="sm">View Profile</Button>
          </Link>
        </div>

        {/* Comments Section */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-sky-600" />
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Comments ({story.commentsCount + comments.length})
            </h3>
          </div>

          {/* New Comment Box */}
          <form onSubmit={handleAddComment} className="flex gap-3">
            <textarea
              rows={2}
              placeholder="Share your thoughts or ask the author a question..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none shadow-xs"
            />
            <Button variant="primary" type="submit" className="shrink-0 self-end">
              <Send className="w-4 h-4" />
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar name={c.user.name} imageUrl={c.user.avatarUrl} size="sm" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{c.user.name}</h5>
                    <p className="text-[10px] text-slate-400">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 pl-11">{c.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export const CreateStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { createStory, destinations } = useTravel();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Cultural Exploration');
  const [tags, setTags] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [destId, setDestId] = useState('');

  useEffect(() => {
    setPageTitle('Write Your Travel Story — Travel to Heaven');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const matchedDest = destinations.find((d) => d.id === destId);
    const newStory = createStory({
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      category,
      tags: tags ? tags.split(',').map((t) => t.trim()) : ['Travel'],
      coverImageUrl: coverImageUrl.trim() || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      destination: matchedDest,
      readingTimeMinutes: Math.max(3, Math.round(content.split(' ').length / 200)),
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString(),
    });

    navigate(`/stories/${newStory.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-2">
        <Link to="/stories" className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Stories
        </Link>
        <h1 className="font-serif text-3xl font-extrabold text-slate-900">Write Your Travel Story</h1>
        <p className="text-slate-600 text-sm">Share your journey, reflections, and guidebooks with fellow explorers.</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Story Title"
          placeholder="A captivating title for your adventure..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              {['Cultural Exploration', 'Alpine Adventures', 'Island Living', 'Wildlife & Safari', 'Slow Travel'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Destination</label>
            <select
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="">Select Destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Cover Image URL"
          placeholder="https://images.unsplash.com/..."
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />

        <Input
          label="Tags"
          placeholder="Trekking, Photography, Alps (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Short Excerpt / Hook</label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A compelling one or two sentence summary that hooks readers..."
            className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Story Narrative</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            required
            placeholder="Begin your story here... Describe sights, smells, conversations with locals, and trail memories."
            className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-y"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" variant="primary" size="lg">Publish Story</Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate('/stories')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export const EditStoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories, updateStory } = useTravel();
  const story = stories.find((s) => s.id === id);

  const [title, setTitle] = useState(story?.title || '');
  const [excerpt, setExcerpt] = useState(story?.excerpt || '');
  const [content, setContent] = useState(story?.content || '');

  useEffect(() => {
    setPageTitle('Edit Story — Travel to Heaven');
    if (story) {
      setTitle(story.title);
      setExcerpt(story.excerpt);
      setContent(story.content);
    }
  }, [story]);

  if (!story) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateStory(story.id, {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
    });
    navigate(`/stories/${story.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-2">
        <Link to={`/stories/${id}`} className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Story
        </Link>
        <h1 className="font-serif text-3xl font-extrabold text-slate-900">Edit Travel Story</h1>
        <p className="text-slate-600 text-sm">Editing Story: {story.title}</p>
      </header>

      <form className="space-y-6" onSubmit={handleUpdate}>
        <Input label="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Excerpt</label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Story Narrative</label>
          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-y"
            required
          />
        </div>
        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" variant="primary" size="lg">Save Changes</Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate(`/stories/${id}`)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};
