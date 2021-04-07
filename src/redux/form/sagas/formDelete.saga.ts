import { filmListChanged } from "./../../filmList/actions/filmList.actions";
import { put, call, StrictEffect, select } from "redux-saga/effects";
import { URL } from "../../../constants";

import { formDeleteFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";
import { allMoviesSelector } from "../../selectors";

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
  payload: Film;
}): Generator<StrictEffect, void, any> {
  const allMovies = yield select(allMoviesSelector);
  const film = data.payload;
  try {
    const res = yield call(deleteFilm, film);

    if (res) {
      const index = allMovies.indexOf(film);
      allMovies.splice(index, 1);

      yield put(filmListChanged(allMovies));
    } else {
      yield put(formDeleteFilm.failure("error"));
    }
  } catch (err) {
    const index = allMovies.indexOf(film);
    allMovies.splice(index, 1);

    yield put(filmListChanged(allMovies));
    if (err instanceof Error) {
      yield put(formDeleteFilm.failure(err.message));
    } else {
      yield put(formDeleteFilm.failure("Unknown error :("));
    }
  }
}
