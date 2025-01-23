import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const CreateMovieLazy = lazy(
  () => import("@/pages/movies/components/create.tsx"),
);

export const CREATE_MOVIE_ROUTE = [
  <Route
    path={ADMIN_PATHS.MOVIES_CREATE}
    key={ADMIN_PATHS.MOVIES_CREATE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <CreateMovieLazy />
      </Suspense>
    }
  />,
];
