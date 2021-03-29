import { ActionType, createReducer } from "typesafe-actions";
import { FilmDetailState } from "../filmDetails.models";
import * as Actions from "../actions/filmDetails.actions";

export type FilmDetailActions = ActionType<typeof Actions>;

export const initialState: FilmDetailState = {
  openedFilm: null,
};

export const filmFilmDetailsReducer = createReducer<
  FilmDetailState,
  FilmDetailActions
>(initialState)
  .handleType("@filmDetails/OPEN_FILM_DETAILS", (state, action) => {
    return {
      openedFilm: action.payload,
    };
  })
  .handleType("@filmDetails/CLOSE_FILM_DETAILS", (state: FilmDetailState) => ({
    openedFilm: null,
  }));
