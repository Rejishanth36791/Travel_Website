import type { Trip } from '@/types/trip.types';
import type { BudgetItem } from '@/types/budget.types';
import { MOCK_DESTINATIONS } from './destinations';

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    title: 'Italian Renaissance & Amalfi Coast Escapade',
    description: '14-day romantic expedition from the art galleries of Florence down to the pastel seaside cliffs of Positano.',
    destination: MOCK_DESTINATIONS[3], // Amalfi Coast
    startDate: '2026-10-01',
    endDate: '2026-10-14',
    travelersCount: 2,
    notes: 'Reservations made for cliffside dinner at Le Sirenuse and private wooden gozzo boat around Capri.',
    coverImageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    totalBudget: 4500,
    totalSpent: 1200,
    createdAt: '2026-08-15T10:00:00Z',
    days: [
      {
        id: 'day-1',
        tripId: 'trip-1',
        dayNumber: 1,
        date: '2026-10-01',
        title: 'Arrival in Naples & Drive to Positano',
        items: [
          { id: 'it-1', dayId: 'day-1', title: 'Pick up Alfa Romeo at Naples Airport', type: 'TRANSPORT', time: '11:00 AM', location: 'Naples Capodichino Airport', notes: 'Confirmation #IT-9821', order: 1 },
          { id: 'it-2', dayId: 'day-1', title: 'Check in at Hotel Villa Franca', type: 'HOTEL', time: '02:30 PM', location: 'Via Pasitea, Positano', notes: 'Balcony room facing sea', order: 2 },
          { id: 'it-3', dayId: 'day-1', title: 'Sunset Spritz at Franco\'s Bar', type: 'RESTAURANT', time: '06:30 PM', location: 'Positano Cliffside', notes: 'Arrive 30 mins early for terrace seating', order: 3 },
        ],
      },
      {
        id: 'day-2',
        tripId: 'trip-1',
        dayNumber: 2,
        date: '2026-10-02',
        title: 'Hiking the Path of the Gods (Sentiero degli Dei)',
        items: [
          { id: 'it-4', dayId: 'day-2', title: 'Early Morning Espresso & Cornetto', type: 'RESTAURANT', time: '07:30 AM', location: 'Bomerano Square', order: 1 },
          { id: 'it-5', dayId: 'day-2', title: 'Trek the Sentiero degli Dei to Nocelle', type: 'ACTIVITY', time: '08:30 AM', location: 'Bomerano to Nocelle Trailhead', notes: 'Bring 2L water and sun protection', order: 2 },
          { id: 'it-6', dayId: 'day-2', title: 'Fresh Lemon Granita & Lunch in Nocelle', type: 'RESTAURANT', time: '01:00 PM', location: 'Trattoria Santa Croce', order: 3 },
          { id: 'it-7', dayId: 'day-2', title: 'Relax at Fornillo Beach', type: 'ATTRACTION', time: '03:30 PM', location: 'Spiaggia del Fornillo', order: 4 },
        ],
      },
      {
        id: 'day-3',
        tripId: 'trip-1',
        dayNumber: 3,
        date: '2026-10-03',
        title: 'Private Wooden Gozzo Boat around Capri',
        items: [
          { id: 'it-8', dayId: 'day-3', title: 'Board private boat at Positano Pier', type: 'TRANSPORT', time: '09:00 AM', location: 'Positano Spiaggia Grande', notes: 'Captain Marco', order: 1 },
          { id: 'it-9', dayId: 'day-3', title: 'Swim through the Faraglioni rock arches', type: 'ACTIVITY', time: '11:30 AM', location: 'Capri Coast', order: 2 },
          { id: 'it-10', dayId: 'day-3', title: 'Lunch at La Fontelina Beach Club', type: 'RESTAURANT', time: '01:30 PM', location: 'Faraglioni, Capri', order: 3 },
        ],
      },
    ],
  },
  {
    id: 'trip-2',
    title: 'Kyoto & Central Japan Zen Pilgrimage',
    description: '10-day immersive exploration of historic tea houses, cedar forest temples, and traditional ryokans in Kyoto and Nara.',
    destination: MOCK_DESTINATIONS[1], // Kyoto
    startDate: '2026-11-05',
    endDate: '2026-11-15',
    travelersCount: 1,
    notes: 'JR Rail Pass activated at Haneda. Ryokan with private outdoor onsen booked in Arashiyama.',
    coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    totalBudget: 3200,
    totalSpent: 950,
    createdAt: '2026-08-25T14:00:00Z',
    days: [
      {
        id: 'day-201',
        tripId: 'trip-2',
        dayNumber: 1,
        date: '2026-11-05',
        title: 'Shinkansen Arrival & Gion Evening Walk',
        items: [
          { id: 'it-201', dayId: 'day-201', title: 'Check in at Hoshinoya Kyoto', type: 'HOTEL', time: '03:00 PM', location: 'Arashiyama, Kyoto', order: 1 },
          { id: 'it-202', dayId: 'day-201', title: 'Twilight walk through Shirakawa canal lanes', type: 'ATTRACTION', time: '06:00 PM', location: 'Gion', order: 2 },
        ],
      },
    ],
  },
  {
    id: 'trip-3',
    title: 'Wild Canadian Rockies Glacial Odyssey',
    description: '7-day campervan expedition linking Banff, Lake Louise, the Icefields Parkway, and Jasper National Park.',
    destination: MOCK_DESTINATIONS[2], // Banff
    startDate: '2027-06-12',
    endDate: '2027-06-19',
    travelersCount: 3,
    notes: 'Parks Canada discovery pass obtained. Bear spray and trekking poles packed.',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    totalBudget: 2800,
    totalSpent: 450,
    createdAt: '2026-09-01T09:00:00Z',
    days: [
      {
        id: 'day-301',
        tripId: 'trip-3',
        dayNumber: 1,
        date: '2027-06-12',
        title: 'Calgary to Banff & Sulphur Mountain',
        items: [
          { id: 'it-301', dayId: 'day-301', title: 'Pick up 4WD Campervan', type: 'TRANSPORT', time: '10:00 AM', location: 'Calgary International', order: 1 },
          { id: 'it-302', dayId: 'day-301', title: 'Banff Gondola to Sulphur Mountain boardwalk', type: 'ACTIVITY', time: '03:00 PM', location: 'Banff Gondola', order: 2 },
        ],
      },
    ],
  },
];

