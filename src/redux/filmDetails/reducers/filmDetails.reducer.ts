import { fetchFilm } from "./../actions/filmDetails.actions";
import { ActionType, createReducer } from "typesafe-actions";
import { FilmDetailState } from "../filmDetails.models";
import * as Actions from "../actions/filmDetails.actions";

export type FilmDetailActions = ActionType<typeof Actions>;

export const initialState: FilmDetailState = {
  openedFilm: null,
  loading: true,
};

export const filmFilmDetailsReducer = createReducer<
  FilmDetailState,
  FilmDetailActions
>(initialState)
  .handleAction(fetchFilm.success, (state, action) => {
    return {
      openedFilm: action.payload,
      loading: false,
    };
  })
  .handleAction(fetchFilm.request, (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction(fetchFilm.failure, (state, action) => ({
    ...state,
    loading: false,
  }));
