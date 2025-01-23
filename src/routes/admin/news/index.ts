import { UPDATE_NEWS_ROUTE } from "./update";
import { NEWS_LIST_ROUTE } from "./list";
import { CREATE_NEWS_ROUTE } from "./create";

export const NEWS_ROUTES = [
  ...UPDATE_NEWS_ROUTE,
  ...NEWS_LIST_ROUTE,
  ...CREATE_NEWS_ROUTE,
];
