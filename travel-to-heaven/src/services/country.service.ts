import type { Destination } from '@/types/destination.types';
import { MOCK_DESTINATIONS } from '@/mock/destinations';

export interface CountryInfo {
  name: string;
  officialName: string;
  code: string;
  flag: string;
  capital: string;
  region: string;
  subregion: string;
  languages: string[];
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  population: number;
  bestTimeToVisit: string;
  weatherOverview: string;
  introduction: string;
  heroImage: string;
  galleryImages: string[];
  traditionalFood: {
    name: string;
    description: string;
    image: string;
  }[];
  culturalHighlights: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  destinations: Destination[];
}

export const CURATED_COUNTRIES: Record<string, CountryInfo> = {
  japan: {
    name: 'Japan',
    officialName: 'State of Japan',
    code: 'JP',
    flag: '🇯🇵',
    capital: 'Tokyo',
    region: 'Asia',
    subregion: 'Eastern Asia',
    languages: ['Japanese', 'English (tourist areas)'],
    currency: {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
    },
    population: 125500000,
    bestTimeToVisit: 'March to May (Cherry Blossoms) & October to November (Autumn Leaves)',
    weatherOverview: 'Four distinct seasons. Spring offers mild temperatures (15°C–21°C), Summer is warm and humid, Autumn is crisp and clear, and Winter brings world-class snowfall to the northern Alps.',
    introduction: 'Japan harmoniously blends millennia-old traditions with futuristic innovation. From the serene Zen bamboo temples of Kyoto and the neon-lit crossing of Shibuya to the snow-capped volcanic majesty of Mount Fuji, Japan captivates with unrivaled safety, exquisite culinary artistry, and deep cultural reverence.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Authentic Ramen',
        description: 'Rich slow-simmered tonkotsu or shoyu broth paired with springy handmade noodles, chashu pork, and soft-boiled seasoned egg.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Artisan Nigiri Sushi',
        description: 'Pristine fresh ocean seafood delicately hand-pressed over warm seasoned sushi rice with freshly grated real wasabi.',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Uji Ceremonial Matcha & Wagashi',
        description: 'Stone-ground green tea whisked to velvety perfection, served alongside intricate seasonal sweet rice cakes.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Crispy Tempura & Yakitori',
        description: 'Light featherweight fried seafood and vegetables, and charcoal-grilled skewers basted in rich tare glaze.',
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'Over 2,000 preserved Buddhist temples and sacred Shinto shrines in Kyoto and Nara.',
      'World-famous Shinkansen bullet train network connecting major islands with split-second precision.',
      'Traditional onsen hot spring ryokan retreats with multi-course Kaiseki dining.',
      'Vibrant pop culture, anime districts in Akihabara, and cutting-edge digital art museums.',
    ],
    coordinates: {
      latitude: 36.2048,
      longitude: 138.2529,
    },
    destinations: [
      MOCK_DESTINATIONS[1], // Kyoto
      {
        id: 'dest-jp-tokyo',
        name: 'Tokyo Metropolis & Shibuya',
        country: 'Japan',
        city: 'Tokyo',
        region: 'Kanto',
        category: 'City',
        description: 'Ultra-modern skyscrapers, electric neon alleys, historic Asakusa Senso-ji temple, and world-leading gastronomy.',
        overview: 'Tokyo is the most populous metropolitan area in the world, renowned for its Michelin-starred dining, peaceful shrine gardens, and iconic Shibuya scramble crossing.',
        history: 'Originally a small fishing village named Edo, it became the seat of the Tokugawa Shogunate in 1603 and Japan’s imperial capital in 1868.',
        bestTimeToVisit: 'March to May & September to November',
        language: 'Japanese, English',
        currency: 'JPY (¥)',
        timeZone: 'UTC+9 (JST)',
        rating: 4.94,
        reviewsCount: 3820,
        coverImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-tokyo-1', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Tokyo Tower and skyline' },
        ],
        activities: [
          { id: 'act-tokyo-1', name: 'Shibuya Crossing & Rooftop View', description: 'Experience the world-famous intersection and panoramic sunset observation deck.', category: 'City', estimatedPrice: 15, rating: 4.9 },
          { id: 'act-tokyo-2', name: 'Senso-ji Asakusa Morning Walk', description: 'Explore Tokyo’s oldest temple and the lively Nakamise shopping lane.', category: 'Heritage', estimatedPrice: 0, rating: 4.8 },
        ],
        coordinates: { latitude: 35.6762, longitude: 139.6503 },
        isFavorite: true,
        featured: true,
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: 'dest-jp-fuji',
        name: 'Mount Fuji & Five Lakes',
        country: 'Japan',
        city: 'Fujikawaguchiko',
        region: 'Chubu',
        category: 'Mountain',
        description: 'Japan’s iconic 3,776-meter sacred volcano rising gracefully above tranquil alpine lakes and blooming cherry trees.',
        overview: 'Mount Fuji is an active composite volcano and UNESCO World Heritage cultural site that has inspired artists and pilgrims for over a millennium.',
        history: 'Revered as a sacred deity in Shinto tradition, ascetics have climbed the volcano as a spiritual trial since the 12th century.',
        bestTimeToVisit: 'July to August (for climbing) & October to February (for clear views)',
        language: 'Japanese',
        currency: 'JPY (¥)',
        timeZone: 'UTC+9 (JST)',
        rating: 4.96,
        reviewsCount: 2940,
        coverImageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-fuji-1', url: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Chureito Pagoda facing Mount Fuji' },
        ],
        activities: [
          { id: 'act-fuji-1', name: 'Chureito Pagoda Sunrise Trek', description: 'Capture the definitive postcard vista of Mount Fuji framed by red pagoda eaves.', category: 'Scenic', estimatedPrice: 0, rating: 5.0 },
          { id: 'act-fuji-2', name: 'Lake Kawaguchiko Boat Cruise', description: 'Glide across the mirror waters taking in panoramic reflections of the snow cone.', category: 'Adventure', estimatedPrice: 20, rating: 4.8 },
        ],
        coordinates: { latitude: 35.3606, longitude: 138.7274 },
        isFavorite: false,
        featured: true,
        createdAt: '2023-01-05T00:00:00Z',
      },
      {
        id: 'dest-jp-osaka',
        name: 'Osaka Food & Dotonbori',
        country: 'Japan',
        city: 'Osaka',
        region: 'Kansai',
        category: 'Food',
        description: 'Japan’s culinary kitchen: sizzling takoyaki, okonomiyaki, vibrant neon signs, and friendly mercantile culture.',
        overview: 'Known affectionately as tenka no daidokoro (the nation’s kitchen), Osaka offers energetic street food culture centered around the Dotonbori canal.',
        history: 'Toyotomi Hideyoshi built Osaka Castle in the 16th century, making it Japan’s central economic and trade hub.',
        bestTimeToVisit: 'March to May & September to November',
        language: 'Japanese',
        currency: 'JPY (¥)',
        timeZone: 'UTC+9 (JST)',
        rating: 4.87,
        reviewsCount: 2150,
        coverImageUrl: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-osaka-1', url: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Dotonbori neon canal nightscape' },
        ],
        activities: [
          { id: 'act-osaka-1', name: 'Dotonbori Street Food Crawl', description: 'Sample steaming octopus balls, kushikatsu skewers, and savoury cabbage pancakes.', category: 'Culinary', estimatedPrice: 35, rating: 4.9 },
        ],
        coordinates: { latitude: 34.6937, longitude: 135.5023 },
        isFavorite: false,
        featured: false,
        createdAt: '2023-01-07T00:00:00Z',
      },
    ],
  },
  'sri lanka': {
    name: 'Sri Lanka',
    officialName: 'Democratic Socialist Republic of Sri Lanka',
    code: 'LK',
    flag: '🇱🇰',
    capital: 'Sri Jayawardenepura Kotte (Colombo)',
    region: 'Asia',
    subregion: 'Southern Asia',
    languages: ['Sinhala', 'Tamil', 'English'],
    currency: {
      code: 'LKR',
      name: 'Sri Lankan Rupee',
      symbol: 'Rs / LKR',
    },
    population: 22150000,
    bestTimeToVisit: 'December to April (West & South Coast) & May to September (East Coast)',
    weatherOverview: 'Tropical climate with warm temperatures year-round (27°C–32°C). Two distinct monsoon seasons ensure sunny beaches on opposite coasts throughout the year.',
    introduction: 'The Pearl of the Indian Ocean, Sri Lanka is a tropical paradise of ancient rock citadels, mist-draped Ceylon tea plantations, sun-drenched golden beaches, and wild national parks teeming with leopards and Asian elephants.',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Spicy Kottu Roti',
        description: 'Finely chopped flatbread scrambled on hot iron griddles with vegetables, aromatic spices, and egg or tender chicken.',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Crispy Hoppers (Appa)',
        description: 'Bowl-shaped fermented rice flour and coconut milk pancakes with soft spongy centers and crispy lace borders, often served with an egg in the center.',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Pure Ceylon High-Grown Tea',
        description: 'World-renowned fragrant single-origin black tea cultivated on the verdant cloud-shrouded slopes of Nuwara Eliya and Ella.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'Ancient UNESCO cultural triangle including Sigiriya, Polonnaruwa, and Anuradhapura.',
      'Scattered colonial heritage fortified in the 17th-century ramparts of Galle Dutch Fort.',
      'World-famous scenic blue train journey winding through cloud forests from Kandy to Ella.',
      'Spectacular wildlife game drives in Yala and Minneriya Elephant Gathering.',
    ],
    coordinates: {
      latitude: 7.8731,
      longitude: 80.7718,
    },
    destinations: [
      {
        id: 'dest-lk-sigiriya',
        name: 'Sigiriya Lion Rock Fortress',
        country: 'Sri Lanka',
        city: 'Sigiriya',
        region: 'Central Province',
        category: 'Historical',
        description: 'Monolithic 200-meter sheer granite fortress crowned with the 5th-century sky palace ruins of King Kashyapa.',
        overview: 'Rising dramatically from the central dry plains, Sigiriya features ancient water gardens, mirror walls inscribed with early poetry, and colourful celestial frescoes.',
        history: 'Built by King Kashyapa between 477 and 495 CE as an impenetrable royal residence and Buddhist monastery.',
        bestTimeToVisit: 'December to April',
        language: 'Sinhala, English',
        currency: 'LKR (Rs)',
        timeZone: 'UTC+5:30',
        rating: 4.95,
        reviewsCount: 3120,
        coverImageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-sig-1', url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Sigiriya monolith at golden sunrise' },
        ],
        activities: [
          { id: 'act-sig-1', name: 'Sunrise Climb to the Sky Palace', description: 'Scale the historic metal staircases through the giant Lion Paw portal to the summit ruins.', category: 'Heritage', estimatedPrice: 30, rating: 5.0 },
          { id: 'act-sig-2', name: 'Pidurangala Rock Dawn Viewpoint', description: 'Hike the neighboring boulder peak for an awe-inspiring vista of Sigiriya bathed in morning mist.', category: 'Trekking', estimatedPrice: 5, rating: 4.9 },
        ],
        coordinates: { latitude: 7.9570, longitude: 80.7603 },
        isFavorite: true,
        featured: true,
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: 'dest-lk-ella',
        name: 'Ella & Nine Arch Bridge',
        country: 'Sri Lanka',
        city: 'Ella',
        region: 'Uva Province',
        category: 'Mountain',
        description: 'Verdant hill country mountain village famous for the colonial stone viaduct bridge and Little Adam’s Peak.',
        overview: 'Surrounded by lush emerald tea estates and waterfalls, Ella offers cool highland breezes and unforgettable railway journeys.',
        bestTimeToVisit: 'January to May',
        language: 'Sinhala, English',
        currency: 'LKR (Rs)',
        timeZone: 'UTC+5:30',
        rating: 4.91,
        reviewsCount: 2450,
        coverImageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-ella-1', url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Blue train crossing Nine Arch Bridge' },
        ],
        activities: [
          { id: 'act-ella-1', name: 'Nine Arch Bridge Train Watch', description: 'Sit amidst lush tea fields as the red and blue mountain train trundles across the stone arches.', category: 'Scenic', estimatedPrice: 0, rating: 4.9 },
        ],
        coordinates: { latitude: 6.8722, longitude: 81.0466 },
        isFavorite: false,
        featured: true,
        createdAt: '2023-01-05T00:00:00Z',
      },
      {
        id: 'dest-lk-galle',
        name: 'Galle Dutch Fort',
        country: 'Sri Lanka',
        city: 'Galle',
        region: 'Southern Province',
        category: 'Cultural',
        description: 'Living 17th-century coastal fortress blending European architecture and South Asian traditions along the turquoise sea.',
        overview: 'Cobblestone lanes lined with chic cafes, colonial churches, gem jewelers, and sunset bastions where locals gather.',
        bestTimeToVisit: 'November to April',
        language: 'Sinhala, English',
        currency: 'LKR (Rs)',
        timeZone: 'UTC+5:30',
        rating: 4.88,
        reviewsCount: 1980,
        coverImageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        images: [
          { id: 'img-galle-1', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: 'Galle Fort Lighthouse on the ocean rampart' },
        ],
        activities: [
          { id: 'act-galle-1', name: 'Sunset Rampart Walk to Flag Rock', description: 'Stroll the massive stone walls watching cliff divers plunge into the breaking surf.', category: 'Walking Tour', estimatedPrice: 0, rating: 4.8 },
        ],
        coordinates: { latitude: 6.0329, longitude: 80.2168 },
        isFavorite: true,
        featured: false,
        createdAt: '2023-01-10T00:00:00Z',
      },
    ],
  },
  greece: {
    name: 'Greece',
    officialName: 'Hellenic Republic',
    code: 'GR',
    flag: '🇬🇷',
    capital: 'Athens',
    region: 'Europe',
    subregion: 'Southern Europe',
    languages: ['Greek', 'English'],
    currency: {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
    population: 10430000,
    bestTimeToVisit: 'April to October (warm sunshine and ideal sailing conditions)',
    weatherOverview: 'Classic Mediterranean climate with hot, dry summers and mild, rainy winters. Over 300 days of sunshine annually.',
    introduction: 'The birthplace of democracy, Western philosophy, and the Olympic Games, Greece enchants with whitewashed island calderas perched over cobalt waters, ancient marble sanctuaries, and olive-scented Mediterranean living.',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Moussaka',
        description: 'Layered spiced minced meat, tender sautéed eggplant, and potato topped with velvety golden béchamel.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Greek Island Salad & Feta',
        description: 'Sun-ripened tomatoes, crisp cucumbers, Kalamata olives, oregano, and blocks of creamy sheep feta dressed in cold-pressed olive oil.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'The Acropolis of Athens and the Parthenon towering above the ancient Agora.',
      'Sailing through the Cyclades and Dodecanese archipelago across cobalt seas.',
      'Centuries-old Orthodox monasteries perched atop the sandstone pillars of Meteora.',
    ],
    coordinates: { latitude: 39.0742, longitude: 21.8243 },
    destinations: [MOCK_DESTINATIONS[0]], // Santorini
  },
  italy: {
    name: 'Italy',
    officialName: 'Italian Republic',
    code: 'IT',
    flag: '🇮🇹',
    capital: 'Rome',
    region: 'Europe',
    subregion: 'Southern Europe',
    languages: ['Italian', 'English'],
    currency: {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
    population: 59000000,
    bestTimeToVisit: 'April to June & September to October',
    weatherOverview: 'Warm Mediterranean climate along the coasts, cooler alpine temperatures in the northern Dolomites, and pleasant sunny spring and autumn.',
    introduction: 'An open-air museum of art, history, and culinary grandeur. From the Roman Colosseum and Renaissance Florence to the romantic canals of Venice and pastel cliffside villages of the Amalfi Coast.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Neapolitan Wood-fired Pizza',
        description: 'Airy charred crust made from San Marzano tomatoes, fresh buffalo mozzarella, and aromatic basil.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Artisan Pasta Carbonara',
        description: 'Spaghetti tossed with crispy guanciale, pecorino romano, fresh egg yolks, and cracked black pepper.',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'The Colosseum, Roman Forum, and Vatican City in Rome.',
      'Uffizi Gallery and Brunelleschi’s dome in Florence.',
      'Gondola rides through the historic canals of Venice.',
    ],
    coordinates: { latitude: 41.8719, longitude: 12.5674 },
    destinations: [MOCK_DESTINATIONS[3]], // Amalfi Coast
  },
  canada: {
    name: 'Canada',
    officialName: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    capital: 'Ottawa',
    region: 'Americas',
    subregion: 'North America',
    languages: ['English', 'French'],
    currency: {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: '$',
    },
    population: 39500000,
    bestTimeToVisit: 'June to September (Hiking) & December to March (Skiing)',
    weatherOverview: 'Warm sunny summers (20°C–28°C) in southern provinces, crisp golden autumns, and snowy wonderland winters ideal for skiing.',
    introduction: 'The world’s second-largest country offers boundless wilderness: glacial lakes of electric turquoise, rugged Rocky Mountain ranges, vast boreal forests, and welcoming cosmopolitan cities.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Quebec Poutine',
        description: 'Crispy golden French fries smothered in fresh squeaky cheese curds and piping hot savoury brown gravy.',
        image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'Banff and Jasper National Parks linked by the breathtaking Icefields Parkway.',
      'First Nations ancestral heritage and totems in Pacific Rim reserves.',
      'Historic cobblestone streets of Old Quebec City.',
    ],
    coordinates: { latitude: 56.1304, longitude: -106.3468 },
    destinations: [MOCK_DESTINATIONS[2]], // Banff
  },
  switzerland: {
    name: 'Switzerland',
    officialName: 'Swiss Confederation',
    code: 'CH',
    flag: '🇨🇭',
    capital: 'Bern',
    region: 'Europe',
    subregion: 'Western Europe',
    languages: ['German', 'French', 'Italian', 'Romansh', 'English'],
    currency: {
      code: 'CHF',
      name: 'Swiss Franc',
      symbol: 'CHF',
    },
    population: 8800000,
    bestTimeToVisit: 'June to September (Wildflower hiking) & December to April (Alpine snow sports)',
    weatherOverview: 'Pleasant warm summers in the valleys and year-round snowpack on peaks over 3,000 meters.',
    introduction: 'Precision, pristine alpine majesty, and serene lakes. Switzerland features world-renowned cogwheel trains, car-free alpine villages beneath the Matterhorn, and crystal-clear glacier waters.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    traditionalFood: [
      {
        name: 'Swiss Cheese Fondue',
        description: 'Melted Gruyère and Emmental with white wine and garlic, eaten by dipping crusty bread cubes.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
    ],
    culturalHighlights: [
      'Glacier Express panoramic train traversing 291 bridges across the Alps.',
      'Car-free Zermatt at the foot of the iconic Matterhorn.',
    ],
    coordinates: { latitude: 46.8182, longitude: 8.2275 },
    destinations: [MOCK_DESTINATIONS[5]], // Matterhorn
  },
};

