import { createAsyncAction, createCustomAction } from "typesafe-actions";

import { Film } from "../../../interfaces";
import { ErrorFields } from "../form.models";

export const formEditFilm = createAsyncAction(
  "@form/FORM_EDIT_REQUEST",
  "@form/FORM_EDIT_SUCCESS",
  "@form/FORM_EDIT_ERROR"
)<Film, Film, ErrorFields>();

export const formDeleteFilm = createAsyncAction(
  "@form/FORM_DELETE_REQUEST",
  "@form/FORM_DELETE_SUCCESS",
  "@form/FORM_DELETE_ERROR"
)<Film, Film, string>();

export const formAddFilm = createAsyncAction(
  "@form/FORM_ADD_REQUEST",
  "@form/FORM_ADD_SUCCESS",
  "@form/FORM_ADD_ERROR"
)<Film, Film, ErrorFields>();

export const closeSuccessForm = createCustomAction(
  "@filmDetails/CLOSE_SUCCESS_DETAILS"
);

export const clearErrors = createCustomAction("@filmDetails/CLEARE_ERRORS");
