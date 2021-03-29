import { FilmOptions } from "./../filmList.models";
import { put, call, takeLatest, StrictEffect } from "redux-saga/effects";
import { DefaultFilters, URL } from "../../../constants";
import { fetchfilmsList } from "../actions/filmList.actions";

export async function getFilms(options: FilmOptions) {
  let films;

  if (options.genre || options.searchTitle) {
    films = await fetch(
      `${URL}?search=${options.searchTitle}&searchBy=title&filter=${
        options.genre === DefaultFilters.defaultGenre ? "" : options.genre
      }`
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
  payload: FilmOptions;
}): Generator<StrictEffect, void, any> {
  try {
    const options = data.payload;

    const res = yield call(getFilms, options);
    if (res.data) {
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
}
