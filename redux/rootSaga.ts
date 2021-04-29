import { all, fork } from "redux-saga/effects";

import { filmsRootSaga } from "./filmList/sagas/filmList.saga";
import { formRootSaga } from "./form/sagas/form.saga";
import { filmRootSaga } from "./filmDetails/sagas/filmDetails.saga";

export function* rootSaga() {
  yield all([fork(filmsRootSaga), fork(formRootSaga), fork(filmRootSaga)]);
}
