import { put, call, StrictEffect, select } from "redux-saga/effects";
import { URL } from "../../../constants";
import { filmListChanged } from "../../filmList/actions/filmList.actions";
import { formAddFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";
import {
  allMoviesSelector,
  genreSelector,
  sortingTypeSelector,
} from "../../selectors";
import { filterByGenre, sorting } from "../../../helpers";

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
  payload: Film;
}): Generator<StrictEffect, void, any> {
  try {
    const allMovies = yield select(allMoviesSelector);

    const film = data.payload;
    const sortingType = yield select(sortingTypeSelector);
    const genre = yield select(genreSelector);

    const res = yield call(addFilm, film);
    allMovies.push(res);
    const filteredList = filterByGenre(sorting(allMovies, sortingType), genre);
    if (res) {
      yield put(filmListChanged(filteredList));
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
