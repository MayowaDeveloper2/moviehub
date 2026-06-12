import MovieRow from '../components/movie/MovieRow';
import { useNowPlaying, usePopularMovies, useTopRatedMovies } from '../hooks/useMovies';

export default function HomePage() {
  const nowPlaying = useNowPlaying();
  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();

  return (
    <div className="px-7 py-7 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Movies</h1>
        <p className="text-sm text-gray-500 mt-1">Find and explore your next favorite movie.</p>
      </div>

      <MovieRow
        title="Now Playing"
        movies={nowPlaying.data?.results}
        isLoading={nowPlaying.isLoading}
        isError={nowPlaying.isError}
        viewAllPath="/search?category=now_playing"
        count={5}
      />

      <MovieRow
        title="Popular Movies"
        movies={popular.data?.results}
        isLoading={popular.isLoading}
        isError={popular.isError}
        viewAllPath="/popular"
        count={6}
      />

      <MovieRow
        title="Top Rated"
        movies={topRated.data?.results}
        isLoading={topRated.isLoading}
        isError={topRated.isError}
        viewAllPath="/top-rated"
        count={6}
      />
    </div>
  );
}
