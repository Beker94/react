import { RootState } from "./rootStore";

const movieSelector = (state: RootState) => state.modal.film;
const allMoviesSelector = (state: RootState) => state.films.films;
const sortingTypeSelector = (state: RootState) => state.films.sortingType;
const genreSelector = (state: RootState) => state.films.genre;
const searchedFilmSelector = (state: RootState) => state.films.searchTitle;
const openedFilmSelector = (state: RootState) =>
  state.filmDescription.openedFilm;
const loadingSelector = (state: RootState) => state.filmDescription.loading;
const isOpenSelector = (state: RootState) => state.modal.isOpen;
const modalTypeSelector = (state: RootState) => state.modal.modal;
const offsetSelector = (state: RootState) => state.films.offset;
const successSubmitSelector = (state: RootState) => state.form.successSubmit;
const errorsSelector = (state: RootState) => state.form.errors;

const optionsSelector = (state: RootState) => {
  return {
    sortingType: state.films.sortingType,
    genre: state.films.genre,
    searchTitle: state.films.searchTitle,
    offset: state.films.offset,
  };
};

export {
  movieSelector,
  allMoviesSelector,
  sortingTypeSelector,
  openedFilmSelector,
  isOpenSelector,
  modalTypeSelector,
  genreSelector,
  searchedFilmSelector,
  offsetSelector,
  loadingSelector,
  successSubmitSelector,
  optionsSelector,
  errorsSelector,
};
