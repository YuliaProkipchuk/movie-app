import { getMovies } from "~/api/moviesApi";
import type { Route } from "./+types/home";
import { MoviesLayout } from "~/components/MoviesLayout/MoviesLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie App" },
    {
      name: "description",
      content:
        "A user-friendly app for adding, viewing, editing, and deleting movies from the catalog.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 0;
  const search = url.searchParams.get("q") || "";

  return await getMovies(page, search);
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const { movies, next } = loaderData;

  return (
    <>
      <MoviesLayout movies={movies} next={next} title="All movies" />
    </>
  );
}
