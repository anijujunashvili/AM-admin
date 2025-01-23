import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const MoviesGenresLazy = lazy(
  () => import("@/pages/movies/views/movie-genres.tsx"),
);

export const MOVIE_GENRES_ROUTE = [
  <Route
    path={ADMIN_PATHS.MOVIES_GENRES}
    key={ADMIN_PATHS.MOVIES_GENRES}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesGenresLazy />
      </Suspense>
    }
  />,
];
