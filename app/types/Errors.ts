export enum ValidationErrors {
  EmptyTitle = "The title is required",
  TitleLength = "The title can be max of 100 characters",
  DescriptionLength = "The description can be max of 2000 characters",
  Image = "The image url is invalid",
  Actor = "The actor is required",
  Genre = "The genre is required",
}

export type FormErrors = {
  [key: string]: ValidationErrors;
};
