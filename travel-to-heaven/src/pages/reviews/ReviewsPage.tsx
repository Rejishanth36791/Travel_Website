import React, { useEffect, useState } from 'react';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import { MessageSquare, ThumbsUp, Search, PlusCircle, Star, X } from 'lucide-react';
import type { Review } from '@/types/review.types';
import { Avatar } from '@/components/common/Avatar';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';
import { useTravel } from '@/context/TravelContext';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview, toggleHelpfulReview, destinations } = useTravel();
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);

  // New review form
  const [targetId, setTargetId] = useState(destinations[0]?.id || 'dest-1');
  const [targetTitle, setTargetTitle] = useState(destinations[0]?.name || 'Santorini Caldera');
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    setPageTitle('Travel Reviews — Travel to Heaven');
  }, []);

  const RATING_FILTERS = [
    { label: 'All Ratings', value: 'all' as const },
    { label: '5 ★', value: 5 },
    { label: '4 ★', value: 4 },
    { label: '3 ★', value: 3 },
  ];

  const filtered = reviews.filter((r) => {
    if (ratingFilter !== 'all' && Math.round(r.rating) !== ratingFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.targetTitle.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        r.user.name.toLowerCase().includes(q) ||
        (r.title && r.title.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      targetId,
      targetType: 'DESTINATION',
      targetTitle,
      rating,
      title: reviewTitle.trim() || undefined,
      comment: comment.trim(),
    });

    setReviewTitle('');
    setComment('');
    setShowWriteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Community Feedback</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Travel Reviews</h1>
          <p className="text-slate-600 text-sm">Honest reviews from travelers who visited destinations, trails, and retreats.</p>
        </div>
        <Button variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />} onClick={() => setShowWriteModal(true)}>
          Write Review
        </Button>
      </header>

      {/* Write Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleSubmitReview} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">Write a Destination Review</h3>
              <button type="button" onClick={() => setShowWriteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Select Destination</label>
              <select
                value={targetId}
                onChange={(e) => {
                  const dest = destinations.find((d) => d.id === e.target.value);
                  setTargetId(e.target.value);
                  if (dest) setTargetTitle(dest.name);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star className={cn('w-6 h-6', star <= rating ? 'fill-amber-400' : 'text-slate-300')} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Review Headline</label>
              <input
                type="text"
                placeholder="E.g., Breathtaking sunrise hike along the caldera"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Detailed Feedback & Tips</label>
              <textarea
                rows={4}
                required
                placeholder="What should future travelers know? Best times, hidden spots, transport tips..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowWriteModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Submit Review</Button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by destination, reviewer, or review text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-xs"
          />
        </div>
        <div className="flex gap-2">
          {RATING_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setRatingFilter(f.value)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                ratingFilter === f.value
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-2xl border border-slate-200">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-semibold text-slate-800">No reviews found matching your filter</p>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or write the first review!</p>
          </div>
        ) : (
          filtered.map((rev) => (
            <ReviewItemCard key={rev.id} review={rev} onToggleHelpful={() => toggleHelpfulReview(rev.id)} />
          ))
        )}
      </div>
    </div>
  );
};

const ReviewItemCard: React.FC<{ review: Review; onToggleHelpful: () => void }> = ({ review, onToggleHelpful }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3.5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Avatar name={review.user.name} imageUrl={review.user.avatarUrl} size="md" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{review.user.name}</h3>
            <p className="text-xs text-slate-500">
              Reviewed <span className="font-semibold text-sky-600">{review.targetTitle}</span> • {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>

      {review.title && (
        <h4 className="text-base font-serif font-bold text-slate-900">{review.title}</h4>
      )}

      <p className="text-sm text-slate-700 leading-relaxed">{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 pt-1">
          {review.images.map((img, i) => (
            <img key={i} src={img} alt="Review attachment" className="w-20 h-20 rounded-xl object-cover border border-slate-100" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <span>Verified Traveler Review</span>
        <button
          onClick={onToggleHelpful}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer font-semibold',
            review.isHelpful
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          )}
        >
          <ThumbsUp className={cn('w-3.5 h-3.5', review.isHelpful && 'fill-emerald-700')} />
          <span>Helpful ({review.helpfulCount})</span>
        </button>
      </div>
    </article>
  );
};
