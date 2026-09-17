import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { setPageTitle, formatDate, cn } from '@/lib/utils';
import {
  Plane, PlusCircle, Calendar, MapPin, Users, ArrowLeft,
  Wallet, Clock, CheckCircle2, Circle,
  Hotel, UtensilsCrossed, Camera as CameraIcon, Bus, MoreHorizontal,
  Trash2, X, Plus,
} from 'lucide-react';
import type { Trip, TripDay, ItineraryItemType } from '@/types/trip.types';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { EmptyState } from '@/components/common/EmptyState';
import { useTravel } from '@/context/TravelContext';

export const TripsPage: React.FC = () => {
  const { trips } = useTravel();

  useEffect(() => {
    setPageTitle('My Trips — Travel to Heaven');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Trip Planner</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">My Expeditions</h1>
          <p className="text-slate-600 text-sm">Plan schedules, organize routes, and track budgets for upcoming journeys.</p>
        </div>
        <Link to="/trips/create">
          <Button variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create New Trip
          </Button>
        </Link>
      </header>

      {/* Trips Grid */}
      {trips.length === 0 ? (
        <EmptyState
          title="No trips planned yet"
          description="Start planning your next adventure! Choose destinations, build day-by-day itineraries, and budget expenses."
          action={
            <Link to="/trips/create">
              <Button variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>Plan First Trip</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  const daysCount = Math.max(
    1,
    Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
  const budgetPct = trip.totalBudget ? Math.min(((trip.totalSpent || 0) / trip.totalBudget) * 100, 100) : 0;

  return (
    <Link
      to={`/trips/${trip.id}`}
      className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.coverImageUrl || trip.destination.coverImageUrl}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
          <h3 className="font-serif text-lg font-bold">{trip.title}</h3>
          <p className="text-xs flex items-center gap-1 text-slate-200">
            <MapPin className="w-3 h-3" /> {trip.destination.city}, {trip.destination.country}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-sky-500" /> {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" /> {daysCount} days
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-violet-500" /> {trip.travelersCount} traveler{trip.travelersCount > 1 ? 's' : ''}
          </span>
        </div>

        {trip.totalBudget && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1"><Wallet className="w-3 h-3" /> Budget</span>
              <span className="font-semibold text-slate-800">${trip.totalSpent?.toLocaleString() || 0} / ${trip.totalBudget.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', budgetPct > 90 ? 'bg-rose-500' : 'bg-sky-500')}
                style={{ width: `${budgetPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export const CreateTripPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip, destinations } = useTravel();

  const [title, setTitle] = useState('');
  const [destId, setDestId] = useState(destinations[0]?.id || 'dest-1');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-10');
  const [travelersCount, setTravelersCount] = useState(2);
  const [totalBudget, setTotalBudget] = useState(3000);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setPageTitle('Plan New Trip — Travel to Heaven');
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedDest = destinations.find((d) => d.id === destId) || destinations[0];
    const newTrip = createTrip({
      title: title.trim(),
      description: notes.trim(),
      destination: matchedDest,
      startDate,
      endDate,
      travelersCount: Number(travelersCount) || 1,
      totalBudget: Number(totalBudget) || 0,
      totalSpent: 0,
      coverImageUrl: matchedDest.coverImageUrl,
    });

    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-2">
        <Link to="/trips" className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
        </Link>
        <h1 className="font-serif text-3xl font-extrabold text-slate-900">Plan a New Expedition</h1>
        <p className="text-slate-600 text-sm">Organize dates, invite travelers, set budget targets, and design an itinerary.</p>
      </header>

      <form onSubmit={handleCreate} className="space-y-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <Input
          label="Trip Title"
          placeholder="E.g., Autumn In Kyoto Temples & Tea Houses"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Primary Destination</label>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className="w-full bg-white border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Number of Travelers"
            type="number"
            min={1}
            value={travelersCount}
            onChange={(e) => setTravelersCount(Number(e.target.value))}
            required
          />
          <Input
            label="Target Budget ($ USD)"
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Trip Notes & Goals</label>
          <textarea
            rows={4}
            placeholder="Special reservations, flight codes, packing reminders..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-y"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" size="lg" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create Expedition
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate('/trips')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { trips } = useTravel();
  const trip = trips.find((t) => t.id === id) || trips[0];

  useEffect(() => {
    if (trip) {
      setPageTitle(`${trip.title} — Travel to Heaven`);
    }
  }, [trip]);

  if (!trip) return null;

  const daysCount = Math.max(
    1,
    Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-75 w-full overflow-hidden">
        <img
          src={trip.coverImageUrl || trip.destination.coverImageUrl}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-black/60"
          >
            <ArrowLeft className="w-4 h-4" /> My Trips
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-7xl mx-auto space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-400" /> {trip.destination.city}, {trip.destination.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {daysCount} days
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {trip.travelersCount} travelers
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to={`/trips/${trip.id}/itinerary`}>
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              Open Itinerary Planner
            </Button>
          </Link>
          <Link to={`/trips/${trip.id}/budget`}>
            <Button variant="outline" leftIcon={<Wallet className="w-4 h-4" />}>
              Open Budget Tracker
            </Button>
          </Link>
        </div>

        {trip.description && (
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Trip Objectives & Notes</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{trip.description}</p>
          </div>
        )}

        {/* Itinerary Preview */}
        {trip.days && trip.days.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-slate-900">Itinerary Overview</h2>
            <div className="space-y-4">
              {trip.days.map((day) => (
                <DayPreview key={day.id} day={day} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const ITEM_ICONS: Record<string, React.ElementType> = {
  ATTRACTION: CameraIcon,
  ACTIVITY: CheckCircle2,
  RESTAURANT: UtensilsCrossed,
  HOTEL: Hotel,
  TRANSPORT: Bus,
  OTHER: MoreHorizontal,
};

const DayPreview: React.FC<{ day: TripDay }> = ({ day }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-5 py-3 bg-linear-to-r from-sky-50 to-indigo-50 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
          {day.dayNumber}
        </span>
        <span className="text-sm font-bold text-slate-900">{day.title || `Day ${day.dayNumber}`}</span>
      </div>
      <span className="text-xs text-slate-500">{formatDate(day.date)}</span>
    </div>
    <div className="divide-y divide-slate-100">
      {day.items.length === 0 ? (
        <p className="px-5 py-3 text-xs text-slate-400 italic">No scheduled activities yet.</p>
      ) : (
        day.items.map((item) => {
          const Icon = ITEM_ICONS[item.type] || Circle;
          return (
            <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                {item.location && <p className="text-xs text-slate-400">{item.location}</p>}
              </div>
              {item.time && (
                <span className="text-xs font-mono text-slate-400 shrink-0">{item.time}</span>
              )}
            </div>
          );
        })
      )}
    </div>
  </div>
);

export const ItineraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { trips, addItineraryItem, deleteItineraryItem } = useTravel();
  const trip = trips.find((t) => t.id === id) || trips[0];

  const [activeDayId, setActiveDayId] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [itemTitle, setItemTitle] = useState('');
  const [itemType, setItemType] = useState<ItineraryItemType>('ACTIVITY');
  const [itemTime, setItemTime] = useState('10:00 AM');
  const [itemLocation, setItemLocation] = useState('');
  const [itemNotes, setItemNotes] = useState('');

  useEffect(() => {
    if (trip) {
      setPageTitle(`Itinerary: ${trip.title} — Travel to Heaven`);
      if (trip.days && trip.days.length > 0 && !activeDayId) {
        setActiveDayId(trip.days[0].id);
      }
    }
  }, [trip, activeDayId]);

  if (!trip) return null;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !activeDayId) return;

    addItineraryItem(trip.id, activeDayId, {
      title: itemTitle.trim(),
      type: itemType,
      time: itemTime.trim() || undefined,
      location: itemLocation.trim() || undefined,
      notes: itemNotes.trim() || undefined,
    });

    setItemTitle('');
    setItemLocation('');
    setItemNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-2">
        <Link to={`/trips/${trip.id}`} className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {trip.title}
        </Link>
        <h1 className="font-serif text-3xl font-extrabold text-slate-900">Day-by-Day Itinerary Planner</h1>
        <p className="text-slate-600 text-sm">
          {trip.destination.city}, {trip.destination.country} • {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
        </p>
      </header>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleAddItem} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">Add Itinerary Activity</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Activity Title</label>
              <input
                type="text"
                required
                placeholder="E.g., Sunrise cable car to Gornergrat"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Type</label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value as ItineraryItemType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <option value="ATTRACTION">Attraction</option>
                  <option value="ACTIVITY">Activity</option>
                  <option value="RESTAURANT">Restaurant</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Time</label>
                <input
                  type="text"
                  placeholder="09:00 AM"
                  value={itemTime}
                  onChange={(e) => setItemTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Location / Address</label>
              <input
                type="text"
                placeholder="E.g., Zermatt Railway Station"
                value={itemLocation}
                onChange={(e) => setItemLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Add to Schedule</Button>
            </div>
          </form>
        </div>
      )}

      {/* Days List */}
      <div className="space-y-6">
        {trip.days?.map((day) => (
          <div key={day.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 bg-linear-to-r from-sky-50 to-indigo-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                  {day.dayNumber}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{day.title || `Day ${day.dayNumber}`}</h3>
                  <p className="text-[11px] text-slate-500">{formatDate(day.date)}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => {
                  setActiveDayId(day.id);
                  setShowAddModal(true);
                }}
              >
                Add Activity
              </Button>
            </div>

            <div className="divide-y divide-slate-100">
              {day.items.length === 0 ? (
                <p className="px-5 py-4 text-xs text-slate-400 italic">No scheduled activities for this day yet.</p>
              ) : (
                day.items.map((item) => {
                  const Icon = ITEM_ICONS[item.type] || Circle;
                  return (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{item.title}</p>
                        {item.location && <p className="text-xs text-slate-400">{item.location}</p>}
                      </div>
                      {item.time && (
                        <span className="text-xs font-mono text-slate-500 shrink-0">{item.time}</span>
                      )}
                      <button
                        onClick={() => deleteItineraryItem(trip.id, day.id, item.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
