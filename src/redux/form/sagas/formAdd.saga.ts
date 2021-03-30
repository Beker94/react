import { FormPayload } from "./../form.models";
import { put, call, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";
import { fetchfilmsList } from "../../filmList/actions/filmList.actions";
import { formAddFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";

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
  } else {
    return Promise.reject();
  }
}

export function* addFilmTask(data: {
  payload: FormPayload;
}): Generator<StrictEffect, void, any> {
  try {
    const film = data.payload.film;
    const genre = data.payload.genre;
    const searchTitle = data.payload.searchTitle;

    const res = yield call(addFilm, film);
    if (res.data) {
      yield put(fetchfilmsList.request({ genre, searchTitle }));
    } else {
      yield put(formAddFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formAddFilm.failure(err.message));
    } else {
      yield put(formAddFilm.failure("Unknown error :("));
    }
  }
}
