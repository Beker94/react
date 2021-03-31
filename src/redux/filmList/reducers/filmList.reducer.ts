import {
  changeSorting,
  changeGenre,
  searchFilm,
  getMoreFilms,
  clearfilmsList,
} from "./../actions/filmList.actions";
import { FilmsListState } from "../filmList.models";

import { ActionType, createReducer } from "typesafe-actions";
import { fetchfilmsList } from "../actions/filmList.actions";

import * as Actions from "../actions/filmList.actions";

export type FilmListActions = ActionType<typeof Actions>;

export const initialState: FilmsListState = {
  films: [],
  error: "",
  loading: false,
  sortingType: "release_date",
  genre: "",
  needReload: false,
  searchTitle: "",
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
    sortingType: action.payload,
  }))
  .handleAction(searchFilm, (state, action) => {
    return {
      ...state,
      searchTitle: action.payload,
    };
  })
  .handleAction(changeGenre, (state, action) => ({
    ...state,
    genre: action.payload,
    loading: true,
  }))
  .handleAction(getMoreFilms, (state, action) => {
    return {
      ...state,
      offset: state.offset + 9,
    };
  })
  .handleAction(clearfilmsList, (state, action) => {
    return {
      ...state,
      films: [],
      offset: 0,
    };
  });
