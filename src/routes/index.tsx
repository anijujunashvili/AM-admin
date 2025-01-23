import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "@/pages/not-found";
import AuthLayout from "@/layouts/auth";
import DashboardLayout from "@/layouts/dashboard";
import { NEWS_ROUTES } from "./admin/news";
import { MOVIES_ROUTES } from "./admin/movies";
import { ACTORS_ROUTES } from "./admin/actors";
import { LOGIN_ROUTE } from "./admin/auth";
import { USER_REVIEWS_ROUTE } from "./admin/user-reviews";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<AuthLayout />}>{LOGIN_ROUTE}</Route>
          <Route element={<DashboardLayout />}>
            {NEWS_ROUTES}
            {MOVIES_ROUTES}
            {ACTORS_ROUTES}
            {USER_REVIEWS_ROUTE}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
