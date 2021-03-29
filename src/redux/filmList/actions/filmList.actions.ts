import { createAsyncAction, createCustomAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const fetchfilmsList = createAsyncAction(
  "@filmList/FETCH_REQUEST",
  "@filmList/FETCH_SUCCESS",
  "@filmList/FETCH_ERROR"
)<string, Film[], string | ErrorEvent>();

export const changeSorting = createCustomAction(
  "@filmList/CHANGE_SORTING",
  (sortingType: string) => {
    return { payload: sortingType };
  }
);

export const changeGenre = createCustomAction(
  "@filmList/CHANGE_GENRE",
  (genre: string) => {
    return { payload: genre };
  }
);

export const clearfilmsList = createCustomAction("@filmList/CLEAR_FILM_LIST");
export const reloadFilmList = createCustomAction("@filmList/RELOAD_FILM_LIST");

export const searchFilm = createAsyncAction(
  "@filmList/GET_SEARCHED_FILM_REQUEST",
  "@filmList/GET_SEARCHED_FILM_SUCCESS",
  "@filmList/GET_SEARCHED_FILM_ERROR"
)<string, Film[], string>();
