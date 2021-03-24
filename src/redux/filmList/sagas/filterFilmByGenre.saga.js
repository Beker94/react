import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import { DefaultFilters } from "../../../constants";
import { fetchSortByGenreList } from "../actions/sortByGenreList";

export async function fetchFilms(genre) {
  const films = await fetch(
    `http://localhost:4000/movies?search=${
      genre === DefaultFilters.defaultGenre ? "" : genre
    }&searchBy=genres`
  );
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* handleFetch(data) {
  try {
    const genre = data.payload;

    const res = yield call(fetchFilms, genre);
    if (res.data.length) {
      yield put(fetchSortByGenreList.success(res.data));
    } else {
      yield put(fetchSortByGenreList.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchSortByGenreList.failure(err.stack));
    } else {
      yield put(fetchSortByGenreList.failure("Невідома помилка :("));
    }
  }
}

export function* watchLoadFilms() {
  yield takeEvery(fetchSortByGenreList.request, handleFetch);
}

export function* filterByGenreSaga() {
  yield all([fork(watchLoadFilms)]);
}
