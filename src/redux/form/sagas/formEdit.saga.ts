import { filmListChanged } from "./../../filmList/actions/filmList.actions";
import { put, call, StrictEffect, select } from "redux-saga/effects";
import { FormFieldsName, URL } from "../../../constants";
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
    const resp = await films.json();
    return Promise.reject(resp.messages);
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
    const errors: any = {};

    err.forEach((el: string, index: number) => {
      for (let key in FormFieldsName) {
        if (el.includes(key)) {
          const value = el.replace(
            key,
            FormFieldsName[key as keyof typeof FormFieldsName]
          );
          errors[key] = value;
        }
      }
    });

    yield put(formEditFilm.failure(errors));
  }
}
