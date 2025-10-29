import { ValidationErrors, type FormErrors } from "~/types/Errors";
import type { Movie } from "~/types/Movie";

export async function validateForm(data: Partial<Movie>) {
  const { title, image, description } = data;
  const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;

  const maxTitleLen = 100;
  const maxDescritionLen = 2000;
  const errors: FormErrors = {};

  if (!title || !title.trim()) {
    errors.title = ValidationErrors.EmptyTitle;
  } else if (title.length > maxTitleLen) {
    errors.title = ValidationErrors.TitleLength;
  }

  if (description && description.length > maxDescritionLen) {
    errors.description = ValidationErrors.DescriptionLength;
  }

  if (!image || !imageUrlRegex.test(image)) {
    errors.image = ValidationErrors.Image;
  }

  return errors;
}
