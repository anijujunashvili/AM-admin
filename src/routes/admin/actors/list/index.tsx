import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const ActorsListLazy = lazy(() => import("@/pages/actors/components/list.tsx"));

export const ACTORS_LIST_ROUTE = [
  <Route
    path={ADMIN_PATHS.ACTORS_LIST}
    key={ADMIN_PATHS.ACTORS_LIST}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <ActorsListLazy />
      </Suspense>
    }
  />,
];
