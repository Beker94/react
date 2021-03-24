import { formAddFilm } from "./../actions/form.actions";
import { FormState } from "./../form.models";
import { createReducer } from "typesafe-actions";
import { Film } from "../../../interfaces";
import { formDeleteFilm, formEditFilm } from "../actions/form.actions";

export const initialState: FormState = {
  film: null,
};

export const formReducer = createReducer(initialState)
  .handleAction(
    formEditFilm.success,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formEditFilm.request,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formEditFilm.failure,
    (state: FormState, action: { payload: string }) => ({
      film: null,
    })
  )
  .handleAction(
    formAddFilm.success,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formAddFilm.request,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formAddFilm.failure,
    (state: FormState, action: { payload: string }) => ({
      film: null,
    })
  )
  .handleAction(
    formDeleteFilm.success,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formDeleteFilm.request,
    (state: FormState, action: { payload: Film[] }) => ({
      film: action.payload,
    })
  )
  .handleAction(
    formDeleteFilm.failure,
    (state: FormState, action: { payload: string }) => ({
      film: null,
    })
  );
