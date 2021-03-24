import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import { fetchfilmsList } from "../actions/filmList.actions";

export async function fetchFilms() {
  const films = await fetch(`http://localhost:4000/movies`);
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* handleFetch() {
  try {
    const res = yield call(fetchFilms);
    if (res.data.length) {
      yield put(fetchfilmsList.success(res.data));
    } else {
      yield put(fetchfilmsList.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchfilmsList.failure(err.stack));
    } else {
      yield put(fetchfilmsList.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(fetchfilmsList.request, handleFetch);
}

export function* filmsSaga() {
  yield all([fork(watchLoadFilms)]);
}
