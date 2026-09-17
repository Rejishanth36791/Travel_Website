import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Destination } from '@/types/destination.types';
import type { Story, StoryComment } from '@/types/story.types';
import type { Photo } from '@/types/photo.types';
import type { Trip, ItineraryItem } from '@/types/trip.types';
import type { BudgetItem } from '@/types/budget.types';
import type { Review } from '@/types/review.types';
import type { UserProfile } from '@/types/user.types';
import type { NotificationItem, Collection } from '@/types/community.types';
import type { TravelAdvice } from '@/types/advice.types';
import {
  MOCK_DESTINATIONS,
  MOCK_STORIES,
  MOCK_PHOTOS,
  MOCK_REVIEWS,
  MOCK_TRIPS,
  MOCK_BUDGET_ITEMS,
  MOCK_NOTIFICATIONS,
  MOCK_COLLECTIONS,
  MOCK_USERS,
  CURRENT_DEV_USER,
  MOCK_TRAVEL_ADVICE,
} from '@/mock';

interface TravelContextType {
  // Destinations & Favorites
  destinations: Destination[];
  addDestination: (destination: Omit<Destination, 'id' | 'createdAt' | 'reviewsCount' | 'rating' | 'isFavorite'>) => Destination;
  favoriteDestinationIds: string[];
  toggleFavoriteDestination: (destinationId: string) => void;
  isDestinationFavorite: (destinationId: string) => boolean;

  // Travel Advice & Tips
  advice: TravelAdvice[];
  addAdvice: (advice: Omit<TravelAdvice, 'id' | 'createdAt' | 'author' | 'helpfulCount' | 'isHelpful'>) => TravelAdvice;
  toggleHelpfulAdvice: (adviceId: string) => void;

  // Collections
  collections: Collection[];
  createCollection: (name: string, description?: string) => Collection;
  deleteCollection: (id: string) => void;
  renameCollection: (id: string, newName: string) => void;
  addDestinationToCollection: (collectionId: string, destination: Destination) => void;
  removeDestinationFromCollection: (collectionId: string, destinationId: string) => void;

  // Stories
  stories: Story[];
  likedStoryIds: string[];
  bookmarkedStoryIds: string[];
  toggleLikeStory: (storyId: string) => void;
  toggleBookmarkStory: (storyId: string) => void;
  createStory: (story: Omit<Story, 'id' | 'createdAt' | 'author' | 'likesCount' | 'commentsCount' | 'isLiked' | 'isBookmarked'>) => Story;
  updateStory: (id: string, updates: Partial<Story>) => void;
  deleteStory: (id: string) => void;
  addStoryComment: (storyId: string, content: string) => StoryComment;

  // Photos
  photos: Photo[];
  likedPhotoIds: string[];
  toggleLikePhoto: (photoId: string) => void;
  addPhoto: (photo: { url: string; caption?: string; destinationId?: string }) => Photo;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'user' | 'helpfulCount' | 'isHelpful'>) => Review;
  toggleHelpfulReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Trips & Itinerary
  trips: Trip[];
  createTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'days'>) => Trip;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addItineraryItem: (tripId: string, dayId: string, item: Omit<ItineraryItem, 'id' | 'dayId' | 'order'>) => void;
  updateItineraryItem: (tripId: string, dayId: string, itemId: string, updates: Partial<ItineraryItem>) => void;
  deleteItineraryItem: (tripId: string, dayId: string, itemId: string) => void;

  // Budget
  budgetItems: BudgetItem[];
  addBudgetItem: (item: Omit<BudgetItem, 'id' | 'createdAt'>) => BudgetItem;
  updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;

  // Travelers & Following
  travelers: UserProfile[];
  followedUserIds: string[];
  toggleFollowUser: (userId: string) => void;
  isUserFollowed: (userId: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  removeNotification: (id: string) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FAVORITES: 't2h_favorite_destinations',
  LIKED_STORIES: 't2h_liked_stories',
  BOOKMARKED_STORIES: 't2h_bookmarked_stories',
  LIKED_PHOTOS: 't2h_liked_photos',
  FOLLOWED_USERS: 't2h_followed_users',
  COLLECTIONS: 't2h_collections',
  TRIPS: 't2h_trips',
  BUDGET: 't2h_budget',
  STORIES: 't2h_stories',
  PHOTOS: 't2h_photos',
  NOTIFICATIONS: 't2h_notifications',
  REVIEWS: 't2h_reviews',
  DESTINATIONS: 't2h_destinations',
  ADVICE: 't2h_travel_advice',
};

