import { FormPayload } from "./../form.models";
import { put, call, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";
import { fetchfilmsList } from "../../filmList/actions/filmList.actions";
import { formEditFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";

export async function editFilm(film: Film) {
  debugger;
  const films = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  });
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* editFilmTask(data: {
  payload: FormPayload;
}): Generator<StrictEffect, void, any> {
  debugger;
  try {
    const film = data.payload.film;
    const genre = data.payload.genre;

    const res = yield call(editFilm, film);
    if (res) {
      yield put(fetchfilmsList.request(genre));
    } else {
      yield put(formEditFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formEditFilm.failure(err.message));
    } else {
      yield put(formEditFilm.failure("Unknown error :("));
    }
  }
}
