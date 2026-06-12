import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/movies';
import type { SearchFilters } from '../types/tmdb';

export const queryKeys = {
  nowPlaying: (page: number) => ['movies', 'now-playing', page],
  popular: (page: number) => ['movies', 'popular', page],
  topRated: (page: number) => ['movies', 'top-rated', page],
  upcoming: (page: number) => ['movies', 'upcoming', page],
  detail: (id: number) => ['movie', id],
  similar: (id: number) => ['movie', id, 'similar'],
  search: (filters: SearchFilters) => ['movies', 'search', filters],
  genres: () => ['genres'],
};

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: queryKeys.nowPlaying(page),
    queryFn: () => movieApi.getNowPlaying(page).then((r) => r.data),
  });

export const usePopularMovies = (page = 1) =>
  useQuery({
    queryKey: queryKeys.popular(page),
    queryFn: () => movieApi.getPopular(page).then((r) => r.data),
  });

export const useTopRatedMovies = (page = 1) =>
  useQuery({
    queryKey: queryKeys.topRated(page),
    queryFn: () => movieApi.getTopRated(page).then((r) => r.data),
  });

export const useUpcomingMovies = (page = 1) =>
  useQuery({
    queryKey: queryKeys.upcoming(page),
    queryFn: () => movieApi.getUpcoming(page).then((r) => r.data),
  });

export const useMovieDetail = (id: number) =>
  useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => movieApi.getMovieDetail(id).then((r) => r.data),
    enabled: !!id,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: queryKeys.similar(id),
    queryFn: () => movieApi.getSimilar(id).then((r) => r.data),
    enabled: !!id,
  });

export const useGenres = () =>
  useQuery({
    queryKey: queryKeys.genres(),
    queryFn: () => movieApi.getGenres().then((r) => r.data.genres),
    staleTime: Infinity,
  });

export const useSearchMovies = (filters: SearchFilters, enabled = true) =>
  useQuery({
    queryKey: queryKeys.search(filters),
    queryFn: async () => {
      if (filters.query) {
        const res = await movieApi.searchMovies(filters.query);
        return res.data;
      }
      const params: Record<string, string | number> = {};
      if (filters.genre) params['with_genres'] = filters.genre;
      if (filters.year) params['primary_release_year'] = filters.year;
      if (filters.rating) params['vote_average.gte'] = filters.rating;
      if (filters.sortBy) params['sort_by'] = filters.sortBy;
      const res = await movieApi.discoverMovies(params);
      return res.data;
    },
    enabled,
  });