function getStoredJson<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Destinations & Favorites
  const [destinations, setDestinations] = useState<Destination[]>(() =>
    getStoredJson(STORAGE_KEYS.DESTINATIONS, MOCK_DESTINATIONS)
  );
  const [favoriteDestinationIds, setFavoriteDestinationIds] = useState<string[]>(() =>
    getStoredJson(STORAGE_KEYS.FAVORITES, ['dest-1', 'dest-3', 'dest-6'])
  );

  // Travel Advice & Tips
  const [advice, setAdvice] = useState<TravelAdvice[]>(() =>
    getStoredJson(STORAGE_KEYS.ADVICE, MOCK_TRAVEL_ADVICE)
  );

  // Collections
  const [collections, setCollections] = useState<Collection[]>(() =>
    getStoredJson(STORAGE_KEYS.COLLECTIONS, MOCK_COLLECTIONS)
  );

  // Stories
  const [stories, setStories] = useState<Story[]>(() =>
    getStoredJson(STORAGE_KEYS.STORIES, MOCK_STORIES)
  );
  const [likedStoryIds, setLikedStoryIds] = useState<string[]>(() =>
    getStoredJson(STORAGE_KEYS.LIKED_STORIES, ['story-2', 'story-3'])
  );
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>(() =>
    getStoredJson(STORAGE_KEYS.BOOKMARKED_STORIES, ['story-1', 'story-2'])
  );

  // Photos
  const [photos, setPhotos] = useState<Photo[]>(() =>
    getStoredJson(STORAGE_KEYS.PHOTOS, MOCK_PHOTOS)
  );
  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>(() =>
    getStoredJson(STORAGE_KEYS.LIKED_PHOTOS, ['photo-1', 'photo-3', 'photo-5', 'photo-7'])
  );

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() =>
    getStoredJson(STORAGE_KEYS.REVIEWS, MOCK_REVIEWS)
  );

  // Trips
  const [trips, setTrips] = useState<Trip[]>(() =>
    getStoredJson(STORAGE_KEYS.TRIPS, MOCK_TRIPS)
  );

  // Budget
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() =>
    getStoredJson(STORAGE_KEYS.BUDGET, MOCK_BUDGET_ITEMS)
  );

  // Travelers
  const [travelers] = useState<UserProfile[]>(MOCK_USERS);
  const [followedUserIds, setFollowedUserIds] = useState<string[]>(() =>
    getStoredJson(STORAGE_KEYS.FOLLOWED_USERS, ['user-2', 'user-4', 'user-6'])
  );

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredJson(STORAGE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS)
  );

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADVICE, JSON.stringify(advice));
  }, [advice]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteDestinationIds));
  }, [favoriteDestinationIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKED_STORIES, JSON.stringify(likedStoryIds));
  }, [likedStoryIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_STORIES, JSON.stringify(bookmarkedStoryIds));
  }, [bookmarkedStoryIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKED_PHOTOS, JSON.stringify(likedPhotoIds));
  }, [likedPhotoIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWED_USERS, JSON.stringify(followedUserIds));
  }, [followedUserIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budgetItems));
  }, [budgetItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Favorites Handlers
  const toggleFavoriteDestination = (destinationId: string) => {
    setFavoriteDestinationIds((prev) =>
      prev.includes(destinationId) ? prev.filter((id) => id !== destinationId) : [...prev, destinationId]
    );
  };

  const isDestinationFavorite = (destinationId: string) => {
    return favoriteDestinationIds.includes(destinationId);
  };

  // Collections Handlers
  const createCollection = (name: string, description?: string): Collection => {
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name,
      description,
      itemsCount: 0,
      isPrivate: false,
      destinations: [],
      createdAt: new Date().toISOString(),
      coverImageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    };
    setCollections((prev) => [newCol, ...prev]);
    return newCol;
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const renameCollection = (id: string, newName: string) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, name: newName } : c)));
  };

  const addDestinationToCollection = (collectionId: string, destination: Destination) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          const currentDests = c.destinations || [];
          if (currentDests.some((d) => d.id === destination.id)) return c;
          return {
            ...c,
            itemsCount: currentDests.length + 1,
            destinations: [...currentDests, destination],
            coverImageUrl: c.coverImageUrl || destination.coverImageUrl,
          };
        }
        return c;
      })
    );
  };

  const removeDestinationFromCollection = (collectionId: string, destinationId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          const updated = (c.destinations || []).filter((d) => d.id !== destinationId);
          return {
            ...c,
            itemsCount: updated.length,
            destinations: updated,
          };
        }
        return c;
      })
    );
  };

  // Stories Handlers
  const toggleLikeStory = (storyId: string) => {
    setLikedStoryIds((prev) => {
      const isLiked = prev.includes(storyId);
      const next = isLiked ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      setStories((stList) =>
        stList.map((st) => (st.id === storyId ? { ...st, likesCount: st.likesCount + (isLiked ? -1 : 1) } : st))
      );
      return next;
    });
  };

  const toggleBookmarkStory = (storyId: string) => {
    setBookmarkedStoryIds((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
  };

  const createStory = (storyData: Omit<Story, 'id' | 'createdAt' | 'author' | 'likesCount' | 'commentsCount' | 'isLiked' | 'isBookmarked'>): Story => {
    const newStory: Story = {
      ...storyData,
      id: `story-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: CURRENT_DEV_USER,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
    };
    setStories((prev) => [newStory, ...prev]);
    return newStory;
  };

  const updateStory = (id: string, updates: Partial<Story>) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  const addStoryComment = (storyId: string, content: string): StoryComment => {
    const comment: StoryComment = {
      id: `comment-${Date.now()}`,
      storyId,
      user: CURRENT_DEV_USER,
      content,
      createdAt: new Date().toISOString(),
    };
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, commentsCount: s.commentsCount + 1 } : s))
    );
    return comment;
  };

  // Photos Handlers
  const toggleLikePhoto = (photoId: string) => {
    setLikedPhotoIds((prev) => {
      const isLiked = prev.includes(photoId);
      const next = isLiked ? prev.filter((id) => id !== photoId) : [...prev, photoId];
      setPhotos((phList) =>
        phList.map((p) => (p.id === photoId ? { ...p, likesCount: p.likesCount + (isLiked ? -1 : 1) } : p))
      );
      return next;
    });
  };

  const addPhoto = (photoData: { url: string; caption?: string; destinationId?: string }): Photo => {
    const destination = destinations.find((d) => d.id === photoData.destinationId);
    const newPhoto: Photo = {
      id: `photo-${Date.now()}`,
      url: photoData.url,
      caption: photoData.caption,
      photographer: CURRENT_DEV_USER,
      destination,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      aspectRatio: 'landscape',
      createdAt: new Date().toISOString(),
    };
    setPhotos((prev) => [newPhoto, ...prev]);
    return newPhoto;
  };

  // Reviews Handlers
  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'user' | 'helpfulCount' | 'isHelpful'>): Review => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      user: CURRENT_DEV_USER,
      helpfulCount: 0,
      isHelpful: false,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    return newReview;
  };

  const toggleHelpfulReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const isNowHelpful = !r.isHelpful;
          return {
            ...r,
            isHelpful: isNowHelpful,
            helpfulCount: r.helpfulCount + (isNowHelpful ? 1 : -1),
          };
        }
        return r;
      })
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // Destination & Advice Handlers
  const addDestination = (destData: Omit<Destination, 'id' | 'createdAt' | 'reviewsCount' | 'rating' | 'isFavorite'>): Destination => {
    const newDest: Destination = {
      ...destData,
      id: `dest-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setDestinations((prev) => [newDest, ...prev]);
    return newDest;
  };

  const addAdvice = (adviceData: Omit<TravelAdvice, 'id' | 'createdAt' | 'author' | 'helpfulCount' | 'isHelpful'>): TravelAdvice => {
    const newAdvice: TravelAdvice = {
      ...adviceData,
      id: `adv-${Date.now()}`,
      author: {
        id: CURRENT_DEV_USER.id,
        name: CURRENT_DEV_USER.name,
        avatar: CURRENT_DEV_USER.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        badge: 'Explorer Contributor',
        location: CURRENT_DEV_USER.location,
      },
      helpfulCount: 0,
      isHelpful: false,
      createdAt: new Date().toISOString(),
    };
    setAdvice((prev) => [newAdvice, ...prev]);
    return newAdvice;
  };

  const toggleHelpfulAdvice = (adviceId: string) => {
    setAdvice((prev) =>
      prev.map((a) => {
        if (a.id === adviceId) {
          const isNowHelpful = !a.isHelpful;
          return {
            ...a,
            isHelpful: isNowHelpful,
            helpfulCount: a.helpfulCount + (isNowHelpful ? 1 : -1),
          };
        }
        return a;
      })
    );
  };

  // Trips & Itinerary Handlers
  const createTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'days'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      days: [
        {
          id: `day-${Date.now()}-1`,
          tripId: `trip-${Date.now()}`,
          dayNumber: 1,
          date: tripData.startDate,
          title: 'Day 1: Arrival & Exploring',
          items: [],
        },
      ],
    };
    setTrips((prev) => [newTrip, ...prev]);
    return newTrip;
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const addItineraryItem = (tripId: string, dayId: string, itemData: Omit<ItineraryItem, 'id' | 'dayId' | 'order'>) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId && trip.days) {
          return {
            ...trip,
            days: trip.days.map((day) => {
              if (day.id === dayId) {
                const newItem: ItineraryItem = {
                  ...itemData,
                  id: `it-${Date.now()}`,
                  dayId,
                  order: day.items.length + 1,
                };
                return {
                  ...day,
                  items: [...day.items, newItem],
                };
              }
              return day;
            }),
          };
        }
        return trip;
      })
    );
  };

  const updateItineraryItem = (tripId: string, dayId: string, itemId: string, updates: Partial<ItineraryItem>) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId && trip.days) {
          return {
            ...trip,
            days: trip.days.map((day) => {
              if (day.id === dayId) {
                return {
                  ...day,
                  items: day.items.map((it) => (it.id === itemId ? { ...it, ...updates } : it)),
                };
              }
              return day;
            }),
          };
        }
        return trip;
      })
    );
  };

  const deleteItineraryItem = (tripId: string, dayId: string, itemId: string) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId && trip.days) {
          return {
            ...trip,
            days: trip.days.map((day) => {
              if (day.id === dayId) {
                return {
                  ...day,
                  items: day.items.filter((it) => it.id !== itemId),
                };
              }
              return day;
            }),
          };
        }
        return trip;
      })
    );
  };

  // Budget Handlers
  const addBudgetItem = (itemData: Omit<BudgetItem, 'id' | 'createdAt'>): BudgetItem => {
    const newItem: BudgetItem = {
      ...itemData,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBudgetItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateBudgetItem = (id: string, updates: Partial<BudgetItem>) => {
    setBudgetItems((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems((prev) => prev.filter((b) => b.id !== id));
  };

  // Travelers Handlers
  const toggleFollowUser = (userId: string) => {
    setFollowedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const isUserFollowed = (userId: string) => {
    return followedUserIds.includes(userId);
  };

  // Notifications Handlers
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        favoriteDestinationIds,
        toggleFavoriteDestination,
        isDestinationFavorite,

        collections,
        createCollection,
        deleteCollection,
        renameCollection,
        addDestinationToCollection,
        removeDestinationFromCollection,

        stories,
        likedStoryIds,
        bookmarkedStoryIds,
        toggleLikeStory,
        toggleBookmarkStory,
        createStory,
        updateStory,
        deleteStory,
        addStoryComment,

        photos,
        likedPhotoIds,
        toggleLikePhoto,
        addPhoto,

        reviews,
        addReview,
        toggleHelpfulReview,
        deleteReview,

        advice,
        addAdvice,
        toggleHelpfulAdvice,

        addDestination,

        trips,
        createTrip,
        updateTrip,
        deleteTrip,
        addItineraryItem,
        updateItineraryItem,
        deleteItineraryItem,

        budgetItems,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,

        travelers,
        followedUserIds,
        toggleFollowUser,
        isUserFollowed,

        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        removeNotification,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
