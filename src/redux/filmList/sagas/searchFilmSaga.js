import { put, call, fork, all, takeEvery } from "redux-saga/effects";
import { searchFilm } from "../actions/searchFilm.action";

export async function fetchFilms(search) {
  const films = await fetch(
    `http://localhost:4000/movies?search=${search}&searchBy=title`
  );
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
      yield put(searchFilm.success(res.data));
    } else {
      yield put(searchFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(searchFilm.failure(err.stack));
    } else {
      yield put(searchFilm.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(searchFilm.request, handleFetch);
}

export function* searchFilmSaga() {
  yield all([fork(watchLoadFilms)]);
}
