import {
  formAddFilm,
  formDeleteFilm,
  formEditFilm,
} from "./../actions/form.actions";
import { addFilmTask } from "./formAdd.saga";
import { deleteFilmTask } from "./formDelete.saga";
import { editFilmTask } from "./formEdit.saga";
import { takeLatest } from "redux-saga/effects";

export function* formRootSaga() {
  yield takeLatest(formAddFilm.request, addFilmTask);
  yield takeLatest(formDeleteFilm.request, deleteFilmTask);
  yield takeLatest(formEditFilm.request, editFilmTask);
}
