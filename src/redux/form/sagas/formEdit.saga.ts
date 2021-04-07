import { filmListChanged } from "./../../filmList/actions/filmList.actions";
import { put, call, StrictEffect, select } from "redux-saga/effects";
import { URL } from "../../../constants";
import { formEditFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";
import { allMoviesSelector, genreSelector } from "../../selectors";
import { filterByGenre } from "../../../helpers";

export async function editFilm(film: Film) {
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
  payload: Film;
}): Generator<StrictEffect, void, any> {
  try {
    const allMovies = yield select(allMoviesSelector);
    const film = data.payload;
    const genre = yield select(genreSelector);
    for (let i = 0; i < allMovies.length; i++) {
      if (allMovies[i].id === film.id) allMovies[i] = film;
    }

    const res = yield call(editFilm, film);

    if (res) {
      yield put(filmListChanged(filterByGenre(allMovies, genre)));
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
