import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ADMIN_PATHS } from "../enum.ts";

const UserReviewsLazy = lazy(() => import("@/pages/user-reviews/views"));

export const USER_REVIEWS_ROUTE = [
  <Route
    path={ADMIN_PATHS.USER_REVIEWS}
    key={ADMIN_PATHS.USER_REVIEWS}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <UserReviewsLazy />
      </Suspense>
    }
  />,
];
