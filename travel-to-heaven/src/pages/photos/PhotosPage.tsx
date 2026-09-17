import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  Camera, Heart, MessageCircle, Download, Share2, ArrowLeft,
  Upload, X,
} from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import type { Photo } from '@/types/photo.types';
import { Button } from '@/components/common/Button';
import { useTravel } from '@/context/TravelContext';

export const PhotosPage: React.FC = () => {
  const { photos, destinations, addPhoto } = useTravel();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload form state
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [destId, setDestId] = useState('');

  useEffect(() => {
    setPageTitle('Photo Gallery — Travel to Heaven');
  }, []);

  const CATEGORIES = ['All', 'Mountain', 'Romantic', 'Cultural', 'Wildlife', 'Adventure'];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.destination?.category === selectedCategory;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;

    addPhoto({
      url: photoUrl.trim(),
      caption: caption.trim() || undefined,
      destinationId: destId || undefined,
    });

    setPhotoUrl('');
    setCaption('');
    setDestId('');
    setShowUploadModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Visual Dispatches</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Travel Photography</h1>
          <p className="text-slate-600 text-sm">Breathtaking moments captured by explorers across seven continents.</p>
        </div>
        <Button variant="primary" leftIcon={<Upload className="w-4 h-4" />} onClick={() => setShowUploadModal(true)}>
          Upload Photo
        </Button>
      </header>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleUpload} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">Share a Travel Photograph</h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Image URL</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <p className="text-[11px] text-slate-400">Direct image link from Unsplash, Pexels, or cloud storage</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Caption / Description</label>
              <textarea
                rows={2}
                placeholder="Describe the moment, setting, or camera details..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Related Destination</label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="">Select destination (optional)</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowUploadModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Publish Photo</Button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0',
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid (Masonry Columns) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { likedPhotoIds, toggleLikePhoto } = useTravel();
  const isLiked = likedPhotoIds.includes(photo.id);

  return (
    <Link
      to={`/photos/${photo.id}`}
      className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all break-inside-avoid"
    >
      <img
        src={photo.url}
        alt={photo.caption || 'Travel photo'}
        className={cn(
          'w-full object-cover group-hover:scale-105 transition-transform duration-700',
          photo.aspectRatio === 'portrait' ? 'h-80' : photo.aspectRatio === 'square' ? 'h-64' : 'h-52'
        )}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleLikePhoto(photo.id);
            }}
            className={cn(
              'p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer',
              isLiked ? 'bg-rose-500 text-white border-rose-400' : 'bg-black/40 text-white border-white/20'
            )}
          >
            <Heart className={cn('w-4 h-4', isLiked && 'fill-white')} />
          </button>
        </div>

        <div className="space-y-2">
          {photo.caption && (
            <p className="text-white text-sm font-medium line-clamp-2">{photo.caption}</p>
          )}

          <div className="flex items-center justify-between text-xs text-white/80 pt-1">
            <div className="flex items-center gap-2">
              <Avatar name={photo.photographer.name} imageUrl={photo.photographer.avatarUrl} size="xs" />
              <span className="font-semibold truncate max-w-30">{photo.photographer.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-white/80" /> {photo.likesCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" /> {photo.commentsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PhotoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photos, likedPhotoIds, toggleLikePhoto } = useTravel();
  const photo = photos.find((p) => p.id === id) || photos[0];
  const isLiked = photo ? likedPhotoIds.includes(photo.id) : false;

  useEffect(() => {
    if (photo) {
      setPageTitle(`${photo.caption || 'Travel Photograph'} — Travel to Heaven`);
    }
  }, [photo]);

  if (!photo) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/photos"
        className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-semibold w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Photo View */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-slate-950 flex items-center justify-center">
            <img
              src={photo.url}
              alt={photo.caption || 'Travel photograph'}
              className="w-full max-h-[75vh] object-contain mx-auto"
            />
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Photographer Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar name={photo.photographer.name} imageUrl={photo.photographer.avatarUrl} size="md" />
              <div>
                <p className="text-sm font-bold text-slate-900">{photo.photographer.name}</p>
                <p className="text-xs text-slate-500">{formatDate(photo.createdAt)}</p>
              </div>
            </div>

            {photo.caption && (
              <p className="text-sm text-slate-700 leading-relaxed">{photo.caption}</p>
            )}

            {photo.destination && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{photo.destination.name}</span>
                <span className="text-slate-400">{photo.destination.country}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleLikePhoto(photo.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer',
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-600'
                )}
              >
                <Heart className={cn('w-4 h-4', isLiked && 'fill-rose-500')} />
                {photo.likesCount}
              </button>
              <button
                onClick={() => alert('Link copied to clipboard!')}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="Share photo"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href={photo.url}
                target="_blank"
                rel="noreferrer"
                download
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="Download full size"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* EXIF Metadata Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Photo Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Likes</span>
                <span className="font-semibold text-slate-900">{photo.likesCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Comments</span>
                <span className="font-semibold text-slate-900">{photo.commentsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aspect Ratio</span>
                <span className="font-semibold text-slate-900 capitalize">{photo.aspectRatio || 'Landscape'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Taken</span>
                <span className="font-semibold text-slate-900">{formatDate(photo.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
