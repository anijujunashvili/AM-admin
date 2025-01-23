import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const CreateActorLazy = lazy(
  () => import("@/pages/actors/components/create.tsx"),
);

export const CREATE_ACTOR_ROUTE = [
  <Route
    path={ADMIN_PATHS.ACTORS_CREATE}
    key={ADMIN_PATHS.ACTORS_CREATE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <CreateActorLazy />
      </Suspense>
    }
  />,
];
