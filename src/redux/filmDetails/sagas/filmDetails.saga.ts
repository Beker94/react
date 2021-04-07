import { fetchFilm } from "./../actions/filmDetails.actions";

import { put, call, takeLatest, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";

export async function getFilm(id: number) {
  const film = await fetch(`${URL}/${id}`);
  if (film.ok) {
    return await film.json();
  } else {
    return Promise.reject();
  }
}

export function* getFilmTask(data: {
  payload: string;
}): Generator<StrictEffect, void, any> {
  try {
    const id = data.payload;
    const res = yield call(getFilm, +id);

    if (res) {
      yield put(fetchFilm.success(res));
    } else {
      yield put(fetchFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchFilm.failure(err.message));
    } else {
      yield put(fetchFilm.failure("Unknown error :("));
    }
  }
}

export function* filmRootSaga() {
  yield takeLatest(fetchFilm.request, getFilmTask);
}
