import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import { formDeleteFilm } from "../actions/form.actions";

export async function fetchFilms(film) {
  const films = await fetch(`http://localhost:4000/movies/${film.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
      yield put(formDeleteFilm.success(res.data));
    } else {
      yield put(formDeleteFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formDeleteFilm.failure(err.stack));
    } else {
      yield put(formDeleteFilm.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(formDeleteFilm.request, handleFetch);
}

export function* deleteFilmSaga() {
  yield all([fork(watchLoadFilms)]);
}
