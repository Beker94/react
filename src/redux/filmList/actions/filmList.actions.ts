import { FilmOptions } from "./../filmList.models";
import { createAsyncAction, createCustomAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const fetchfilmsList = createAsyncAction(
  "@filmList/FETCH_REQUEST",
  "@filmList/FETCH_SUCCESS",
  "@filmList/FETCH_ERROR"
)<any, Film[], string | ErrorEvent>();

export const changeSorting = createCustomAction(
  "@filmList/CHANGE_SORTING",
  (data: {
    payloadOptions: FilmOptions;
    shouldReload?: boolean;
    shouldClear?: boolean;
  }) => {
    return { payload: data };
  }
);

export const searchFilm = createCustomAction(
  "@filmList/SEARCH_FILM",
  (data: {
    payloadOptions: FilmOptions;
    shouldReload?: boolean;
    shouldClear?: boolean;
  }) => {
    return { payload: data };
  }
);

export const getMoreFilms = createCustomAction("@filmList/GET_MORE_FILMS");

export const changeGenre = createCustomAction(
  "@filmList/CHANGE_GENRE",
  (data: {
    payloadOptions: FilmOptions;
    shouldReload?: boolean;
    shouldClear?: boolean;
  }) => {
    return { payload: data };
  }
);

export const filmListChanged = createCustomAction(
  "@filmList/FILM_LIST_CHANGED",
  (films: Film[]) => {
    return { payload: films };
  }
);

export const clearfilmsList = createCustomAction("@filmList/CLEAR_FILM_LIST");
export const reloadFilmList = createCustomAction("@filmList/RELOAD_FILM_LIST");
