export type MovieInput = {
  title: string;
  image: string;
  rating?: number;
  release_date: string;
  description?: string;
  director?: string;
  actors?: string[];
  genre?: string | string[];
};
