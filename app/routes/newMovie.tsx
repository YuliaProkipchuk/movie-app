import { createMovie, getMovies } from "~/api/moviesApi";
import type { Route } from "./+types/home";
import { useState } from "react";
import Rating from "~/components/shared/Raiting";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router";
import type { Movie } from "~/types/Movie";
import { validateForm } from "~/utils/validateForm";
import { ValidationErrors, type FormErrors } from "~/types/Errors";
import { MdDelete } from "react-icons/md";
import { getDataForValidation } from "~/utils/getDataForValidation";
import MovieForm from "~/components/MovieForm/MovieForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Movie" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = (await request.json()) as Omit<Movie, "id">;

    const errors = await validateForm(data);
    if (Object.keys(errors).length !== 0) {
      return errors as FormErrors;
    }

    await createMovie(data);

    return redirect("/");
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
export default function NewMoviePage() {
  return <MovieForm movie={null} mode="create" />;
}
