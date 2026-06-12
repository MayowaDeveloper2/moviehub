import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import type { Movie } from '../../types/tmdb';

interface MovieRowProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  isError?: boolean;
  viewAllPath?: string;
  count?: number;
}

export default function MovieRow({
  title,
  movies,
  isLoading,
  isError,
  viewAllPath,
  count = 6,
}: MovieRowProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {viewAllPath && (
          <Link
            to={viewAllPath}
            className="text-sm text-primary font-medium hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      {isError ? (
        <div className="flex items-center justify-center h-[240px] rounded-xl bg-red-50 text-red-500 text-sm">
          Failed to load movies. Please try again.
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {isLoading
            ? Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)
            : movies?.slice(0, count).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      )}
    </section>
  );
}
