import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const NewsUpdateLazy = lazy(() => import("@/pages/news/views/update.tsx"));

export const UPDATE_NEWS_ROUTE = [
  <Route
    path={ADMIN_PATHS.NEWS_UPDATE + "/:id"}
    key={ADMIN_PATHS.NEWS_UPDATE + "/:id"}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <NewsUpdateLazy />
      </Suspense>
    }
  />,
];
