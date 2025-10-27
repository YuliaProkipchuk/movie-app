import React from "react";
import { Link } from "react-router";
import type { Movie } from "~/types/Movie";
import { MdFavorite, MdFavoriteBorder, MdStar } from "react-icons/md";

type MovieCardProps = {
  movie: Movie;
};
export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="w-[200px] h-auto flex flex-col justify-between">
      <div className="w-full rounded relative">
        <img
          className="w-full h-[250px] object-cover rounded-xl"
          src={movie.image}
          alt={movie.title}
        />
        <div className="cursor-pointer absolute top-1 right-1 text-2xl hover:scale-[1.1] p-1 rounded-full bg-black/75">
          {movie.isFavorite ? (
            <MdFavorite className="align-middle" />
          ) : (
            <MdFavoriteBorder className="align-middle" />
          )}
        </div>
      </div>
      <div className="py-2 px-1">
        <Link to={"/"} className="text-lg">
          {movie.title}
        </Link>
        <div className="flex items-center justify-between">
          <time dateTime={movie.release_date} className="text-sm text-gray-400">
            {movie.release_date}
          </time>
          <div className="flex items-center gap-1">
            <MdStar /> <span>{movie.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
