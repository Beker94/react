import { formAddFilm } from "./../actions/form.actions";
import { FormState } from "./../form.models";
import { ActionType, createReducer } from "typesafe-actions";
import {
  formDeleteFilm,
  formEditFilm,
  closeSuccessForm,
  clearErrors,
} from "../actions/form.actions";

import * as Actions from "../actions/form.actions";

export type FormActions = ActionType<typeof Actions>;

export const initialState: FormState = {
  film: null,
  successSubmit: false,
  errors: [],
};

export const formReducer = createReducer<FormState, FormActions>(initialState)
  .handleAction(formEditFilm.success, (state, action) => ({
    ...state,
    successSubmit: true,
    film: action.payload,
  }))
  .handleAction(formAddFilm.success, (state, action) => ({
    ...state,
    successSubmit: true,
    film: action.payload,
  }))
  .handleAction(formDeleteFilm.success, (state, action) => ({
    ...state,
    successSubmit: true,
    film: action.payload,
  }))
  .handleAction(closeSuccessForm, (state, action) => ({
    ...state,
    successSubmit: false,
    film: null,
  }))
  .handleAction(formAddFilm.failure, (state, action) => ({
    ...state,
    successSubmit: false,
    errors: action.payload,
  }))
  .handleAction(clearErrors, (state, action) => ({
    ...state,
    errors: [],
  }));
