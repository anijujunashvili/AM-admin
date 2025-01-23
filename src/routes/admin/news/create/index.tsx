import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const CreateNewsLazy = lazy(() => import("@/pages/news/components/create.tsx"));

export const CREATE_NEWS_ROUTE = [
  <Route
    path={ADMIN_PATHS.NEWS_CREATE}
    key={ADMIN_PATHS.NEWS_CREATE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <CreateNewsLazy />
      </Suspense>
    }
  />,
];
