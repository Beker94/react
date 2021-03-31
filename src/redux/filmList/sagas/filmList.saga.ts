import { FilmOptions } from "./../filmList.models";
import { put, call, takeLatest, StrictEffect } from "redux-saga/effects";
import { DefaultFilters, URL } from "../../../constants";
import { fetchfilmsList } from "../actions/filmList.actions";

export async function getFilms(options: FilmOptions) {
  const films = await fetch(
    `${URL}?sortBy=${options.sortingType}&sortOrder=desc&search=${
      options.searchTitle
    }&searchBy=title&filter=${
      options.genre === DefaultFilters.defaultGenre ? "" : options.genre
    }&offset=${options.offset}&limit=${options.limit ? options.limit : 9}`
  );

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
