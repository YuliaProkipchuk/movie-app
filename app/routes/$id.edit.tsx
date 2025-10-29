import { deleteMovie, editMovie, getMovieById } from "~/api/moviesApi";
import type { Route } from "./+types/$id.edit";
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
import MovieForm from "~/components/MovieForm/MovieForm";
import { validateForm } from "~/utils/validateForm";
import type { FormErrors } from "~/types/Errors";
import { redirect } from "react-router";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = (await request.json()) as Movie;

    const errors = await validateForm(data);
    if (Object.keys(errors).length !== 0) {
      return errors as FormErrors;
    }

    await editMovie(data.id as string, data);

    return redirect(`/movies/${data.id}`);
  } catch (error) {
    if (error instanceof Error) {
      return {
        general: error.message,
      };
    }
    return {
      general: "Something went wrong",
    };
  }
}
export async function loader({ params }: Route.LoaderArgs) {
  return (await getMovieById(params.id)) as Movie;
}
export default function MoviePage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <MovieForm movie={loaderData} mode="edit" />
    </>
  );
}
