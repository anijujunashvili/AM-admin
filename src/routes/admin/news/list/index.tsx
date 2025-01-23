import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../../enum.ts";

const NewsListLazy = lazy(() => import("@/pages/news/components/list.tsx"));

export const NEWS_LIST_ROUTE = [
  <Route
    path={ADMIN_PATHS.NEWS_LIST}
    key={ADMIN_PATHS.NEWS_LIST}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <NewsListLazy />
      </Suspense>
    }
  />,
];
