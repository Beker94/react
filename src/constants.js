import { dateFormatter } from "./helpers";

const URL = "http://localhost:4000/movies";

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
  { value: "Fantasy", label: "Fantasy" },
  { value: "Adventure", label: "Adventure" },
  { value: "Romance", label: "Romance" },
];

const Formfields = {
  title: "title",
  release_date: "release_date",
  genres: "genres",
  poster_path: "poster_path",
  overview: "overview",
  runtime: "runtime",
  rating: "rating",
};

const newMovie = {
  title: " ",
  tagline: "",
  release_date: dateFormatter(),
  id: Math.floor(Math.random() * 10000),
  genres: [],
  poster_path: "",
  overview: "",
  runtime: 0,
  rating: "",
  vote_average: 0,
  vote_count: 0,
  budget: 0,
  revenue: 0,
};

export { newMovie, FormType, DefaultFilters, Genres, Formfields, URL };
