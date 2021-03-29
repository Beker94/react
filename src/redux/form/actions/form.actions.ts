import { FormPayload } from "./../form.models";
import { createAsyncAction } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const formEditFilm = createAsyncAction(
  "@form/FORM_EDIT_REQUEST",
  "@form/FORM_EDIT_SUCCESS",
  "@form/FORM_EDIT_ERROR"
)<FormPayload, Film, string>();

export const formDeleteFilm = createAsyncAction(
  "@form/FORM_DELETE_REQUEST",
  "@form/FORM_DELETE_SUCCESS",
  "@form/FORM_DELETE_ERROR"
)<FormPayload, Film, string>();

export const formAddFilm = createAsyncAction(
  "@form/FORM_ADD_REQUEST",
  "@form/FORM_ADD_SUCCESS",
  "@form/FORM_ADD_ERROR"
)<FormPayload, Film, string>();
