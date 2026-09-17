import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import {
  MapPin, Heart, Star, Clock, Globe, Languages, Coins,
  Calendar, Camera, ArrowLeft, Share2, ChevronLeft, ChevronRight,
  Bookmark, Check, Plus, MessageSquare, ThumbsUp, Send, X, ExternalLink,
  Lightbulb, ShieldAlert, Utensils, Car
} from 'lucide-react';
import type { Destination } from '@/types/destination.types';
import type { AdviceCategory } from '@/types/advice.types';
import { homeService } from '@/services/home.service';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorState } from '@/components/common/ErrorState';
import { useTravel } from '@/context/TravelContext';
import { cn } from '@/lib/utils';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    destinations,
    isDestinationFavorite,
    toggleFavoriteDestination,
    collections,
    addDestinationToCollection,
    reviews,
    addReview,
    toggleHelpfulReview,
    advice,
    addAdvice,
    toggleHelpfulAdvice,
  } = useTravel();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Workflow Modals & States
  const [showSaveCollectionModal, setShowSaveCollectionModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Advice Form State
  const [adviceFilter, setAdviceFilter] = useState<string>('ALL');
  const [adviceTitle, setAdviceTitle] = useState('');
  const [adviceCategory, setAdviceCategory] = useState<AdviceCategory>('SAFETY');
  const [adviceContent, setAdviceContent] = useState('');
  const [adviceSeason, setAdviceSeason] = useState('Year-round');

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewTripType, setReviewTripType] = useState('Couple');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const found = destinations.find((d) => d.id === id);
        if (found) {
          setDestination(found);
          setPageTitle(found.name);
        } else {
          const all = await homeService.getFeaturedDestinations();
          const fallback = all.find((d) => d.id === id) || all[0];
          setDestination(fallback);
          setPageTitle(fallback.name);
        }
      } catch {
        setError('Unable to load destination details.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id, destinations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !reviewTitle.trim() || !reviewComment.trim()) return;

    addReview({
      targetId: destination.id,
      targetType: 'DESTINATION',
      targetTitle: destination.name,
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
    });

    setReviewTitle('');
    setReviewComment('');
    setShowReviewModal(false);
    showToast('Your verified review was published!');
  };

  const handleCreateAdvice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !adviceTitle.trim() || !adviceContent.trim()) return;

    addAdvice({
      destinationId: destination.id,
      title: adviceTitle.trim(),
      content: adviceContent.trim(),
      category: adviceCategory,
      season: adviceSeason,
    });

    setAdviceTitle('');
    setAdviceContent('');
    setShowAdviceModal(false);
    showToast('Your travel advice has been published!');
  };

  const destinationAdvice = advice.filter((a) => a.destinationId === destination?.id);
  const filteredAdvice =
    adviceFilter === 'ALL'
      ? destinationAdvice
      : destinationAdvice.filter((a) => a.category === adviceFilter);

  const destinationReviews = reviews.filter((r) => r.targetId === destination?.id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading destination..." />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState message={error || 'Destination not found.'} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const isFavorite = isDestinationFavorite(destination.id);

  // Build gallery images array
  const galleryImages = [
    { url: destination.coverImageUrl, caption: destination.name },
    ...(destination.images || []).map((img) => ({ url: img.url, caption: img.caption || '' })),
  ];

  const infoItems = [
    { icon: Calendar, label: 'Best Time', value: destination.bestTimeToVisit || 'Year-round' },
    { icon: Languages, label: 'Language', value: destination.language || 'Various' },
    { icon: Coins, label: 'Currency', value: destination.currency || 'Multiple' },
    { icon: Clock, label: 'Time Zone', value: destination.timeZone || 'Varies' },
    { icon: Star, label: 'Average Rating', value: destination.rating.toFixed(1) },
    { icon: Globe, label: 'Region', value: destination.region },
  ];

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up text-sm font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-105 w-full overflow-hidden">
        <img
          src={galleryImages[activeImageIndex]?.url || destination.coverImageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Destinations</span>
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <button
            onClick={() => {
              toggleFavoriteDestination(destination.id);
              showToast(isFavorite ? 'Removed from favorites' : 'Saved to favorites!');
            }}
            className={cn(
              'p-3 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg',
              isFavorite
                ? 'bg-rose-500 text-white border-rose-400 scale-105'
                : 'bg-black/40 text-white border-white/20 hover:bg-rose-600'
            )}
            aria-label="Toggle favorite"
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-white')} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all cursor-pointer shadow-lg"
            aria-label="Share destination"
            title="Share Destination"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Arrows */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            <button
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/80 px-2">
              {activeImageIndex + 1} / {galleryImages.length}
            </span>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold tracking-wider uppercase text-white">
              {destination.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                {destination.city}, {destination.country}
              </span>
              <RatingStars rating={destination.rating} reviewsCount={destination.reviewsCount} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            leftIcon={<Lightbulb className="w-4 h-4" />}
            onClick={() => setShowAdviceModal(true)}
          >
            Share Advice / Tip
          </Button>
          <Button
            variant="outline"
            leftIcon={<Bookmark className="w-4 h-4 text-purple-500" />}
            onClick={() => setShowSaveCollectionModal(true)}
          >
            Save to Collection Board
          </Button>
          <Button
            variant="outline"
            leftIcon={<Camera className="w-4 h-4 text-sky-600" />}
            onClick={() => navigate(`/photos`)}
          >
            Explore Community Photos
          </Button>
        </div>

        {/* Main Grid: Details + Key Info Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column — Description, Activities, Reviews */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900">Overview</h2>
              <p className="text-slate-700 leading-relaxed">{destination.description}</p>
              {destination.overview && (
                <p className="text-slate-600 leading-relaxed">{destination.overview}</p>
              )}
            </section>

            {/* History */}
            {destination.history && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Historical Significance</h2>
                <p className="text-slate-600 leading-relaxed">{destination.history}</p>
              </section>
            )}

            {/* Cultural Importance */}
            {destination.culturalImportance && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Cultural Importance</h2>
                <p className="text-slate-600 leading-relaxed">{destination.culturalImportance}</p>
              </section>
            )}

            {/* Natural Beauty */}
            {destination.naturalBeauty && (
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-slate-900">Natural Beauty</h2>
                <p className="text-slate-600 leading-relaxed">{destination.naturalBeauty}</p>
              </section>
            )}

            {/* Activities */}
            {destination.activities && destination.activities.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">Activities & Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-shadow space-y-2"
                    >
                      <h4 className="font-bold text-sm text-slate-900">{activity.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{activity.description}</p>
                      {activity.rating && (
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-slate-700">{activity.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Traveler Advice & Insider Tips Section */}
            <section id="advice" className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal-600" />
                    <h2 className="font-serif text-2xl font-bold text-slate-900">
                      Traveler Advice & Insider Tips ({destinationAdvice.length})
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Authentic tips on safety, best timing, food, transport and etiquette
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Lightbulb className="w-4 h-4" />}
                  onClick={() => setShowAdviceModal(true)}
                >
                  Share Advice
                </Button>
              </div>

              {/* Advice Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { key: 'ALL', label: 'All Advice' },
                  { key: 'SAFETY', label: 'Safety & Scams' },
                  { key: 'BEST_TIME', label: 'Best Time' },
                  { key: 'LOCAL_CUSTOMS', label: 'Local Customs' },
                  { key: 'FOOD_DINING', label: 'Food & Dining' },
                  { key: 'TRANSPORT', label: 'Transport' },
                  { key: 'BUDGET_TIPS', label: 'Money & Tipping' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setAdviceFilter(cat.key)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border',
                      adviceFilter === cat.key
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {filteredAdvice.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
                  <Lightbulb className="w-8 h-8 text-teal-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No advice in this category yet</p>
                  <p className="text-xs text-slate-500">Have you visited {destination.name}? Help future travelers!</p>
                  <button
                    onClick={() => setShowAdviceModal(true)}
                    className="mt-2 text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                  >
                    Share your tip
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAdvice.map((tip) => {
                    const isSafety = tip.category === 'SAFETY';
                    const isBestTime = tip.category === 'BEST_TIME';
                    const isFood = tip.category === 'FOOD_DINING';
                    const isTransport = tip.category === 'TRANSPORT';
                    const isCustoms = tip.category === 'LOCAL_CUSTOMS';

                    const categoryBadge = isSafety
                      ? { label: 'Safety & Scams', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: ShieldAlert }
                      : isBestTime
                      ? { label: 'Best Time & Season', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: Clock }
                      : isFood
                      ? { label: 'Food & Dining', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Utensils }
                      : isTransport
                      ? { label: 'Transport & Transit', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Car }
                      : isCustoms
                      ? { label: 'Local Customs', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Globe }
                      : { label: 'Money & Tipping', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Coins };

                    const CategoryIcon = categoryBadge.icon;

                    return (
                      <div
                        key={tip.id}
                        className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3.5 hover:shadow-xs transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={tip.author.avatar}
                              alt={tip.author.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-100"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-slate-900">{tip.author.name}</p>
                                {tip.verifiedLocal && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                    Local Guide
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400">
                                {tip.author.badge || tip.author.location || 'Explorer'}
                              </p>
                            </div>
                          </div>

                          <span
                            className={cn(
                              'inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border',
                              categoryBadge.color
                            )}
                          >
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {categoryBadge.label}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-snug">{tip.title}</h4>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{tip.content}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {tip.season || 'Year-round'}
                          </span>

                          <button
                            onClick={() => toggleHelpfulAdvice(tip.id)}
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border',
                              tip.isHelpful
                                ? 'bg-teal-50 text-teal-700 border-teal-200 font-bold'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            )}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful ({tip.helpfulCount})</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Verified Traveler Reviews Section */}
            <section className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Traveler Reviews ({destinationReviews.length})
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Verified experiences from globetrotters</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                  onClick={() => setShowReviewModal(true)}
                >
                  Write Review
                </Button>
              </div>

              {destinationReviews.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
                  <Star className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No reviews yet for this destination</p>
                  <p className="text-xs text-slate-500">Be the first to share your travel insights!</p>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="mt-2 text-xs font-bold text-sky-600 hover:underline cursor-pointer"
                  >
                    Add your review
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {destinationReviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.user.avatarUrl}
                            alt={rev.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{rev.user.name}</p>
                            <p className="text-[11px] text-slate-400">Verified Explorer</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={cn(
                                'w-3.5 h-3.5',
                                idx < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{rev.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rev.comment}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                        <span>Verified Explorer</span>
                        <button
                          onClick={() => toggleHelpfulReview(rev.id)}
                          className={cn(
                            'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer',
                            rev.isHelpful ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-100 text-slate-500'
                          )}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column — Key Info Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-slate-900">Key Information</h3>

              <div className="space-y-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  leftIcon={<Lightbulb className="w-4 h-4" />}
                  onClick={() => setShowAdviceModal(true)}
                >
                  Share Advice / Tip
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Star className="w-4 h-4 text-amber-500" />}
                  onClick={() => setShowReviewModal(true)}
                >
                  Write Review
                </Button>
              </div>
            </div>

            {/* Map Link */}
            <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-lg h-64 bg-slate-100 flex items-center justify-center text-slate-400 text-sm relative group">
              <div className="text-center space-y-2 p-4">
                <MapPin className="w-8 h-8 mx-auto text-sky-500 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-700">
                  {destination.name}, {destination.country}
                </p>
                <p className="text-[10px] text-slate-400">
                  Coordinates: {destination.coordinates.latitude.toFixed(4)}, {destination.coordinates.longitude.toFixed(4)}
                </p>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline pt-1"
                >
                  View on Global Map <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* 2. Save to Collection Modal */}
      {showSaveCollectionModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">Save to Collection</h3>
              </div>
              <button
                onClick={() => setShowSaveCollectionModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Board</label>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => {
                    addDestinationToCollection(col.id, destination);
                    setShowSaveCollectionModal(false);
                    showToast(`Saved to "${col.name}" board!`);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl text-left border border-slate-200 hover:bg-purple-50/50 hover:border-purple-300 transition-all cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-800">{col.name}</div>
                    <div className="text-[10px] text-slate-400">{col.itemsCount || 0} items</div>
                  </div>
                  <Plus className="w-4 h-4 text-purple-600" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSaveCollectionModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">Review {destination.name}</h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125"
                    >
                      <Star
                        className={cn(
                          'w-6 h-6',
                          star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        )}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-2">{reviewRating} of 5 stars</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Review Headline</label>
                <input
                  type="text"
                  placeholder="Sum up your experience in one sentence..."
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Feedback</label>
                <textarea
                  rows={4}
                  placeholder="What was the highlight? Any tips for other travelers about best times, routes, or local food?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Travel Companion</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Solo', 'Couple', 'Family', 'Friends'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setReviewTripType(type)}
                      className={cn(
                        'py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center',
                        reviewTripType === type
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Publish Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Travel Advice Modal */}
      {showAdviceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Share Travel Advice</h3>
                  <p className="text-xs text-slate-500">Insider tips for {destination?.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAdviceModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdvice} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tip Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Arrive at sunrise to avoid the midday bus tour crowds"
                  value={adviceTitle}
                  onChange={(e) => setAdviceTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
                  <select
                    value={adviceCategory}
                    onChange={(e) => setAdviceCategory(e.target.value as AdviceCategory)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="SAFETY">Safety & Scams</option>
                    <option value="BEST_TIME">Best Time & Weather</option>
                    <option value="LOCAL_CUSTOMS">Local Customs & Etiquette</option>
                    <option value="FOOD_DINING">Food & Taverns</option>
                    <option value="TRANSPORT">Transit & Getting Around</option>
                    <option value="BUDGET_TIPS">Money & Tipping</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Applicable Season</label>
                  <input
                    type="text"
                    placeholder="e.g. May – Oct, or Year-round"
                    value={adviceSeason}
                    onChange={(e) => setAdviceSeason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Detailed Advice & Actionable Tips</label>
                <textarea
                  rows={4}
                  placeholder="Share exact recommendations, what to look out for, which local spots to visit, or scams to steer clear of..."
                  value={adviceContent}
                  onChange={(e) => setAdviceContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAdviceModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Publish Advice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
