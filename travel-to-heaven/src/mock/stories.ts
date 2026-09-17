import type { Story } from '@/types/story.types';
import { MOCK_USERS } from './users';
import { MOCK_DESTINATIONS } from './destinations';

export const MOCK_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'The Silent Whispers of Arashiyama: A Dawn Walk in Kyoto',
    excerpt: 'Stepping into the bamboo grove before the sunrise reveals an ethereal acoustic sanctuary rarely experienced by day tourists.',
    content: `When the first twilight blue breaks over Mount Atago, the Arashiyama bamboo forest exists in a state of suspended meditation. Long before tour buses arrive, the only sound is the rhythmic creaking of hollow green culms swaying in unison against the mountain breeze—a gentle friction known in Japanese as *take-no-uta*, or song of the bamboo.

### The Sacred Silence

Walking solitary down the pebble path illuminated solely by stone toro lanterns, the canopy rises dozens of meters overhead, filtering the dawn light into emerald prisms. Local temple caretakers sweep the gravel borders with handcrafted birch brooms, their deliberate cadence creating an ancient, grounding metronome.

> "To truly hear Kyoto, one must arrive before the world awakens. The silence is not empty; it is filled with centuries of devotion."

Following the northern trail leads directly to the secluded moss gardens of Gio-ji, where over forty varieties of velvet emerald moss blanket the temple grounds under ancient Japanese maples.`,
    category: 'Cultural Exploration',
    tags: ['Japan', 'Kyoto', 'Zen', 'Photography', 'Slow Travel'],
    coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    author: MOCK_USERS[3], // Maya Patel
    destination: MOCK_DESTINATIONS[1],
    readingTimeMinutes: 6,
    likesCount: 528,
    commentsCount: 34,
    isLiked: false,
    isBookmarked: true,
    status: 'PUBLISHED',
    publishedAt: '2026-08-14T08:00:00Z',
    createdAt: '2026-08-12T14:30:00Z',
  },
  {
    id: 'story-2',
    title: 'Traversing the High Passes of the Swiss Valais: Under the Gaze of the Matterhorn',
    excerpt: 'An 8-day high alpine circuit tracing glacial moraines, wild edelweiss meadows, and historic mountain refuges.',
    content: `There is no mountain silhouette on earth as instantly recognizable, nor as forbidding, as the Matterhorn. Rising like a jagged granite arrowhead 4,478 meters into the Valais stratosphere, it serves as the north star for hikers tackling the Europaweg high trail.

### Crossing the Suspension Bridge

Leaving Sunnegga at first light, our path led along the high contour lines toward the Charles Kuonen Suspension Bridge—a 494-meter aerial footbridge spanning a dizzying 85-meter chasm above the Grabengufer ravine. Stepping onto the galvanized steel grate, the wind howls up from the valley floor while the entire Weisshorn massif glints in blinding morning ice.

Every evening ended at timber alpine refuges, warming cold fingers over steaming bowls of Valais raclette cheese, crusty rye bread, and local Fendant white wine while watching alpine glow turn granite walls into fiery crimson.`,
    category: 'Alpine Adventures',
    tags: ['Switzerland', 'Alps', 'Trekking', 'Mountains', 'Adventure'],
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    author: MOCK_USERS[0], // Alex Rivera
    destination: MOCK_DESTINATIONS[5],
    readingTimeMinutes: 8,
    likesCount: 842,
    commentsCount: 62,
    isLiked: true,
    isBookmarked: true,
    status: 'PUBLISHED',
    publishedAt: '2026-08-20T10:00:00Z',
    createdAt: '2026-08-18T16:20:00Z',
  },
  {
    id: 'story-3',
    title: 'Aegean Light: Living in the Cliffside Caves of Oia',
    excerpt: 'How spending a month in a converted subterranean canava changed my perspective on Cycladic architecture and Mediterranean time.',
    content: `To stay in a traditional Santorini *canava*—a cave house carved directly into the compressed volcanic ash pumice of the caldera rim—is to understand how ancient islanders conquered summer heat and winter gales.

The whitewashed curved ceilings keep the interior perpetually chilled at 18 degrees Celsius, while stepping onto the private terrace presents a panoramic drop of three hundred sheer meters into the sapphire basin of the collapsed volcano crater.

Mornings start with Greek mountain tea, thyme honey, and sheep milk yogurt as fishermen steer small colorful wooden kaiki boats far below, their wakes drawing delicate white lines across deep cobalt waters.`,
    category: 'Island Living',
    tags: ['Greece', 'Santorini', 'Architecture', 'Sunset', 'Mediterranean'],
    coverImageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    author: MOCK_USERS[1], // Elena Rostova
    destination: MOCK_DESTINATIONS[0],
    readingTimeMinutes: 5,
    likesCount: 619,
    commentsCount: 41,
    isLiked: true,
    isBookmarked: false,
    status: 'PUBLISHED',
    publishedAt: '2026-08-28T15:00:00Z',
    createdAt: '2026-08-26T11:00:00Z',
  },
  {
    id: 'story-4',
    title: 'The Great Migration: 48 Hours in the Northern Serengeti',
    excerpt: 'Witnessing thousands of wildebeest brave the Mara River crocodiles in one of nature’s most raw spectacles.',
    content: `The dust rises in massive ochre plumes along the northern banks of the Mara River. For three days, a herd of over fifty thousand wildebeest has paced the steep embankment, held back by primal fear and the glistening eyes of Nile crocodiles basking on sandbars below.

Then, a single brave bull leaps into the churning brown torrent.

Instantly, the river erupts into thunderous splashing, frantic grunting, and immense surging energy. Witnessing this sheer survival instinct up close from an open safari vehicle strips away every modern distraction.`,
    category: 'Wildlife & Safari',
    tags: ['Safari', 'Tanzania', 'Wildlife', 'Africa', 'Serengeti'],
    coverImageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    author: MOCK_USERS[2], // Marcus Chen
    destination: MOCK_DESTINATIONS[4],
    readingTimeMinutes: 7,
    likesCount: 974,
    commentsCount: 88,
    isLiked: false,
    isBookmarked: false,
    status: 'PUBLISHED',
    publishedAt: '2026-09-02T12:00:00Z',
    createdAt: '2026-08-30T09:15:00Z',
  },
];
