import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import { formAddFilm } from "../actions/form.actions";

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
      yield put(formAddFilm.success(res.data));
    } else {
      yield put(formAddFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formAddFilm.failure(err.stack));
    } else {
      yield put(formAddFilm.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(formAddFilm.request, handleFetch);
}

export function* addFilmSaga() {
  yield all([fork(watchLoadFilms)]);
}
