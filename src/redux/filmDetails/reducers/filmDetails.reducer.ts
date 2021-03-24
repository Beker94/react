import { createReducer } from "typesafe-actions";
import { Film } from "../../../interfaces";
import { FilmDetailState } from "../filmDetails.models";

export const initialState: FilmDetailState = {
  openedFilm: null,
};

export const filmFilmDetailsReducer = createReducer(initialState)
  .handleAction(
    "@filmDetails/OPEN_FILM_DETAILS",
    (state: FilmDetailState, action: { payload: Film }) => {
      return {
        openedFilm: action.payload,
      };
    }
  )
  .handleAction(
    "@filmDetails/CLOSE_FILM_DETAILS",
    (state: FilmDetailState) => ({
      openedFilm: null,
    })
  );
