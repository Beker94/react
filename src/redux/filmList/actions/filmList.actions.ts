import { FilmOptions } from "./../filmList.models";
import { createAsyncAction, createCustomAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const fetchfilmsList = createAsyncAction(
  "@filmList/FETCH_REQUEST",
  "@filmList/FETCH_SUCCESS",
  "@filmList/FETCH_ERROR"
)<FilmOptions, Film[], string | ErrorEvent>();

export const changeSorting = createCustomAction(
  "@filmList/CHANGE_SORTING",
  (sortingType: string) => {
    return { payload: sortingType };
  }
);

export const searchFilm = createCustomAction(
  "@filmList/SEARCH_FILM",
  (searchTitle: string) => {
    return { payload: searchTitle };
  }
);

export const getMoreFilms = createCustomAction("@filmList/GET_MORE_FILMS");

export const changeGenre = createCustomAction(
  "@filmList/CHANGE_GENRE",
  (genre: string) => {
    return { payload: genre };
  }
);

export const clearfilmsList = createCustomAction("@filmList/CLEAR_FILM_LIST");
export const reloadFilmList = createCustomAction("@filmList/RELOAD_FILM_LIST");
