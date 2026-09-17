import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setPageTitle } from '@/lib/utils';
import {
  Heart, FolderOpen, PlusCircle, ArrowLeft, Trash2,
} from 'lucide-react';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { useTravel } from '@/context/TravelContext';

export const FavoritesPage: React.FC = () => {
  const { destinations, favoriteDestinationIds, toggleFavoriteDestination } = useTravel();

  useEffect(() => {
    setPageTitle('Saved Favorites — Travel to Heaven');
  }, []);

  const favorites = destinations.filter((d) => favoriteDestinationIds.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">My Saves</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Saved Favorites</h1>
          <p className="text-slate-600 text-sm">{favorites.length} destinations in your wishlist</p>
        </div>
        <Link to="/collections">
          <Button variant="outline" leftIcon={<FolderOpen className="w-4 h-4" />}>
            View Collections
          </Button>
        </Link>
      </header>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites saved yet"
          description="Start saving destinations you love by clicking the heart icon on any destination card."
          action={<Link to="/destinations"><Button variant="primary">Browse Destinations</Button></Link>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={{ ...dest, isFavorite: true }}
              onToggleFavorite={toggleFavoriteDestination}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CollectionsPage: React.FC = () => {
  const { collections, createCollection, deleteCollection } = useTravel();
  const [showModal, setShowModal] = useState(false);
  const [colName, setColName] = useState('');
  const [colDesc, setColDesc] = useState('');

  useEffect(() => {
    setPageTitle('Travel Collections — Travel to Heaven');
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colName.trim()) return;
    createCollection(colName.trim(), colDesc.trim());
    setColName('');
    setColDesc('');
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Organized Saves</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-slate-900">Travel Collections</h1>
          <p className="text-slate-500 text-sm">Organize dream trips into themed portfolios</p>
        </div>
        <Button variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />} onClick={() => setShowModal(true)}>
          New Collection
        </Button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleCreate} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="font-serif text-xl font-bold text-slate-900">Create New Collection</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Collection Name</label>
              <input
                type="text"
                required
                placeholder="E.g., Alpine Winter Honeymoon"
                value={colName}
                onChange={(e) => setColName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Description (Optional)</label>
              <textarea
                rows={2}
                placeholder="Brief description of this collection..."
                value={colDesc}
                onChange={(e) => setColDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Create Collection
              </Button>
            </div>
          </form>
        </div>
      )}

      {collections.length === 0 ? (
        <EmptyState
          title="No collections yet"
          description="Create custom collections to categorize destinations, hotels, and experiences."
          action={<Button variant="primary" onClick={() => setShowModal(true)}>Create First Collection</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="group relative h-56 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Link to={`/collections/${col.id}`} className="absolute inset-0">
                <img
                  src={col.coverImageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif text-lg font-bold">{col.name}</h3>
                  <p className="text-xs text-slate-300">{col.destinations?.length || col.itemsCount || 0} destinations</p>
                </div>
              </Link>
              <button
                onClick={() => deleteCollection(col.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete collection"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { collections, destinations, toggleFavoriteDestination } = useTravel();

  const collection = collections.find((c) => c.id === id) || collections[0];

  useEffect(() => {
    if (collection) {
      setPageTitle(`${collection.name} — Travel to Heaven`);
    }
  }, [collection]);

  if (!collection) return null;

  const collectionDests = collection.destinations && collection.destinations.length > 0
    ? collection.destinations
    : destinations.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-2">
        <Link to="/collections" className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
        </Link>
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-extrabold text-slate-900">{collection.name}</h1>
          {collection.description && <p className="text-slate-600 text-sm">{collection.description}</p>}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionDests.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onToggleFavorite={toggleFavoriteDestination}
          />
        ))}
      </div>
    </div>
  );
};
