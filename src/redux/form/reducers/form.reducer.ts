import { formAddFilm } from "./../actions/form.actions";
import { FormState } from "./../form.models";
import { ActionType, createReducer } from "typesafe-actions";
import { formDeleteFilm, formEditFilm } from "../actions/form.actions";

import * as Actions from "../actions/form.actions";

export type FormActions = ActionType<typeof Actions>;

export const initialState: FormState = {
  film: null,
};

export const formReducer = createReducer<FormState, FormActions>(initialState)
  .handleAction(formEditFilm.success, (state, action) => ({
    film: action.payload,
  }))
  .handleAction(formAddFilm.success, (state, action) => ({
    film: action.payload,
  }))
  .handleAction(formDeleteFilm.success, (state, action) => ({
    film: action.payload,
  }));
