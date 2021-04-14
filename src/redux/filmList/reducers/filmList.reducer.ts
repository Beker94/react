import {
  changeSorting,
  changeGenre,
  searchFilm,
  getMoreFilms,
  clearfilmsList,
  filmListChanged,
  setMoviesCount,
} from "./../actions/filmList.actions";
import { FilmsListState } from "../filmList.models";

import { ActionType, createReducer } from "typesafe-actions";
import { fetchfilmsList } from "../actions/filmList.actions";

import * as Actions from "../actions/filmList.actions";
import { DefaultFilters, FILM_LIMIT } from "../../../constants";

export type FilmListActions = ActionType<typeof Actions>;

export const initialState: FilmsListState = {
  films: [],
  error: "",
  loading: false,
  sortingType: DefaultFilters.defaultSort,
  genre: DefaultFilters.defaultGenre,
  needReload: false,
  searchTitle: "",
  moviesCount: 0,
  offset: 0,
};

export const filmListReducer = createReducer<FilmsListState, FilmListActions>(
  initialState
)
  .handleAction(fetchfilmsList.success, (state, action) => ({
    ...state,
    loading: false,
    films: [...state.films, ...action.payload],
  }))
  .handleAction(fetchfilmsList.request, (state, action) => ({
    ...state,
    loading: true,
  }))
  .handleAction(fetchfilmsList.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }))
  .handleAction(changeSorting, (state, action) => ({
    ...state,
    offset: 0,
    sortingType: action.payload.payloadOptions.sortingType!,
  }))
  .handleAction(searchFilm, (state, action) => {
    return {
      ...state,
      offset: 0,
      searchTitle: action.payload.payloadOptions.searchTitle!,
    };
  })
  .handleAction(changeGenre, (state, action) => ({
    ...state,
    genre: action.payload.payloadOptions.genre!,
    offset: 0,
    loading: true,
  }))
  .handleAction(getMoreFilms, (state, action) => {
    return {
      ...state,
      offset: state.offset + FILM_LIMIT,
    };
  })
  .handleAction(clearfilmsList, (state, action) => {
    return {
      ...state,
      films: [],
      offset: 0,
    };
  })
  .handleAction(setMoviesCount, (state, action) => {
    return {
      ...state,
      moviesCount: action.payload,
    };
  })
  .handleAction(filmListChanged, (state, action) => {
    return {
      ...state,
      films: [...action.payload],
    };
  });
