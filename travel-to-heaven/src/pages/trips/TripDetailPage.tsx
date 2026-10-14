import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass, MapPin, ArrowLeft, ArrowUp, ArrowDown, Trash2, Plus,
  Calendar, DollarSign, Clock, ExternalLink, CheckCircle2,
  Navigation, Check
} from 'lucide-react';
import { useTravel } from '@/context/TravelContext';
import { Button } from '@/components/common/Button';
import { setPageTitle, cn } from '@/lib/utils';
import type { Destination } from '@/types/destination.types';
import type { ItineraryItemType } from '@/types/trip.types';

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    trips,
    updateTrip,
    removeDestinationFromTrip,
    reorderTripDestinations,
    addDestinationToTrip,
    addItineraryItem,
    deleteItineraryItem,
    destinations: allDestinations,
    budgetItems,
  } = useTravel();

  const trip = trips.find((t) => t.id === id);

  const [activeTab, setActiveTab] = useState<'route' | 'itinerary' | 'budget'>('route');
  const [showAddDestModal, setShowAddDestModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string>('');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityType, setActivityType] = useState<ItineraryItemType>('ACTIVITY');
  const [activityTime, setActivityTime] = useState('Morning (09:00 AM)');
  const [activityLocation, setActivityLocation] = useState('');
  const [activityNotes, setActivityNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (trip) {
      setPageTitle(`${trip.title} — Route Planner`);
    }
  }, [trip]);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Compass className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Trip not found</h2>
        <p className="text-slate-600">The requested travel route does not exist.</p>
        <Link to="/trips" className="inline-block px-6 py-2.5 rounded-full bg-teal-500 text-slate-950 font-bold text-sm">
          Return to Trips
        </Link>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const destinationsList: Destination[] =
    trip.destinationsList && trip.destinationsList.length > 0
      ? trip.destinationsList
      : trip.destination
      ? [trip.destination]
      : [];

  // Reordering handlers (Section Four: Move destinations up/down in the route)
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...destinationsList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    reorderTripDestinations(trip.id, updated);
    showToast(`Moved "${temp.name}" to position ${index}!`);
  };

  const handleMoveDown = (index: number) => {
    if (index >= destinationsList.length - 1) return;
    const updated = [...destinationsList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    reorderTripDestinations(trip.id, updated);
    showToast(`Moved "${temp.name}" to position ${index + 2}!`);
  };

  // Google Maps Directions Link Generator (Section Four: Google Maps route linking all destinations)
  const generateGoogleMapsDirectionsUrl = () => {
    if (destinationsList.length === 0) return 'https://www.google.com/maps';
    if (destinationsList.length === 1) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${destinationsList[0].name}, ${destinationsList[0].country}`
      )}`;
    }
    const origin = encodeURIComponent(`${destinationsList[0].name}, ${destinationsList[0].country}`);
    const destination = encodeURIComponent(
      `${destinationsList[destinationsList.length - 1].name}, ${destinationsList[destinationsList.length - 1].country}`
    );
    const waypoints = destinationsList
      .slice(1, -1)
      .map((d) => encodeURIComponent(`${d.name}, ${d.country}`))
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ''
    }`;
  };

  // Add Itinerary Activity
  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim() || !selectedDayId) return;

    addItineraryItem(trip.id, selectedDayId, {
      title: activityTitle.trim(),
      type: activityType,
      time: activityTime,
      location: activityLocation.trim() || undefined,
      notes: activityNotes.trim() || undefined,
    });

    setActivityTitle('');
    setActivityLocation('');
    setActivityNotes('');
    setShowAddActivityModal(false);
    showToast('Activity added to day!');
  };

  // Budget calculations for this trip
  const tripBudgetItems = budgetItems.filter((b) => b.tripId === trip.id);
  const plannedBudget = trip.totalBudget || 0;
  const actualSpent = tripBudgetItems.reduce((acc, curr) => acc + (curr.actualAmount || 0), 0);
  const remainingBudget = plannedBudget - actualSpent;

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up text-sm font-semibold">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Cover */}
      <section className="relative h-80 sm:h-95 w-full overflow-hidden">
        <img
          src={trip.coverImageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80'}
          alt={trip.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Trips</span>
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/80 backdrop-blur-md text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                {destinationsList.length} Stops in Route
              </span>
              <span className="text-xs text-slate-300">
                {trip.startDate} to {trip.endDate} • {trip.travelersCount} Travelers
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
              {trip.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-light">
              {trip.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={generateGoogleMapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('route')}
              className={cn(
                'px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2',
                activeTab === 'route'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Navigation className="w-4 h-4" />
              <span>Route Order ({destinationsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('itinerary')}
              className={cn(
                'px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2',
                activeTab === 'itinerary'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>Day-by-Day Itinerary ({trip.days?.length || 1})</span>
            </button>

            <Link
              to="/budget"
              className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Trip Budget & Expenses</span>
            </Link>

            <Link
              to="/gear-calculator"
              className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <span>Gear & Supplies</span>
            </Link>
          </div>

          {/* Quick Mark Completed Toggle */}
          <button
            onClick={() => {
              updateTrip(trip.id, { isCompleted: !trip.isCompleted });
              showToast(trip.isCompleted ? 'Trip reopened' : 'Marked trip as completed! 🎉');
            }}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer',
              trip.isCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 hover:border-slate-300'
            )}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{trip.isCompleted ? 'Completed' : 'Mark Completed'}</span>
          </button>
        </div>

        {/* TAB 1: Route Order & Arrange Sequence */}
        {activeTab === 'route' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    Arrange Travel Route Order
                  </h3>
                  <p className="text-xs text-slate-500">
                    Use Up and Down arrows to rearrange visiting order (e.g. Move Osaka from #5 to #3).
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddDestModal(true)}
                >
                  Add Destination
                </Button>
              </div>

              {/* Destinations Reordering List */}
              <div className="space-y-3">
                {destinationsList.map((dest, idx) => (
                  <div
                    key={dest.id || idx}
                    className="p-4 bg-white dark:bg-[#0c1e28] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4 group hover:border-teal-400 transition-all"
                  >
                    {/* Position Number Pill */}
                    <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                      #{idx + 1}
                    </div>

                    {/* Thumbnail Image */}
                    <img
                      src={dest.coverImageUrl}
                      alt={dest.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    {/* Destination Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white truncate">
                          {dest.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                          {dest.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {dest.city}, {dest.country} • Best: {dest.bestTimeToVisit || 'Year-round'}
                      </p>
                      <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium line-clamp-1 mt-1">
                        Planned: {dest.description}
                      </p>
                    </div>

                    {/* Reordering Controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === destinationsList.length - 1}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/destinations/${dest.id}`}
                        className="p-2 rounded-xl text-sky-600 hover:bg-sky-50 cursor-pointer"
                        title="View Destination"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => removeDestinationFromTrip(trip.id, dest.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Remove from Route"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Summary & Google Maps Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-lg space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">Route Directions</h4>
                    <p className="text-xs text-slate-500">{destinationsList.length} connected destinations</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <p>
                    Your ordered itinerary can be directly launched in Google Maps for turn-by-turn driving, high-speed rail, and walking navigation.
                  </p>
                  <a
                    href={generateGoogleMapsDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open Route in Google Maps</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Total Planned Budget:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {trip.currency || 'USD'} {plannedBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Actual Spent to Date:</span>
                    <span className="font-bold text-emerald-600">
                      {trip.currency || 'USD'} {actualSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Remaining Balance:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {trip.currency || 'USD'} {remainingBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Day-by-Day Itinerary Planning */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Day-by-Day Travel Schedule
                </h3>
                <p className="text-xs text-slate-500">
                  Assign destinations and schedule Morning, Afternoon, and Evening activities.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  setSelectedDayId(trip.days?.[0]?.id || `day-1`);
                  setShowAddActivityModal(true);
                }}
              >
                Add Activity
              </Button>
            </div>

            {/* Days Itinerary Cards */}
            <div className="space-y-6">
              {(trip.days || []).map((day) => (
                <div
                  key={day.id}
                  className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-lg space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                        {day.dayNumber}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                          {day.title || `Day ${day.dayNumber}`}
                        </h4>
                        <p className="text-xs text-slate-400">{day.date}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDayId(day.id);
                        setShowAddActivityModal(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-100 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>
                  </div>

                  {/* Day Activities List */}
                  {day.items.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No activities added for this day yet. Click "Add Activity" to plan your morning, afternoon, or evening!
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {day.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 relative group"
                        >
                          <div className="flex items-center justify-between text-xs text-teal-600 font-bold">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time || 'Scheduled'}
                            </span>
                            <button
                              onClick={() => deleteItineraryItem(trip.id, day.id, item.id)}
                              className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Delete activity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h5 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                            {item.title}
                          </h5>
                          {item.location && (
                            <p className="text-[11px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {item.location}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
                              "{item.notes}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Destination to Route Modal */}
      {showAddDestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                Add Place to Itinerary Route
              </h4>
              <button
                onClick={() => setShowAddDestModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {allDestinations.map((d) => {
                const isAlreadyInTrip = destinationsList.some((existing) => existing.id === d.id);
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <img src={d.coverImageUrl} alt={d.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">{d.name}</h5>
                        <p className="text-[10px] text-slate-500">{d.city}, {d.country} ({d.category})</p>
                      </div>
                    </div>

                    <button
                      disabled={isAlreadyInTrip}
                      onClick={() => {
                        addDestinationToTrip(trip.id, d);
                        setShowAddDestModal(false);
                        showToast(`Added "${d.name}" to route!`);
                      }}
                      className={cn(
                        'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer',
                        isAlreadyInTrip
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm'
                      )}
                    >
                      {isAlreadyInTrip ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAddDestModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                Add Planned Activity
              </h4>
              <button
                onClick={() => setShowAddActivityModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Activity Title</label>
                <input
                  type="text"
                  placeholder="e.g. Visit Senso-ji Temple & try melonpan"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Time / Period</label>
                  <select
                    value={activityTime}
                    onChange={(e) => setActivityTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    <option value="Morning (09:00 AM)">Morning (09:00 AM)</option>
                    <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM)</option>
                    <option value="Evening (07:00 PM)">Evening (07:00 PM)</option>
                    <option value="All Day">All Day</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value as ItineraryItemType)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    <option value="ATTRACTION">Attraction</option>
                    <option value="ACTIVITY">Activity / Tour</option>
                    <option value="RESTAURANT">Food & Dining</option>
                    <option value="TRANSPORT">Transit</option>
                    <option value="HOTEL">Hotel / Stay</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Location / Address</label>
                <input
                  type="text"
                  placeholder="e.g. Asakusa, Tokyo"
                  value={activityLocation}
                  onChange={(e) => setActivityLocation(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Notes / Tips</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Arrive 30 minutes early, dress modestly..."
                  value={activityNotes}
                  onChange={(e) => setActivityNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Save to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
