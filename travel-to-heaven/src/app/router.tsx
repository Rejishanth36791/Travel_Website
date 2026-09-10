import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Route Guards
import { ProtectedRoute, AdminRoute, GuestRoute } from '@/components/common/RouteGuards';

// Pages
import { HomePage } from '@/pages/home/HomePage';
import { DiscoverPage } from '@/pages/discover/DiscoverPage';
import { DestinationsPage } from '@/pages/destinations/DestinationsPage';
import { DestinationDetailPage } from '@/pages/destinations/DestinationDetailPage';
import { StoriesPage } from '@/pages/stories/StoriesPage';
import { StoryDetailPage, CreateStoryPage, EditStoryPage } from '@/pages/stories/StoryDetailPage';
import { PhotosPage, PhotoDetailPage } from '@/pages/photos/PhotosPage';
import { TripsPage, CreateTripPage, TripDetailPage, ItineraryPage } from '@/pages/trips/TripsPage';
import { BudgetPage } from '@/pages/budget/BudgetPage';
import { ReviewsPage } from '@/pages/reviews/ReviewsPage';
import { FavoritesPage, CollectionsPage, CollectionDetailPage } from '@/pages/favorites/FavoritesPage';
import { CommunityPage, TravelersPage, TravelerProfilePage } from '@/pages/community/CommunityPage';
import { MapPage } from '@/pages/map/MapPage';
import { NotificationsPage, ProfilePage, SettingsPage } from '@/pages/notifications/NotificationsPage';
import { LoginPage, RegisterPage } from '@/pages/auth/LoginPage';
import {
  AdminDashboardPage,
  AdminUsersPage,
  AdminDestinationsPage,
  AdminStoriesPage,
  AdminPhotosPage,
  AdminReviewsPage,
  AdminReportsPage,
} from '@/pages/admin/AdminDashboardPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';
import { UnauthorizedPage } from '@/pages/common/UnauthorizedPage';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/discover', element: <DiscoverPage /> },
      { path: '/destinations', element: <DestinationsPage /> },
      { path: '/destinations/:id', element: <DestinationDetailPage /> },
      { path: '/stories', element: <StoriesPage /> },
      { path: '/stories/:id', element: <StoryDetailPage /> },
      {
        path: '/stories/create',
        element: (
          <ProtectedRoute>
            <CreateStoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stories/edit/:id',
        element: (
          <ProtectedRoute>
            <EditStoryPage />
          </ProtectedRoute>
        ),
      },
      { path: '/photos', element: <PhotosPage /> },
      { path: '/photos/:id', element: <PhotoDetailPage /> },
      {
        path: '/trips',
        element: (
          <ProtectedRoute>
            <TripsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trips/create',
        element: (
          <ProtectedRoute>
            <CreateTripPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trips/:id',
        element: (
          <ProtectedRoute>
            <TripDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trips/:id/itinerary',
        element: (
          <ProtectedRoute>
            <ItineraryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trips/:id/budget',
        element: (
          <ProtectedRoute>
            <BudgetPage />
          </ProtectedRoute>
        ),
      },
      { path: '/reviews', element: <ReviewsPage /> },
      {
        path: '/favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/collections',
        element: (
          <ProtectedRoute>
            <CollectionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/collections/:id',
        element: (
          <ProtectedRoute>
            <CollectionDetailPage />
          </ProtectedRoute>
        ),
      },
      { path: '/community', element: <CommunityPage /> },
      { path: '/travelers', element: <TravelersPage /> },
      { path: '/travelers/:id', element: <TravelerProfilePage /> },
      { path: '/map', element: <MapPage /> },
      {
        path: '/notifications',
        element: (
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
    ],
  },
  {
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: '/admin', element: <AdminDashboardPage /> },
      { path: '/admin/users', element: <AdminUsersPage /> },
      { path: '/admin/destinations', element: <AdminDestinationsPage /> },
      { path: '/admin/stories', element: <AdminStoriesPage /> },
      { path: '/admin/photos', element: <AdminPhotosPage /> },
      { path: '/admin/reviews', element: <AdminReviewsPage /> },
      { path: '/admin/reports', element: <AdminReportsPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
