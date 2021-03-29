import { put, call, takeLatest, StrictEffect } from "redux-saga/effects";
import { DefaultFilters, URL } from "../../../constants";
import { fetchfilmsList, searchFilm } from "../actions/filmList.actions";
import { getSearchedFilmsTask } from "./searchFilmSaga";

export async function getFilms(genre: string) {
  let films;

  if (genre) {
    films = await fetch(
      `${URL}?search=${
        genre === DefaultFilters.defaultGenre ? "" : genre
      }&searchBy=genres`
    );
  } else {
    films = await fetch(URL);
  }

  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* getFilmsTask(data: {
  payload: string;
}): Generator<StrictEffect, void, any> {
  try {
    const genre = data.payload;

    const res = yield call(getFilms, genre);
    if (res.data.length) {
      yield put(fetchfilmsList.success(res.data));
    } else {
      yield put(fetchfilmsList.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchfilmsList.failure(err.message));
    } else {
      yield put(fetchfilmsList.failure("Unknown error :("));
    }
  }
}

export function* filmsRootSaga() {
  yield takeLatest(fetchfilmsList.request, getFilmsTask);
  yield takeLatest(searchFilm.request, getSearchedFilmsTask);
}
