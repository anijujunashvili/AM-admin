import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const UpdateMovieLazy = lazy(() => import("@/pages/movies/views/update.tsx"));

export const UPDATE_MOVIE_ROUTE = [
  <Route
    path={ADMIN_PATHS.MOVIES_UPDATE + "/:id"}
    key={ADMIN_PATHS.MOVIES_UPDATE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateMovieLazy />
      </Suspense>
    }
  />,
];
