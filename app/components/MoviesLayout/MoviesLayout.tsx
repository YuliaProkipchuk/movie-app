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
    <section className="max-w-[1200px] m-auto space-y-5">
      <h1 className="text-4xl font-bold">{title}</h1>
      <MoviesList movies={movies} />
      {next && (
        <button
          onClick={loadMore}
          className="my-4 px-3 py-1 rounded border cursor-pointer block m-auto"
        >
          Load more
        </button>
      )}
    </section>
  );
}
