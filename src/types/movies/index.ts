export type addMovieType = {
  name_ka: string;
  name_en: string;
  description_ka: string;
  description_en: string;
  trailer: string;
  image: File | null;
  release_date: string;
  nomination: number;
  awards: number;
  oscars: number;
};

export type editMovieType = {
  name_ka: string;
  name_en: string;
  description_ka: string;
  description_en: string;
  trailer: string;
  image: File | null;
  release_date: string;
  nomination: number;
  current_image: string;
  rel_date: string;
  awards: number;
  oscars: number;
  id: number;
};

export type infoAboutMovieGenres = {
  id: number;
  movies: { name_ka: string };
  genres: { name_ka: string };
};

export type infoAboutMovieActors = {
  id: number;
  movies: { name_ka: string };
  actors: { name_ka: string };
};

export type addGenres = {
  m_id: number;
  g_id: number;
};

export type addActors = {
  m_id: number;
  act_id: number;
};
