import { put, call, StrictEffect, select } from "redux-saga/effects";
import { Formfields, URL } from "../../../constants";
import { filmListChanged } from "../../filmList/actions/filmList.actions";
import { formAddFilm } from "../actions/form.actions";
import { Film } from "../../../interfaces";
import {
  allMoviesSelector,
  genreSelector,
  sortingTypeSelector,
} from "../../selectors";
import { filterByGenre, sorting } from "../../../helpers";
import { ErrorFields } from "../form.models";

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
    const resp = await films.json();
    return Promise.reject(resp.messages);
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
      yield put(formAddFilm.success(film));
    }
  } catch (err) {
    const errors: ErrorFields[] = [];
    err.forEach((el: string, index: number) => {
      for (let key in Formfields) {
        if (el.includes(key)) {
          const obj: any = {};
          obj[key] = el;
          errors.push(obj);
        }
      }
    });

    yield put(formAddFilm.failure(errors));
  }
}
