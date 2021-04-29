import { HYDRATE } from "next-redux-wrapper";
import { createAsyncAction, createCustomAction } from "typesafe-actions";

import { Film } from "../../../components/interfaces";

export const fetchFilm = createAsyncAction(
  "@filmList/FETCH_FILM_REQUEST",
  "@filmList/FETCH_FILM_SUCCESS",
  "@filmList/FETCH_FILM_ERROR"
)<string, Film, string | ErrorEvent>();

export const clearfilm = createCustomAction("@filmList/CLEAR_FILM");

export const hydrate = createCustomAction(HYDRATE, (data: any) => {
  return { payload: data };
});
