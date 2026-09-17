import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURRENT_DEV_USER, MOCK_DESTINATIONS } from '@/mock';
import type { FeedPost } from './InstagramFeedCard';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: FeedPost) => void;
}

const PRESET_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
    title: 'Santorini Sunset Caldera',
    destId: 'dest-1',
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
    title: 'Kyoto Arashiyama Bamboo',
    destId: 'dest-2',
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    title: 'Banff Moraine Glacial Lake',
    destId: 'dest-3',
  },
  {
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
    title: 'Amalfi Coast Cliffside',
    destId: 'dest-4',
  },
  {
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
    title: 'Serengeti Savannah Wildlife',
    destId: 'dest-5',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    title: 'Swiss Alps Mountain Trail',
    destId: 'dest-1',
  },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
  const [photoUrl, setPhotoUrl] = useState(PRESET_PHOTOS[0].url);
  const [selectedDestId, setSelectedDestId] = useState('dest-1');
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait' | 'landscape'>('portrait');
  const [caption, setCaption] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_PHOTOS[0]) => {
    setPhotoUrl(preset.url);
    setSelectedDestId(preset.destId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim() || !caption.trim()) return;

    const matchedDest = MOCK_DESTINATIONS.find((d) => d.id === selectedDestId);

    const newPost: FeedPost = {
      id: `feed-${Date.now()}`,
      author: {
        id: CURRENT_DEV_USER.id,
        name: CURRENT_DEV_USER.name,
        username: CURRENT_DEV_USER.name.toLowerCase().replace(/\s+/g, '_'),
        avatarUrl: CURRENT_DEV_USER.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: CURRENT_DEV_USER.location,
        isVerified: true,
      },
      destination: matchedDest
        ? {
            id: matchedDest.id,
            name: matchedDest.name,
            city: matchedDest.city,
            country: matchedDest.country,
          }
        : undefined,
      image: photoUrl.trim(),
      aspectRatio,
      caption: caption.trim(),
      likesCount: 1,
      commentsCount: 0,
      createdAt: 'Just now',
      isLiked: true,
      comments: [],
    };

    onPostCreated(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-slate-900">Create New Travel Post</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Preset Photo Grid Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pick from Scenic Presets or Paste URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group',
                    photoUrl === preset.url
                      ? 'border-teal-500 ring-2 ring-teal-400/40 scale-105'
                      : 'border-transparent hover:opacity-80'
                  )}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                  {photoUrl === preset.url && (
                    <div className="absolute inset-0 bg-teal-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Photo URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Custom Photo Link</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'square', label: '1:1 Square' },
                  { id: 'portrait', label: '4:5 Portrait' },
                  { id: 'landscape', label: '16:9 Landscape' },
                ] as const
              ).map((ratio) => (
                <button
                  key={ratio.id}
                  type="button"
                  onClick={() => setAspectRatio(ratio.id)}
                  className={cn(
                    'py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center',
                    aspectRatio === ratio.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  )}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Tag */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tag Destination</label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              {MOCK_DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.country}
                </option>
              ))}
            </select>
          </div>

          {/* Caption */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Caption & Hashtags</label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption... e.g. Early sunrise hike watching clouds drift over the caldera #wanderlust #greece #adventure"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none leading-relaxed"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer transition-all active:scale-95"
            >
              <span>Share to Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
