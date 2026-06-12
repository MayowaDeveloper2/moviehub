import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getPosterUrl } from '../../api/client';
import type { Movie } from '../../types/tmdb';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
}

export default function MovieCard({ movie, size = 'md' }: MovieCardProps) {
  const navigate = useNavigate();
  const posterUrl = getPosterUrl(movie.poster_path, size === 'lg' ? 'w500' : 'w342');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '—';
  const rating = movie.vote_average.toFixed(1);

  const sizeClasses = {
    sm: 'w-[130px]',
    md: 'w-[155px]',
    lg: 'w-[175px]',
  };

  const imgHeights = {
    sm: 'h-[195px]',
    md: 'h-[225px]',
    lg: 'h-[260px]',
  };

  return (
    <button
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`${sizeClasses[size]} flex-shrink-0 text-left group cursor-pointer`}
    >
      <div className={`relative ${imgHeights[size]} rounded-xl overflow-hidden bg-gray-100`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-1.5 py-0.5 rounded-md">
          <Star size={10} fill="#FCD34D" stroke="#FCD34D" />
          {rating}
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-sm font-medium text-gray-900 truncate leading-tight">{movie.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{year}</p>
      </div>
    </button>
  );
}
