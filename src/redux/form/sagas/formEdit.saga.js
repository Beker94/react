import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import { formEditFilm } from "../actions/form.actions";

export async function fetchFilms(film) {
  const films = await fetch(`http://localhost:4000/movies`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  });
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* handleFetch(data) {
  try {
    const film = data.payload;

    const res = yield call(fetchFilms, film);
    if (res.data.length) {
      yield put(formEditFilm.success(res.data));
    } else {
      yield put(formEditFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formEditFilm.failure(err.stack));
    } else {
      yield put(formEditFilm.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(formEditFilm.request, handleFetch);
}

export function* editFilmSaga() {
  yield all([fork(watchLoadFilms)]);
}
