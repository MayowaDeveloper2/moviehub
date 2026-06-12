import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchMovies, useGenres } from '../hooks/useMovies';
import MovieCard from '../components/movie/MovieCard';
import SkeletonCard from '../components/movie/SkeletonCard';
import type { SearchFilters } from '../types/tmdb';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'revenue.desc', label: 'Revenue' },
];

const RATING_OPTIONS = [
  { value: '', label: 'All Ratings' },
  { value: '9', label: '9+ ★' },
  { value: '8', label: '8+ ★' },
  { value: '7', label: '7+ ★' },
  { value: '6', label: '6+ ★' },
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = [
  { value: '', label: 'All Years' },
  ...Array.from({ length: 30 }, (_, i) => {
    const y = currentYear - i;
    return { value: String(y), label: String(y) };
  }),
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const debouncedQuery = useDebounce(inputValue, 400);
  const { data: genres } = useGenres();

  const filters: SearchFilters = {
    query: debouncedQuery || undefined,
    genre: genre || undefined,
    year: year || undefined,
    rating: rating || undefined,
    sortBy: sortBy || undefined,
  };

  const hasFilters = !!debouncedQuery || !!genre || !!year || !!rating;
  const { data, isLoading, isError } = useSearchMovies(filters, hasFilters || true);

  const clearFilters = () => {
    setInputValue('');
    setGenre('');
    setYear('');
    setRating('');
    setSortBy('popularity.desc');
    navigate('/search');
  };

  const hasActiveFilters = !!inputValue || !!genre || !!year || !!rating;
  const movies = data?.results ?? [];
  const total = data?.total_results ?? 0;

  return (
    <div className="px-7 py-7">
      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-[500px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            autoFocus
          />
          {inputValue && (
            <button
              onClick={() => setInputValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Results header */}
      {inputValue && (
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Search Results for &ldquo;{inputValue}&rdquo;
        </h2>
      )}

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Genre */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[11px] text-gray-500 font-medium ml-1">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[130px]"
            >
              <option value="">All Genres</option>
              {genres?.map((g) => (
                <option key={g.id} value={String(g.id)}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[11px] text-gray-500 font-medium ml-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]"
            >
              {YEAR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[11px] text-gray-500 font-medium ml-1">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]"
            >
              {RATING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[11px] text-gray-500 font-medium ml-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[130px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end gap-3 pb-0.5">
          {!isLoading && total > 0 && (
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {total.toLocaleString()} results found
            </span>
          )}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary font-medium hover:underline whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {isError ? (
        <div className="flex items-center justify-center h-48 rounded-xl bg-red-50 text-red-500 text-sm">
          Something went wrong. Please try again.
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Search size={40} strokeWidth={1.5} className="mb-3" />
          <p className="text-base font-medium">No movies found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
