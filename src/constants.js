import { dateFormatter } from "./helpers";

const URL = "http://localhost:4000/movies";
const FILM_LIMIT = 9;

const FormType = {
  EDIT: "edit",
  DELETE: "delete",
  ADD: "add",
};

const DefaultFilters = {
  defaultSort: "release_date",
  defaultGenre: "All",
};

const Genres = [
  { value: "Fantasy", label: "Fantasy" },
  { value: "Adventure", label: "Adventure" },
  { value: "Romance", label: "Romance" },
];

const FormFields = {
  title: "title",
  release_date: "release_date",
  genres: "genres",
  poster_path: "poster_path",
  overview: "overview",
  runtime: "runtime",
  vote_average: "vote_average",
  tagline: "tagline",
  vote_count: "vote_count",
  budget: "budget",
  revenue: "revenue",
};
const FormFieldsName = {
  title: "Title",
  release_date: "Release date",
  genres: "Genres",
  poster_path: "MOVIE URL",
  overview: "Overview",
  runtime: "Runtime",
  vote_average: "Vote average",
  tagline: "Tagline",
  vote_count: "Vote count",
  budget: "Budget",
  revenue: "Revenue",
};

const newMovie = {
  title: " ",
  tagline: "tag",
  release_date: dateFormatter(new Date()),
  genres: [],
  poster_path: "https://",
  overview: "",
  runtime: 0,
  vote_average: 0,
  vote_count: 0,
  budget: 0,
  revenue: 0,
};

const messageObject = {
  EDIT: "edited",
  DELETE: "deleted",
  ADD: "added",
};

export {
  newMovie,
  FormType,
  DefaultFilters,
  Genres,
  FormFields,
  URL,
  FILM_LIMIT,
  FormFieldsName,
  messageObject,
};
