import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass, MapPin, Calendar, Plus, Trash2, ArrowRight,
  CheckCircle2, DollarSign, Copy
} from 'lucide-react';
import { useTravel } from '@/context/TravelContext';
import { setPageTitle } from '@/lib/utils';

const getDefaultTripDates = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 86400000);
  return {
    startDate: today.toISOString().split('T')[0],
    endDate: nextWeek.toISOString().split('T')[0],
  };
};

export const TripsPage: React.FC = () => {
  const { trips, createTrip, deleteTrip, destinations } = useTravel();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDestId, setSelectedDestId] = useState(destinations[0]?.id || 'dest-1');
  const [startDate, setStartDate] = useState(() => getDefaultTripDates().startDate);
  const [endDate, setEndDate] = useState(() => getDefaultTripDates().endDate);
  const [travelersCount, setTravelersCount] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [totalBudget, setTotalBudget] = useState(2500);

  React.useEffect(() => {
    setPageTitle('My Travel Routes & Trip Plans — Travel to Heaven');
  }, []);

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

    const newTrip = createTrip({
      title: title.trim(),
      description: description.trim() || `Exciting customized travel route exploring ${matchedDest.name} and surrounding areas.`,
      destination: matchedDest,
      destinationsList: [matchedDest],
      startDate,
      endDate,
      travelersCount,
      currency,
      totalBudget,
      totalSpent: 0,
      isCompleted: false,
      coverImageUrl: matchedDest.coverImageUrl,
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    navigate(`/trips/${newTrip.id}`);
  };

  const handleDuplicateTrip = (trip: typeof trips[0]) => {
    const duplicated = createTrip({
      title: `${trip.title} (Copy)`,
      description: trip.description,
      destination: trip.destination,
      destinationsList: trip.destinationsList ? [...trip.destinationsList] : [trip.destination],
      startDate: trip.startDate,
      endDate: trip.endDate,
      travelersCount: trip.travelersCount,
      currency: trip.currency || 'USD',
      totalBudget: trip.totalBudget || 2000,
      totalSpent: 0,
      isCompleted: false,
      coverImageUrl: trip.coverImageUrl,
    });
    navigate(`/trips/${duplicated.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-10 shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-widest border border-teal-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Section Four • Route Planner</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Create Your Travel Routes
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Organize saved places in your preferred travel order, plan day-by-day activities, view routes on Google Maps, and manage your complete trip itinerary.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4 stroke-3" />
            <span>Create New Trip</span>
          </button>
        </div>
      </div>

      {/* Trips Grid */}
      {trips.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#0c1e28] rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">No trip routes created yet</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Start by creating a trip like "My Japan Adventure" or "Sri Lanka Camping", select your places, and arrange your itinerary!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
          >
            Create Your First Route
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const stopsCount = trip.destinationsList?.length || (trip.destination ? 1 : 0);
            const daysCount = trip.days?.length || 1;

            return (
              <div
                key={trip.id}
                className="group bg-white dark:bg-[#0c1e28] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trip.coverImageUrl || trip.destination?.coverImageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {stopsCount} {stopsCount === 1 ? 'Destination' : 'Destinations in Route'}
                      </span>
                      {trip.isCompleted && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{trip.destination?.name || 'Multiple Destinations'}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold leading-tight line-clamp-1">
                        {trip.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {trip.description || 'Custom multi-destination travel route and day-by-day itinerary.'}
                    </p>

                    {/* Ordered Route Preview Pills */}
                    {trip.destinationsList && trip.destinationsList.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Route Order:
                        </span>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {trip.destinationsList.map((dest, idx) => (
                            <span
                              key={dest.id || idx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-bold whitespace-nowrap border border-slate-200 dark:border-slate-700"
                            >
                              <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-950 text-[10px] flex items-center justify-center font-extrabold">
                                {idx + 1}
                              </span>
                              <span>{dest.name.split(' ')[0]}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-500" />
                        <span>{trip.startDate} ({daysCount}d)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-teal-500" />
                        <span>Budget: {trip.currency || 'USD'} {trip.totalBudget?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicateTrip(trip)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      title="Duplicate Trip"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to={`/trips/${trip.id}`}
                    className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:scale-105"
                  >
                    <span>Open Route Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Trip Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-500 text-slate-950">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Create Travel Route</h3>
                  <p className="text-xs text-slate-500">Plan and arrange destinations</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Trip Name</label>
                <input
                  type="text"
                  placeholder="e.g. My Japan Adventure, Sri Lanka Camping..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Starting Destination</label>
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.country} ({d.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="LKR">LKR (Rs)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Budget</label>
                  <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description & Goals</label>
                <textarea
                  rows={2}
                  placeholder="Outline what this trip is about..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Create Route & Start Planning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
