# MovieHub — Frontend Engineer Assessment

**Built by: Mayowa Akintoye**

A modern movie discovery dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

MovieHub is a responsive movie discovery application powered by The Movie Database (TMDB) API. The goal of this project was to create a fast, user-friendly experience for browsing, searching, and exploring movie information while demonstrating modern React development practices, clean architecture, and maintainable code organization.

## Tech Stack

* **React 18** + **TypeScript**
* **Vite** — build tool
* **Tailwind CSS** — styling
* **TanStack Query** — async state management & API caching
* **React Router v6** — client-side routing
* **Axios** — HTTP client
* **Lucide React** — icons

## Features

### Home Page

* Now Playing movies
* Popular movies
* Top Rated movies
* Horizontal scrolling movie sections

### Search & Filters

* Debounced search input
* Genre filtering
* Year filtering
* Rating filtering
* Sort options
* Clear all filters functionality

### Movie Detail Page

* Movie poster
* Overview and description
* Genres and metadata
* Cast information
* Similar movie recommendations

### Additional Pages

* Popular movies
* Top Rated movies
* Upcoming movies
* Pagination support

### User Experience

* Loading skeletons across all async views
* Error states
* Empty states
* Responsive layout
* Reusable UI components

## My Approach

For this assessment, I focused on building a scalable and maintainable React application while ensuring a smooth user experience.

Key implementation decisions include:

* Using **TanStack Query** to manage server state, reduce unnecessary requests, and improve performance through caching.
* Implementing **debounced search** to minimize API calls while users type.
* Creating reusable movie components to maintain consistency and reduce duplication.
* Separating concerns through dedicated hooks, API services, pages, and components.
* Providing loading skeletons, empty states, and error handling to improve usability during asynchronous operations.
* Structuring the project for future scalability and easier maintenance.

## Technical Highlights

* Strong TypeScript typing throughout the application.
* Reusable custom hooks for data fetching and utility functions.
* Centralized API layer for cleaner data access.
* Query caching and request optimization using TanStack Query.
* Modular component architecture.
* Responsive UI built with Tailwind CSS.
* Route-based page separation using React Router.

## Challenges & Solutions

### Managing API State

Fetching and synchronizing movie data across multiple pages required careful state management. This was addressed using TanStack Query, which simplified caching, loading states, refetching, and error handling.

### Search Performance

Without optimization, search requests could be triggered on every keystroke. A custom debounce hook was implemented to reduce unnecessary API calls and improve responsiveness.

### Component Reusability

Several pages shared similar UI patterns. Reusable movie cards, rows, skeleton loaders, and layout components were created to reduce duplication and improve maintainability.

## Future Improvements

Given additional development time, I would consider:

* Unit testing with Vitest and React Testing Library
* End-to-end testing
* Infinite scrolling for movie listings
* Dark mode support
* Accessibility enhancements (ARIA improvements and keyboard navigation)
* Enhanced image optimization and lazy loading
* User favorites and watchlist functionality
* Improved filter persistence using URL query parameters

## Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd moviehub
npm install
```

### 2. Add Your TMDB API Key

Create a `.env` file at the project root:

```bash
cp .env
```

Update the environment variable:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

You can obtain a free API key from:

https://www.themoviedb.org/settings/api

### 3. Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Live Demo

https://moviehub-nine-chi.vercel.app/

## Project Structure

```text
src/
├── api/
│   ├── client.ts
│   └── movies.ts
│
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   │
│   └── movie/
│       ├── MovieCard.tsx
│       ├── MovieRow.tsx
│       └── SkeletonCard.tsx
│
├── hooks/
│   ├── useMovies.ts
│   └── useDebounce.ts
│
├── pages/
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── MovieDetailPage.tsx
│   ├── PopularPage.tsx
│   ├── TopRatedPage.tsx
│   └── UpcomingPage.tsx
│
└── types/
    └── tmdb.ts
```

## Design Principles

The project was built with the following priorities:

* Maintainability
* Scalability
* Reusability
* Performance
* Type Safety
* User Experience

## Author

**Mayowa Akintoye**

Frontend Engineer Assessment Submission
