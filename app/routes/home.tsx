import { getMovies } from "~/api/moviesApi";
import type { Route } from "./+types/home";
import { MoviesList } from "~/components/MoviesList/MoviesList";
import { useSearchParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie App" },
    { name: "description", content: "Welcome to React Router!" },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 0;

  function handleLoadMore() {
    setSearchParams(
      {
        q: searchParams.get("q") || "",
        page: (+currentPage + 1).toString(),
      },
      { preventScrollReset: true }
    );
  }

  return (
    <>
      <h1>h</h1>
      <MoviesList movies={movies} />
      {next && (
        <button
          onClick={handleLoadMore}
          className="my-4 px-3 py-1 rounded border cursor-pointer block m-auto"
        >
          Load more
        </button>
      )}
    </>
  );
}
