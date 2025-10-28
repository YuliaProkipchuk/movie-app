import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/Layout/Layout.tsx", [
    index("routes/home.tsx"),
    route("/favorites", "routes/favorites.tsx"),
    route("/movies/:id", "routes/movies.[id].tsx"),
  ]),
] satisfies RouteConfig;
