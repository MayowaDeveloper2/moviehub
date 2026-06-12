import { useState } from 'react';
import { usePopularMovies } from '../hooks/useMovies';
import MovieCard from '../components/movie/MovieCard';
import SkeletonCard from '../components/movie/SkeletonCard';

export default function PopularPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePopularMovies(page);

  return (
    <div className="px-7 py-7">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Popular Movies</h1>
        <p className="text-sm text-gray-500 mt-1">The most popular movies right now.</p>
      </div>

      {isError ? (
        <div className="flex items-center justify-center h-48 rounded-xl bg-red-50 text-red-500 text-sm">
          Failed to load movies.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {isLoading
            ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
            : data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && data && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {data.total_pages}</span>
          <button
            disabled={page >= data.total_pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
