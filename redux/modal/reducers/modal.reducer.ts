import { ActionType, createReducer } from "typesafe-actions";
import { ModalState } from "../modal.models";
import { FormType, newMovie } from "../../../constants";

import * as Actions from "../actions/modal.actions";

export type ModalActions = ActionType<typeof Actions>;

export const initialState: ModalState = {
  modal: null,
  film: newMovie,
  isOpen: false,
};

export const modalReducer = createReducer<ModalState, ModalActions>(
  initialState
)
  .handleType("@modal/OPEN_DELETE_FORM", (state, action) => ({
    modal: FormType.DELETE,
    film: action.payload,
    isOpen: true,
  }))
  .handleType("@modal/OPEN_ADD_FORM", (state: ModalState) => ({
    modal: FormType.ADD,
    film: newMovie,
    isOpen: true,
  }))
  .handleType("@modal/OPEN_EDIT_FORM", (state, action) => ({
    modal: FormType.EDIT,
    film: action.payload,
    isOpen: true,
  }))
  .handleType("@modal/CLOSE_FORM", (state: ModalState) => ({
    ...state,
    isOpen: false,
  }));
