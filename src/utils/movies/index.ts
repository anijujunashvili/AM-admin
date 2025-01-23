import { Tables } from "@/supabase/supabase.types";
import { infoAboutMovieGenres, infoAboutMovieActors } from "@/types/movies";

export const mapMoviesListForAdmin = (movies: Tables<"movies">[]) => {
  return movies?.map((m) => ({
    name_ka: m.name_ka,
    image: m.image,
    description_ka: m.description_ka,
    release_date: m.release_date,
    oscars: m.oscars,
    id: m.id,
    key: m.id,
  }));
};

export const mapMovieGenresInfo = (array: infoAboutMovieGenres[]) => {
  return array?.map((a) => ({
    id: a.id,
    genre: a.genres.name_ka,
    movie: a.movies.name_ka,
    key: a.id,
  }));
};

export const mapMovieActorsInfo = (array: infoAboutMovieActors[]) => {
  return array?.map((a) => ({
    id: a.id,
    actor: a.actors.name_ka,
    movie: a.movies.name_ka,
    key: a.id,
  }));
};
