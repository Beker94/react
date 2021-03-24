import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { filmsSaga } from "./filmList/sagas/filmList.saga";
import { filterByGenreSaga } from "./filmList/sagas/filterFilmByGenre.saga";
import { editFilmSaga } from "./form/sagas/formEdit.saga";
import { searchFilmSaga } from "./filmList/sagas/searchFilmSaga";

export const saga = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    fork(filmsSaga),
    fork(filterByGenreSaga),
    fork(editFilmSaga),
    fork(searchFilmSaga),
  ]);
}
