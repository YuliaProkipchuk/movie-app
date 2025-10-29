import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/Layout/Layout.tsx", [
    index("routes/home.tsx"),
    route("/favorites", "routes/favorites.tsx"),
    ...prefix("movies", [
      route("/:id", "routes/$id.tsx"),
      route("/:id/edit", "routes/$id.edit.tsx"),
      route("/new", "routes/newMovie.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
