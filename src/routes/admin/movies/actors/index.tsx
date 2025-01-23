import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const MoviesActorsLazy = lazy(
  () => import("@/pages/movies/views/movie-actors.tsx"),
);

export const MOVIE_ACTORS_ROUTE = [
  <Route
    path={ADMIN_PATHS.MOVIES_ACTORS}
    key={ADMIN_PATHS.MOVIES_ACTORS}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesActorsLazy />
      </Suspense>
    }
  />,
];
