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

const newMovie = {
  title: " ",
  releaseDate: new Date(),
  id: `${Math.floor(Math.random() * 10000)}`,
  genre: [],
  movieURL: "",
  overviev: "",
  runtime: "",
};

export { newMovie, FormType, DefaultFilters, Genres };
