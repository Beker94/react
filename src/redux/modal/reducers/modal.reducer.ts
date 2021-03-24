import { createReducer } from "typesafe-actions";
import { Film } from "../../../interfaces";
import { ModalState } from "../modal.models";
import { FormType, newMovie } from "../../../constants";

export const initialState: ModalState = {
  modal: null,
  film: newMovie,
  isOpen: false,
};

export const modalReducer = createReducer(initialState)
  .handleAction(
    "@modal/OPEN_DELETE_FORM",
    (state: ModalState, action: { payload: Film }) => ({
      modal: FormType.DELETE,
      film: action.payload,
      isOpen: true,
    })
  )
  .handleAction("@modal/OPEN_ADD_FORM", (state: ModalState) => ({
    modal: FormType.ADD,
    film: newMovie,
    isOpen: true,
  }))
  .handleAction(
    "@modal/OPEN_EDIT_FORM",
    (state: ModalState, action: { payload: Film }) => ({
      modal: FormType.EDIT,
      film: action.payload,
      isOpen: true,
    })
  )
  .handleAction("@modal/CLOSE_FORM", (state: ModalState) => ({
    ...state,
    isOpen: false,
  }));
