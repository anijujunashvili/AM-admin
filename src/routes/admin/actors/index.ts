import { UPDATE_ACTOR_ROUTE } from "./update";
import { ACTORS_LIST_ROUTE } from "./list";
import { CREATE_ACTOR_ROUTE } from "./create";

export const ACTORS_ROUTES = [
  ...UPDATE_ACTOR_ROUTE,
  ...ACTORS_LIST_ROUTE,
  ...CREATE_ACTOR_ROUTE,
];
