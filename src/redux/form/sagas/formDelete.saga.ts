import { FormPayload } from "./../form.models";
import { put, call, StrictEffect } from "redux-saga/effects";
import { URL } from "../../../constants";
import { fetchfilmsList } from "../../filmList/actions/filmList.actions";
import { formDeleteFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";

export async function deleteFilm(film: Film) {
  const films = await fetch(`${URL}/${film.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* deleteFilmTask(data: {
  payload: FormPayload;
}): Generator<StrictEffect, void, any> {
  const genre = data.payload.genre;
  try {
    const film = data.payload.film;

    const res = yield call(deleteFilm, film);

    if (res) {
      yield put(fetchfilmsList.request(genre));
    } else {
      yield put(formDeleteFilm.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchfilmsList.request(genre));
      yield put(formDeleteFilm.failure(err.message));
    } else {
      yield put(formDeleteFilm.failure("Unknown error :("));
    }
  }
}
