import { useLoadMore } from "~/hooks/useLoadMore";
import { MoviesList } from "../MoviesList/MoviesList";
import type { Movie } from "~/types/Movie";

type MovieLayoutProps = {
  movies: Movie[];
  next: boolean;
  title: string;
};
export function MoviesLayout({ movies, next, title }: MovieLayoutProps) {
  const { loadMore } = useLoadMore();
  return (
    <>
      <h1>{title}</h1>
      <MoviesList movies={movies} />
      {next && (
        <button
          onClick={loadMore}
          className="my-4 px-3 py-1 rounded border cursor-pointer block m-auto"
        >
          Load more
        </button>
      )}
    </>
  );
}
