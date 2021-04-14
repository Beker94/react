import { filmListChanged } from "./../../filmList/actions/filmList.actions";
import { put, call, StrictEffect, select } from "redux-saga/effects";
import { URL } from "../../../constants";
import { formEditFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";
import { allMoviesSelector, genreSelector } from "../../selectors";
import { filterByGenre, getErrors } from "../../../helpers";

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
  } else if (films.status === 400) {
    const resp = await films.json();
    return Promise.reject(resp.messages);
  } else {
    alert(`${films.status}: ${films.statusText}`);
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
      if (allMovies[i].id === film.id) {
        allMovies[i] = film;
        break;
      }
    }

    const res = yield call(editFilm, film);

    if (res) {
      yield put(filmListChanged(filterByGenre(allMovies, genre)));
      yield put(formEditFilm.success(film));
    }
  } catch (err) {
    const errors = getErrors(err);

    yield put(formEditFilm.failure(errors));
  }
}