export const MOCK_BUDGET_ITEMS: BudgetItem[] = [
  { id: 'b1', tripId: 'trip-1', name: 'Round-trip flight Rome FCO', category: 'FLIGHTS', estimatedAmount: 850, actualAmount: 780, currency: 'USD', date: '2026-10-01', createdAt: '2026-08-20' },
  { id: 'b2', tripId: 'trip-1', name: 'Hotel Villa Franca (Positano)', category: 'ACCOMMODATION', estimatedAmount: 2200, actualAmount: 0, currency: 'USD', date: '2026-10-01', createdAt: '2026-08-20' },
  { id: 'b3', tripId: 'trip-1', name: 'Cliffside restaurants & trattorias', category: 'FOOD', estimatedAmount: 650, actualAmount: 210, currency: 'USD', createdAt: '2026-08-25' },
  { id: 'b4', tripId: 'trip-1', name: 'Private wooden gozzo boat to Capri', category: 'ACTIVITIES', estimatedAmount: 420, actualAmount: 140, currency: 'USD', createdAt: '2026-08-25' },
  { id: 'b5', tripId: 'trip-1', name: 'Alfa Romeo rental & coastal fuel', category: 'TRANSPORTATION', estimatedAmount: 380, actualAmount: 70, currency: 'USD', createdAt: '2026-09-01' },
  { id: 'b6', tripId: 'trip-1', name: 'Ceramics & artisan limoncello', category: 'SHOPPING', estimatedAmount: 200, actualAmount: 0, currency: 'USD', createdAt: '2026-09-01' },
];
