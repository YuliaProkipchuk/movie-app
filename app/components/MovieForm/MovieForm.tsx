import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Form, useActionData, useNavigation, useSubmit } from "react-router";
import { ValidationErrors, type FormErrors } from "~/types/Errors";
import type { Movie } from "~/types/Movie";
import { validateForm } from "~/utils/validateForm";
import Rating from "../shared/Raiting";
import { getDataForValidation } from "~/utils/getDataForValidation";
type FormProps = {
  movie: Movie | null;
  mode: "edit" | "create";
};
function MovieForm({ movie, mode }: FormProps) {
  const defaultData = movie || {
    title: "",
    image: "",
    description: "",
    actors: [],
    genre: [],
    director: "",
    rating: 0,
    release_date: new Date().toISOString().split("T")[0],
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionErrors = useActionData<FormErrors>();
  const [clientErrors, setErrors] = useState<FormErrors>({});
  const [actors, setActors] = useState<string[]>(defaultData.actors);
  const [genres, setGenres] = useState<string[]>(defaultData.genre);
  const [rating, setRating] = useState(defaultData.rating);
  const [inputs, setInputs] = useState({
    actor: "",
    genre: "",
  });
  const submit = useSubmit();

  const errors = { ...actionErrors, ...clientErrors };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const id = movie ? movie.id : "";
    const data = getDataForValidation(
      formData,
      mode,
      actors,
      genres,
      rating,
      id
    );
    const errors = await validateForm(data);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    submit(data, { method: "post", encType: "application/json" });
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function addActor() {
    if (inputs.actor && inputs.actor.trim()) {
      setActors((prev) => [inputs.actor, ...prev]);
      setInputs((prev) => ({
        ...prev,
        actor: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        actor: ValidationErrors.Actor,
      }));
    }
  }
  function addGenre() {
    if (inputs.genre && inputs.genre.trim()) {
      setGenres((prev) => [inputs.genre, ...prev]);
      setInputs((prev) => ({
        ...prev,
        genre: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        genre: ValidationErrors.Genre,
      }));
    }
  }
  function deleteActor(name: string) {
    const data = actors.filter((actor) => actor !== name);
    setActors(data);
  }
  function deleteGenre(name: string) {
    const data = genres.filter((genre) => genre !== name);
    setGenres(data);
  }
  return (
    <>
      <section className="max-w-[1200px] m-auto">
        <Form
          method="post"
          className="space-y-5 rounded py-5 px-3 bg-gray-800 w-full sm:w-[80%] md:w-1/2
             m-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={defaultData.title}
              className="rounded border px-2 py-1"
              required
            />
            {errors.title && (
              <p className="text-[12px] text-red-400">{errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image">Image *</label>
            <input
              type="url"
              name="image"
              id="image"
              className="rounded border px-2 py-1"
              defaultValue={defaultData.image}
              required
            />
            {errors.image && (
              <p className="text-[12px] text-red-400">{errors.image}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="release_date">Release Date</label>
            <input
              type="date"
              name="release_date"
              id="release_date"
              defaultValue={defaultData.release_date}
              className="rounded border px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="director">Director</label>
            <input
              type="text"
              name="director"
              id="director"
              defaultValue={defaultData.director}
              className="rounded border px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              defaultValue={defaultData.description}
              className="rounded border px-2 py-1"
            />
            {errors.description && (
              <p className="text-[12px] text-red-400">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="actor">Actors</label>
            {errors.actor && (
              <p className="text-[12px] text-red-400 order-3">{errors.actor}</p>
            )}
            <div>
              <input
                type="text"
                name="actor"
                id="actor"
                value={inputs.actor}
                onChange={handleChange}
                className="rounded border px-2 py-1 w-[80%] mr-2 mb-2"
              />
              <button
                type="button"
                className="px-3 py-1 rounded bg-white text-black cursor-pointer"
                onClick={addActor}
              >
                Add
              </button>
            </div>
            <ul>
              {actors.map((actor, i) => (
                <li key={`${actor}-${i}`}>
                  <span className="inline-block mr-3 min-w-[120px]">
                    {actor}
                  </span>{" "}
                  <button
                    className="align-middle cursor-pointer hover:text-red-400"
                    onClick={() => deleteActor(actor)}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="genre">Genres</label>
            {errors.genre && (
              <p className="text-[12px] text-red-400 order-3">{errors.genre}</p>
            )}
            <div className="w-full">
              <input
                type="text"
                name="genre"
                id="genre"
                value={inputs.genre}
                onChange={handleChange}
                className="rounded border px-2 py-1 w-[80%] mr-2 mb-2"
              />
              <button
                type="button"
                className="px-3 py-1 rounded bg-white text-black cursor-pointer"
                onClick={addGenre}
              >
                Add
              </button>
            </div>
            <ul>
              {genres.map((genre, i) => (
                <li key={`${genre}-${i}`}>
                  <span className="inline-block mr-3 min-w-[120px]">
                    {genre}
                  </span>{" "}
                  <button
                    className="align-middle cursor-pointer hover:text-red-400"
                    onClick={() => deleteGenre(genre)}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Rating
            rating={rating}
            rate={(newRating: number) => setRating(newRating)}
          />
          {errors.general && (
            <p className="text-[12px] text-red-400">{errors.general}</p>
          )}
          <button
            type="submit"
            className="px-5 py-1 rounded bg-white text-black block m-auto cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </section>
    </>
  );
}

export default MovieForm;
