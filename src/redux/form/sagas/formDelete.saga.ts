import { FilmOptions } from "./../../filmList/filmList.models";
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
    return Promise.resolve(true);
  } else {
    return Promise.reject();
  }
}

export function* deleteFilmTask(data: {
  payload: Film;
}): Generator<StrictEffect, void, any> {
  try {
    const allMovies = yield select(allMoviesSelector);
    const film = data.payload;
    const res = yield call(deleteFilm, film);

    if (res) {
      let filmIndex;
      allMovies.forEach((element: Film, index: number) => {
        if (film.id === element.id) {
          filmIndex = index;
        }
      });
      allMovies.splice(filmIndex, 1);
      yield put(formDeleteFilm.success(film));
      yield put(filmListChanged(allMovies));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(formDeleteFilm.failure(err.message));
    } else {
      yield put(formDeleteFilm.failure("Unknown error :("));
    }
  }
}
