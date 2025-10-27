import type { Movie } from "~/types/Movie";
import { MovieCard } from "../MovieCard/MovieCard";

type MoviesListProps = {
  movies: Movie[];
};
export function MoviesList({ movies }: MoviesListProps) {
  return (
    <section className="max-w-[1200px] m-auto grid gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
