# MovieHub — Frontend Engineer Assessment

A modern movie discovery dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **TanStack Query** — async state & API caching
- **React Router v6** — client-side routing
- **Axios** — HTTP client
- **Lucide React** — icons

## Features

- Home Page — Now Playing, Popular, Top Rated horizontal scroll sections
- Search & Filters — debounced search, genre / year / rating / sort filters with clear-all
- Movie Detail — poster, overview, genres, metadata, cast, similar movies
- Popular / Top Rated / Upcoming — paginated grid views
- Loading skeletons on every async surface
- Error + Empty states throughout

## Setup

### 1. Clone & install

```bash
git clone <your-repo-url>
cd moviehub
npm install
```

### 2. Add your TMDB API key

Create a `.env` file at the project root:

```bash
cp .env.example .env
```

Edit `.env` and replace `your_tmdb_api_key_here` with your TMDB API key.
Get one free at https://www.themoviedb.org/settings/api

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:5173

### 4. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   ├── client.ts          # Axios instance + image URL helpers
│   └── movies.ts          # TMDB API service functions
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   └── movie/
│       ├── MovieCard.tsx
│       ├── MovieRow.tsx
│       └── SkeletonCard.tsx
├── hooks/
│   ├── useMovies.ts       # TanStack Query hooks
│   └── useDebounce.ts
├── pages/
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── MovieDetailPage.tsx
│   ├── PopularPage.tsx
│   ├── TopRatedPage.tsx
│   └── UpcomingPage.tsx
└── types/
    └── tmdb.ts
```
