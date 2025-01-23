import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import {
  deleteMovie,
  addMovie,
  editMovie,
  addMovieGenre,
  deleteMovieGenre,
  deleteMovieActor,
  addMovieActor,
} from "@/supabase/movies";

export const useDeleteMovie = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_MOVIE],
    mutationFn: deleteMovie,
  });
};

export const useAddMovie = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_MOVIE],
    mutationFn: addMovie,
  });
};

export const useEditMovie = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_MOVIE],
    mutationFn: editMovie,
  });
};

export const useAddMovieGenre = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_MOVIE_GENRE],
    mutationFn: addMovieGenre,
  });
};
export const useAddMovieActor = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_MOVIE_ACTOR],
    mutationFn: addMovieActor,
  });
};
export const useDeleteMovieGenre = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_MOVIE_GENRE],
    mutationFn: deleteMovieGenre,
  });
};

export const useDeleteMovieActor = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_MOVIE_ACTOR],
    mutationFn: deleteMovieActor,
  });
};