/**
 * Country Service:
 * Searches for countries locally in curated registry, or dynamically queries REST Countries API
 * for any country in the world!
 */
export const countryService = {
  async getCountryByName(query: string): Promise<CountryInfo | null> {
    const cleanKey = query.trim().toLowerCase();

    // 1. Check curated registry first
    if (CURATED_COUNTRIES[cleanKey]) {
      return CURATED_COUNTRIES[cleanKey];
    }

    // Check partial match in curated registry
    const matchKey = Object.keys(CURATED_COUNTRIES).find((k) =>
      k.includes(cleanKey) || cleanKey.includes(k)
    );
    if (matchKey) {
      return CURATED_COUNTRIES[matchKey];
    }

    // 2. Fetch live country data dynamically from REST Countries API
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(cleanKey)}?fullText=false`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const raw = data[0];
          const commonName = raw.name?.common || query;
          const officialName = raw.name?.official || commonName;
          const flagEmoji = raw.flag || '🌍';
          const capital = Array.isArray(raw.capital) ? raw.capital[0] : (raw.capital || 'Major City');
          const region = raw.region || 'World';
          const subregion = raw.subregion || region;
          const population = raw.population || 5000000;
          
          const languages = raw.languages ? Object.values(raw.languages) as string[] : ['English'];
          
          let currCode = 'USD';
          let currName = 'US Dollar';
          let currSymbol = '$';
          if (raw.currencies) {
            const firstCurrCode = Object.keys(raw.currencies)[0];
            if (firstCurrCode) {
              currCode = firstCurrCode;
              currName = raw.currencies[firstCurrCode]?.name || firstCurrCode;
              currSymbol = raw.currencies[firstCurrCode]?.symbol || firstCurrCode;
            }
          }

          const lat = raw.latlng ? raw.latlng[0] : 20.0;
          const lng = raw.latlng ? raw.latlng[1] : 0.0;

          // Find destinations matching this country from our mock database
          const matchedDests = MOCK_DESTINATIONS.filter(
            (d) => d.country.toLowerCase() === commonName.toLowerCase() ||
                   d.country.toLowerCase().includes(commonName.toLowerCase()) ||
                   commonName.toLowerCase().includes(d.country.toLowerCase())
          );

          // If no destination in mock, create sample destinations for this country
          const dynamicDests: Destination[] = matchedDests.length > 0 ? matchedDests : [
            {
              id: `dest-${commonName.toLowerCase().replace(/\s+/g, '-')}-1`,
              name: `${capital} Historic Center`,
              country: commonName,
              city: capital,
              region: subregion,
              category: 'Cultural',
              description: `Discover the rich architecture, vibrant markets, and timeless heritage of ${capital}, the heart of ${commonName}.`,
              overview: `${capital} offers visitors an authentic window into ${commonName}'s cultural tapestry, cuisine, and national history.`,
              history: `A cornerstone of ${commonName}'s historical journey through centuries of tradition and innovation.`,
              bestTimeToVisit: 'May to October',
              language: languages.join(', '),
              currency: `${currCode} (${currSymbol})`,
              timeZone: 'Local Time',
              rating: 4.85,
              reviewsCount: 820,
              coverImageUrl: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80`,
              images: [
                { id: 'img-dyn-1', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: `${capital} center` }
              ],
              activities: [
                { id: 'act-dyn-1', name: `${capital} Heritage Walking Tour`, description: `Explore renowned landmarks, museums, and local eateries.`, category: 'Cultural', estimatedPrice: 25, rating: 4.8 }
              ],
              coordinates: { latitude: lat, longitude: lng },
              isFavorite: false,
              featured: true,
              createdAt: new Date().toISOString(),
            },
            {
              id: `dest-${commonName.toLowerCase().replace(/\s+/g, '-')}-2`,
              name: `${commonName} National Scenic Park`,
              country: commonName,
              city: 'Nature Reserve',
              region: region,
              category: 'Nature',
              description: `Pristine natural scenery, hiking trails, and magnificent biodiversity in ${commonName}.`,
              overview: `Preserved natural sanctuary offering stunning landscapes, birdwatching, and unforgettable outdoor adventures.`,
              bestTimeToVisit: 'Spring & Summer',
              language: languages.join(', '),
              currency: `${currCode} (${currSymbol})`,
              timeZone: 'Local Time',
              rating: 4.9,
              reviewsCount: 640,
              coverImageUrl: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80`,
              images: [
                { id: 'img-dyn-2', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', isPrimary: true, caption: `Scenic nature in ${commonName}` }
              ],
              activities: [
                { id: 'act-dyn-2', name: 'Guided Wilderness Trek', description: 'Hike through scenic trails with an experienced local guide.', category: 'Adventure', estimatedPrice: 40, rating: 4.9 }
              ],
              coordinates: { latitude: lat + 0.5, longitude: lng + 0.5 },
              isFavorite: false,
              featured: false,
              createdAt: new Date().toISOString(),
            }
          ];

          return {
            name: commonName,
            officialName,
            code: raw.cca2 || 'XX',
            flag: flagEmoji,
            capital,
            region,
            subregion,
            languages,
            currency: {
              code: currCode,
              name: currName,
              symbol: currSymbol,
            },
            population,
            bestTimeToVisit: 'Spring and Autumn (Recommended for most travelers)',
            weatherOverview: `Mild to seasonal climate with pleasant travel conditions across ${subregion}.`,
            introduction: `${commonName} is a captivating nation in ${region}, known for its distinctive heritage, vibrant ${capital} capital, and breathtaking scenery. Explore historic landmarks, sample authentic cuisine, and discover unforgettable adventures.`,
            heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85',
            galleryImages: [
              'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            ],
            traditionalFood: [
              {
                name: `Traditional ${commonName} Specialties`,
                description: `Fresh seasonal delicacies, heritage recipes, and authentic local street food dishes.`,
                image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
              }
            ],
            culturalHighlights: [
              `Historic city center and cultural monuments in ${capital}.`,
              `Protected national parks and diverse geographical wonders across ${subregion}.`,
              `Welcoming hospitality and time-honored traditional celebrations.`,
            ],
            coordinates: {
              latitude: lat,
              longitude: lng,
            },
            destinations: dynamicDests,
          };
        }
      }
    } catch {
      // Fallback silently
    }

    return null;
  },

  getAllCuratedCountries(): CountryInfo[] {
    return Object.values(CURATED_COUNTRIES);
  },
};
