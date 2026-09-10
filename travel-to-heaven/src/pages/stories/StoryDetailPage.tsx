import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle(`Story #${id || ''}`);
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Travel Story Detail</h1>
      <p className="text-slate-600 text-sm">Story ID: {id}</p>
    </div>
  );
};

export const CreateStoryPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Write New Story');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Create Travel Story</h1>
      <p className="text-slate-600 text-sm">Publish your journey to inspire global travelers.</p>
    </div>
  );
};

export const EditStoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPageTitle('Edit Story');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Edit Travel Story</h1>
      <p className="text-slate-600 text-sm">Editing Story ID: {id}</p>
    </div>
  );
};
