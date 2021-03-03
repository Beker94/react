export const CONSTANTS = {
  FORM_TYPE: {
    EDIT: "edit",
    DELETE: "delete",
    ADD: "add",
  },

  DEFAULT_FILTERS: {
    defaultSort: "date",
    defaultGenre: "All",
  },

  GENRES: [
    { value: "Documentary", label: "Documentary" },
    { value: "Comedy", label: "Comedy" },
    { value: "Horror", label: "Horror" },
    { value: "Crime", label: "Crime" },
  ],

  ADD_MOVIE: {
    title: " ",
    releaseDate: new Date(),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [],
    movieURL: "",
    overviev: "",
    runtime: "",
  },
};
