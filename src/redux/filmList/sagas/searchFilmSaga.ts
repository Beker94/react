import { put, call, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";
import { searchFilm } from "../actions/filmList.actions";

export async function getSearchedFilms(search: string) {
  const films = await fetch(`${URL}?search=${search}&searchBy=title`);
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* getSearchedFilmsTask(data: {
  payload: string;
}): Generator<StrictEffect, void, any> {
  try {
    const film = data.payload;

    const res = yield call(getSearchedFilms, film);
    if (res.data.length) {
      yield put(searchFilm.success(res.data));
    } else {
      yield put(searchFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(searchFilm.failure(err.message));
    } else {
      yield put(searchFilm.failure("Unknown error :("));
    }
  }
}
