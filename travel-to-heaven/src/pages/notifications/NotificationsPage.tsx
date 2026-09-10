import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';

export const NotificationsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Notifications');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Notifications</h1>
      <p className="text-slate-600 text-sm">Stay updated on followers, story likes, comments, and trip updates.</p>
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  useEffect(() => {
    setPageTitle('My Profile');
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Traveler Profile</h1>
      <p className="text-slate-600 text-sm">Manage your bio, published stories, photos, and saved trips.</p>
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Account Settings');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
      <p className="text-slate-600 text-sm">Update security, notifications, and profile preferences.</p>
    </div>
  );
};
