import { dateFormatter } from "./helpers";

const FormType = {
  EDIT: "edit",
  DELETE: "delete",
  ADD: "add",
};

const DefaultFilters = {
  defaultSort: "date",
  defaultGenre: "All",
};

const Genres = [
  { value: "Documentary", label: "Documentary" },
  { value: "Comedy", label: "Comedy" },
  { value: "Horror", label: "Horror" },
  { value: "Crime", label: "Crime" },
];

const Formfields = {
  title: "title",
  releaseDate: "releaseDate",
  genre: "genre",
  movieURL: "movieURL",
  overviev: "overviev",
  runtime: "runtime",
  rating: "rating",
};

const newMovie = {
  title: " ",
  releaseDate: dateFormatter(),
  id: `${Math.floor(Math.random() * 10000)}`,
  genre: [],
  movieURL: "",
  overviev: "",
  runtime: "",
  rating: "",
};

export { newMovie, FormType, DefaultFilters, Genres, Formfields };
