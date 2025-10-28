import { getFavorites, getMovies } from "~/api/moviesApi";
import type { Route } from "./+types/favorites";
import { MoviesLayout } from "~/components/MoviesLayout/MoviesLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorites" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 0;
  const search = url.searchParams.get("q") || "";

  return await getFavorites(page, search);
}
export default function Favorites({ loaderData }: Route.ComponentProps) {
  const { movies, next } = loaderData;

  return (
    <>
      <MoviesLayout movies={movies} next={next} title="Favorites" />
    </>
  );
}
