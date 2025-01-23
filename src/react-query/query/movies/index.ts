import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import {
  getMoviesList,
  getMovieInfo,
  getMovieGenres,
  getMovieGenresWithInfo,
  getMovieActorsInfo,
  getMovieActors,
} from "@/supabase/movies";
import {
  mapMoviesListForAdmin,
  mapMovieGenresInfo,
  mapMovieActorsInfo,
} from "@/utils/movies";

export const useGetMoviesList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIES],
    queryFn: getMoviesList,
    select: mapMoviesListForAdmin,
  });
};

export const useGetMovieInfo = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_INFO, id],
    queryFn: () => getMovieInfo(id),
  });
};

export const useGetMovieGenres = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_GENRES, id],
    queryFn: () => getMovieGenres(id),
  });
};

export const useGetMovieActors = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_ACTORS, id],
    queryFn: () => getMovieActors(id),
  });
};

export const useGetMovieGenresWithInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_GENRES],
    queryFn: getMovieGenresWithInfo,
    select: mapMovieGenresInfo,
  });
};

export const useGetMovieActorsInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MOVIE_ACTORS],
    queryFn: getMovieActorsInfo,
    select: mapMovieActorsInfo,
  });
};
