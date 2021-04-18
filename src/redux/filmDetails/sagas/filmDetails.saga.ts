import { fetchFilm } from "./../actions/filmDetails.actions";

import { put, call, takeLatest, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";

export async function getFilm(id: number) {
  const film = await fetch(`${URL}/${id}`);
  if (film.ok) {
    return await film.json();
  } else {
    return Promise.reject(film.statusText);
  }
}

export function* getFilmTask(data: {
  payload: string;
}): Generator<StrictEffect, void, any> {
  try {
    const id = data.payload;
    const res = yield call(getFilm, +id);

    yield put(fetchFilm.success(res));
  } catch (err) {
    yield put(fetchFilm.failure(err));
  }
}

export function* filmRootSaga() {
  yield takeLatest(fetchFilm.request, getFilmTask);
}
