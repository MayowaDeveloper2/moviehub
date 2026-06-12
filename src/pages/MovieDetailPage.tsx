import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { useMovieDetail, useSimilarMovies } from '../hooks/useMovies';
import { getPosterUrl, getBackdropUrl } from '../api/client';
import MovieCard from '../components/movie/MovieCard';
import SkeletonCard from '../components/movie/SkeletonCard';

function formatRuntime(minutes: number | null) {
  if (!minutes) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatMoney(amount: number) {
  if (!amount) return '—';
  return `$${amount.toLocaleString()}`;
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const movieId = Number(id);
  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const { data: similar, isLoading: similarLoading } = useSimilarMovies(movieId);

  if (isLoading) {
    return (
      <div className="px-7 py-7 space-y-6 animate-pulse">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-200" />
          <div className="w-12 h-5 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-8">
          <div className="w-[320px] h-[480px] rounded-2xl bg-gray-200 flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="px-7 py-7">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center justify-center h-48 rounded-xl bg-red-50 text-red-500 text-sm">
          Failed to load movie details.
        </div>
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '—';
  const rating = movie.vote_average.toFixed(1);
  const certification = 'PG-13'; // TMDB requires separate release_dates call; using placeholder

  const director = movie.credits?.crew.find((c) => c.job === 'Director');
  const topCast = movie.credits?.cast.slice(0, 5).map((c) => c.name).join(', ');

  return (
    <div className="px-7 py-7">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-7 font-medium transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main detail */}
      <div className="flex gap-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <div className="w-[280px] h-[420px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No poster
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-1">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{movie.title}</h1>

          {/* Meta line */}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>{year}</span>
            <span>•</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>•</span>
            <span>{certification}</span>
          </div>

          {/* Rating + Favorite */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Star size={20} fill="#FBBF24" stroke="#FBBF24" />
              <span className="text-xl font-bold text-gray-900">{rating}</span>
              <span className="text-sm text-gray-400">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            </div>
            <button
              onClick={() => setIsFav(!isFav)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isFav
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-primary text-white hover:bg-blue-700'
              }`}
            >
              <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
              {isFav ? 'Saved' : 'Add to Favorites'}
            </button>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{movie.overview || '—'}</p>
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata grid */}
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
            {[
              { label: 'Release Date', value: movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
              { label: 'Director', value: director?.name ?? '—' },
              { label: 'Cast', value: topCast || '—' },
              { label: 'Language', value: movie.spoken_languages?.[0]?.english_name ?? '—' },
              { label: 'Budget', value: formatMoney(movie.budget) },
              { label: 'Revenue', value: formatMoney(movie.revenue) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-sm text-gray-500 w-28 flex-shrink-0">{label}</span>
                <span className="text-sm text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-12">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Similar Movies</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {similarLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} size="lg" />)
            : similar?.results.slice(0, 8).map((m) => (
                <MovieCard key={m.id} movie={m} size="lg" />
              ))}
          {!similarLoading && (!similar?.results.length) && (
            <p className="text-sm text-gray-400 py-6">No similar movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
