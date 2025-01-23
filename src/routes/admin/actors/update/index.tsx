import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const UpdateActorLazy = lazy(() => import("@/pages/actors/views/update.tsx"));

export const UPDATE_ACTOR_ROUTE = [
  <Route
    path={ADMIN_PATHS.ACTORS_UPDATE + "/:id"}
    key={ADMIN_PATHS.ACTORS_UPDATE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateActorLazy />
      </Suspense>
    }
  />,
];
