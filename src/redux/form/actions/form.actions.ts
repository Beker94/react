import { createAsyncAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const formEditFilm = createAsyncAction(
  "@form/FETCH_REQUEST",
  "@form/FETCH_SUCCESS",
  "@form/FETCH_ERROR"
)<Film, Film, string>();

export const formDeleteFilm = createAsyncAction(
  "@form/FETCH_REQUEST",
  "@form/FETCH_SUCCESS",
  "@form/FETCH_ERROR"
)<Film, Film, string>();

export const formAddFilm = createAsyncAction(
  "@form/FETCH_REQUEST",
  "@form/FETCH_SUCCESS",
  "@form/FETCH_ERROR"
)<Film, Film, string>();
