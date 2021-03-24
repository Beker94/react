import { createAsyncAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const searchFilm = createAsyncAction(
  "@sortByGenreList/FETCH_REQUEST",
  "@sortByGenreList/FETCH_SUCCESS",
  "@sortByGenreList/FETCH_ERROR"
)<string, Film[], string>();
