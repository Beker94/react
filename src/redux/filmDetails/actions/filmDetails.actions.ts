import { createAsyncAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const fetchFilm = createAsyncAction(
  "@filmList/FETCH_FILM_REQUEST",
  "@filmList/FETCH_FILM_SUCCESS",
  "@filmList/FETCH_FILM_ERROR"
)<string, Film, string | ErrorEvent>();
