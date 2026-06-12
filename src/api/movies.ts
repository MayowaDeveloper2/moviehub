import tmdbClient from './client';
import type { Movie, MovieDetail, PaginatedResponse, Genre } from '../types/tmdb';

export const movieApi = {
  getNowPlaying: (page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>('/movie/now_playing', { params: { page } }),

  getPopular: (page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>('/movie/popular', { params: { page } }),

  getTopRated: (page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>('/movie/top_rated', { params: { page } }),

  getUpcoming: (page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>('/movie/upcoming', { params: { page } }),

  getMovieDetail: (id: number) =>
    tmdbClient.get<MovieDetail>(`/movie/${id}`, {
      params: { append_to_response: 'credits' },
    }),

  getSimilar: (id: number, page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${id}/similar`, { params: { page } }),

  searchMovies: (query: string, page = 1) =>
    tmdbClient.get<PaginatedResponse<Movie>>('/search/movie', { params: { query, page } }),

  discoverMovies: (params: {
    with_genres?: string;
    primary_release_year?: string;
    'vote_average.gte'?: string;
    sort_by?: string;
    page?: number;
  }) => tmdbClient.get<PaginatedResponse<Movie>>('/discover/movie', { params }),

  getGenres: () =>
    tmdbClient.get<{ genres: Genre[] }>('/genre/movie/list'),
};
