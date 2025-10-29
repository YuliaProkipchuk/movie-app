import { deleteMovie, editMovie, getMovieById } from "~/api/moviesApi";
import type { Route } from "./+types/$id";
import type { Movie } from "~/types/Movie";
import {
  MdDelete,
  MdFavorite,
  MdFavoriteBorder,
  MdModeEdit,
  MdStar,
} from "react-icons/md";
import { useToggleFavorite } from "~/hooks/useToggleFavorite";
import { useState } from "react";
import Rating from "~/components/shared/Raiting";
import { useRating } from "~/hooks/useRating";
import { Link, useNavigate } from "react-router";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  return (await getMovieById(params.id)) as Movie;
}
export default function MoviePage({ loaderData: movie }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { rating, rateMovie } = useRating(Math.round(movie.rating));
  const { isFavorite, handleToggle } = useToggleFavorite(
    movie.id as string,
    movie.isFavorite
  );
  const displayGenres = movie.genre.join(", ");
  const displayActors = movie.actors.join(", ");

  async function handleRate(newRating: number) {
    await rateMovie(movie.id as string, newRating);
  }
  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteMovie(movie.id as string);
      navigate('/')
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="max-w-[1200px] m-auto">
      <article className="flex flex-col md:flex-row items-center md:items-start md:gap-7 xl:gap-10">
        <div className="w-[250px] md:flex-1 rounded relative">
          <img
            className="w-full h-[350px] md:h-auto object-cover rounded-xl"
            src={movie.image}
            alt={movie.title}
          />
          <div
            className="cursor-pointer absolute top-1 right-1 text-2xl hover:scale-[1.1] p-1 rounded-full bg-black/75"
            onClick={handleToggle}
          >
            {isFavorite ? (
              <MdFavorite className="align-middle" />
            ) : (
              <MdFavoriteBorder className="align-middle" />
            )}
          </div>
        </div>
        <div className="w-full md:flex-2">
          <div className="flex m-auto md:mx-0 w-fit">
            <h1 className="py-2 text-3xl font-bold text-center md:text-left mr-3 w-fit">
              {movie.title}
            </h1>
            <div className="flex items-center gap-1">
              <MdStar /> <span>{rating}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center mb-5 md:text-left">
            {displayGenres}
          </p>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">About</h2>
            <p>{movie.description ? movie.description : "-"}</p>
            <div className="rounded bg-gray-800 p-2">
              <ul className="list-none space-y-4">
                <li className="flex">
                  <span className="mr-2 font-semibold block w-[105px]">
                    Release date:{" "}
                  </span>
                  <span>{movie.release_date}</span>
                </li>
                <li className="flex">
                  <span className="mr-2 font-semibold block w-[130px]">
                    Actors:{" "}
                  </span>
                  <span>{displayActors}</span>
                </li>
                <li className="flex">
                  <span className="mr-2 font-semibold block w-[105px]">
                    Director:{" "}
                  </span>
                  <span>{movie.director}</span>
                </li>
              </ul>
            </div>
            <Rating rating={rating} rate={handleRate} />
            <div className="flex gap-2">
              <Link
                to={`/movies/${movie.id}/edit`}
                className="flex-1 rounded-full border py-1 flex justify-center items-center gap-3 hover:text-black hover:bg-white cursor-pointer transition-colors"
              >
                Edit
                <MdModeEdit />
              </Link>
              <button
                disabled={isDeleting}
                className="flex-1 rounded-full py-1 flex justify-center items-center gap-3 bg-red-400 disabled:bg-red-300 hover:text-black hover:bg-white cursor-pointer transition-colors"
                onClick={handleDelete}
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    Delete
                    <MdDelete />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
