import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const AdminDashboardPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Dashboard');
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Platform Analytics & Metrics</h2>
      </div>
      <p className="text-slate-600 text-sm">Real-time statistics for users, destinations, stories, and content reports.</p>
    </div>
  );
};

export const AdminUsersPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Users');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">User Management</h2>
      <p className="text-slate-600 text-sm">View, disable, enable, and manage registered travelers.</p>
    </div>
  );
};

export const AdminDestinationsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Destinations');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Destination Moderation</h2>
      <p className="text-slate-600 text-sm">Create, edit, and curate global travel destinations.</p>
    </div>
  );
};

export const AdminStoriesPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Stories');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Story Moderation</h2>
      <p className="text-slate-600 text-sm">Review, feature, or archive travel stories.</p>
    </div>
  );
};

export const AdminPhotosPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Photos');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Photo Moderation</h2>
      <p className="text-slate-600 text-sm">Moderate community photo uploads.</p>
    </div>
  );
};

export const AdminReviewsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Reviews');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Review Moderation</h2>
      <p className="text-slate-600 text-sm">Manage user reviews and rating moderation.</p>
    </div>
  );
};

export const AdminReportsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Admin Reports');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 font-serif">Content Moderation & Reports</h2>
      <p className="text-slate-600 text-sm">Investigate reported stories, reviews, comments, and photos.</p>
    </div>
  );
};
