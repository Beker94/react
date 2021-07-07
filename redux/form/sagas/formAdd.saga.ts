import { put, call, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";

import { formAddFilm } from "../actions/form.actions";
import { Film } from "../../../components/interfaces";

import { getErrors } from "../../../helpers";

export async function addFilm(film: Film) {
  const films = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  });

  if (films.ok) {
    return await films.json();
  } else if (films.status === 400) {
    const resp = await films.json();
    return Promise.reject(resp.messages);
  } else {
    alert(`${films.status}: ${films.statusText}`);
    return Promise.reject();
  }
}

export function* addFilmTask(data: {
  payload: Film;
}): Generator<StrictEffect, void, any> {
  try {
    const film = data.payload;

    const res = yield call(addFilm, film);

    if (res) {
      yield put(formAddFilm.success(film));
    }
  } catch (err) {
    const errors = getErrors(err);

    yield put(formAddFilm.failure(errors));
  }
}
