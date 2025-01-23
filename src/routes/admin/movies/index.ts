import { UPDATE_MOVIE_ROUTE } from "./update";
import { MOVIES_LIST_ROUTE } from "./list";
import { CREATE_MOVIE_ROUTE } from "./create";
import { MOVIE_GENRES_ROUTE } from "./genres";
import { MOVIE_ACTORS_ROUTE } from "./actors";

export const MOVIES_ROUTES = [
  ...UPDATE_MOVIE_ROUTE,
  ...MOVIES_LIST_ROUTE,
  ...CREATE_MOVIE_ROUTE,
  ...MOVIE_GENRES_ROUTE,
  ...MOVIE_ACTORS_ROUTE,
];
