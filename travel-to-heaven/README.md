# 🌍 Travel to Heaven

**Travel to Heaven** is a real-world, full-featured global travel discovery, travel blogging, trip planning, budgeting, review, photo-sharing, mapping, and traveler community frontend platform built with React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, and React Hook Form + Zod.

Designed from the ground up to integrate seamlessly with a Spring Boot REST API backend.

---

## 🚀 Key Platform Features

- **Destination Discovery**: Global search, filtering, detailed overviews, history, travel tips, & interactive maps.
- **Travel Stories**: Rich travel story publishing, drafts, reading time, tagging, comments, & bookmarks.
- **Photo Hub**: Responsive gallery, photo detail modal, tag destinations, & likes.
- **Trip & Itinerary Planner**: Day-by-day itinerary builder, activity reordering, location maps.
- **Travel Budget Tracker**: Budget categories, currency support, estimated vs. actual expenses with breakdown summaries.
- **Traveler Community**: Connect with travelers, follow/unfollow, activity feeds, reviews, and profiles.
- **Interactive Mapping**: Destination markers, trip routes, coordinates, and interactive views.
- **Admin Dashboard**: Comprehensive moderation interface for managing users, destinations, stories, reviews, and reports.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Routing**: React Router v7
- **Server State & API**: TanStack Query v5, Axios
- **Form Management**: React Hook Form, Zod

---

## 📁 Architecture Overview

```text
src/
├── app/          # Core setup (App, router, providers)
├── components/   # Modular, reusable UI components (common, layout, features)
├── context/      # React contexts (Auth, Theme)
├── features/     # Feature-specific components and business domain logic
├── hooks/        # Reusable custom React hooks
├── layouts/      # App layouts (MainLayout, AuthLayout, AdminLayout)
├── lib/          # API Clients (Axios, TanStack Query, helpers)
├── pages/        # Main application route views
├── services/     # API service layer (Spring Boot REST integration)
├── styles/       # Design system tokens and custom CSS animations
├── types/        # TypeScript interfaces & API types
└── validations/  # Zod schema definitions
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_MAP_API_KEY=
```

---

## 🔒 License & Credits

Official Project Name: **Travel to Heaven**  
Built with ❤️ for global travelers.
