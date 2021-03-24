import { searchFilm } from "./../actions/searchFilm.action";
import { FilmsListState } from "../filmList.models";
import { fetchSortByGenreList } from "./../actions/sortByGenreList";
import { createReducer } from "typesafe-actions";
import { fetchfilmsList } from "../actions/filmList.actions";
import { Film } from "../../../interfaces";

export const initialState: FilmsListState = {
  films: [],
  errors: "",
  loading: false,
  sortByDate: true,
};

export const filmListReducer = createReducer(initialState)
  .handleAction(
    fetchfilmsList.success,
    (state: FilmsListState, action: { payload: Film[] }) => ({
      ...state,
      loading: false,
      films: action.payload,
    })
  )
  .handleAction(fetchfilmsList.request, (state: FilmsListState) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    fetchfilmsList.failure,
    (state: FilmsListState, action: { payload: string }) => ({
      ...state,
      loading: false,
      errors: action.payload,
    })
  )
  .handleAction(
    fetchSortByGenreList.success,
    (state: FilmsListState, action: { payload: Film[] }) => ({
      ...state,
      loading: false,
      films: action.payload,
    })
  )
  .handleAction(fetchSortByGenreList.request, (state: FilmsListState) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    fetchSortByGenreList.failure,
    (state: FilmsListState, action: { payload: string }) => ({
      ...state,
      loading: false,
      errors: action.payload,
    })
  )
  .handleAction(
    searchFilm.success,
    (state: FilmsListState, action: { payload: Film[] }) => ({
      ...state,
      loading: false,
      films: action.payload,
    })
  )
  .handleAction(searchFilm.request, (state: FilmsListState) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    searchFilm.failure,
    (state: FilmsListState, action: { payload: string }) => ({
      ...state,
      loading: false,
      errors: action.payload,
    })
  )
  .handleAction("@filmList/CHENGE_SORTING", (state: FilmsListState) => ({
    ...state,
    sortByDate: !state.sortByDate,
  }))
  .handleAction("@filmList/CLEAR_FILM_LIST", (state: FilmsListState) => ({
    ...state,
    films: [],
  }));
