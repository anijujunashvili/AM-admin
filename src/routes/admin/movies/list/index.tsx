import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const MoviesListLazy = lazy(() => import("@/pages/movies/components/list.tsx"));

export const MOVIES_LIST_ROUTE = [
  <Route
    path={ADMIN_PATHS.MOVIES_LIST}
    key={ADMIN_PATHS.MOVIES_LIST}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesListLazy />
      </Suspense>
    }
  />,
];
