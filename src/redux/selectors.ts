import { RootState } from "./rootStore";

const movieSelector = (state: RootState) => state.modal.film;
const allMoviesSelector = (state: RootState) => state.films.films;
const sortingTypeSelector = (state: RootState) => state.films.sortingType;
const genreSelector = (state: RootState) => state.films.genre;
const openedFilmSelector = (state: RootState) =>
  state.filmDescription.openedFilm;
const isOpenSelector = (state: RootState) => state.modal.isOpen;
const modalTypeSelector = (state: RootState) => state.modal.modal;

export {
  movieSelector,
  allMoviesSelector,
  sortingTypeSelector,
  openedFilmSelector,
  isOpenSelector,
  modalTypeSelector,
  genreSelector,
};
