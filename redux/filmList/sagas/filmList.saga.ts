import {
  changeGenre,
  changeSorting,
  searchFilm,
  setMoviesCount,
} from "./../actions/filmList.actions";
import { FilmOptions } from "./../filmList.models";
import {
  put,
  call,
  takeLatest,
  StrictEffect,
  select,
} from "redux-saga/effects";
import { DefaultFilters, FILM_LIMIT, URL } from "../../../constants";
import { clearfilmsList, fetchfilmsList } from "../actions/filmList.actions";
import { optionsSelector } from "../../selectors";

export async function getFilms(options: FilmOptions) {
  const films = await fetch(
    `${URL}?sortBy=${options.sortingType}&sortOrder=desc&search=${
      options.searchTitle
    }&searchBy=title&filter=${
      options.genre === DefaultFilters.defaultGenre ? "" : options.genre
    }&offset=${options.offset}&limit=${
      options.limit ? options.limit : FILM_LIMIT
    }`
  );

  if (films.ok) {
    return await films.json();
  } else {
    return Promise.reject();
  }
}

export function* getFilmsTask(data: {
  payload: {
    payloadOptions: FilmOptions;
    shouldReload?: boolean;
    shouldClear?: boolean;
  };
}): Generator<StrictEffect, void, any> {
  try {
    const {
      payloadOptions,
      shouldReload = true,
      shouldClear = true,
    } = data.payload;

    const stateOptions = yield select(optionsSelector);

    const options = {
      ...stateOptions,
      ...payloadOptions,
    };

    const res = shouldReload ? yield call(getFilms, options) : [];
    yield put(setMoviesCount(res.totalAmount));
    if (shouldClear) {
      yield put(clearfilmsList());
    }
    if (res.data) {
      yield put(fetchfilmsList.success(res.data));
    } else {
      yield put(fetchfilmsList.failure("error"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchfilmsList.failure(err.message));
    } else {
      yield put(fetchfilmsList.failure("Unknown error :("));
    }
  }
}

export function* filmsRootSaga() {
  yield takeLatest(searchFilm, getFilmsTask);
  yield takeLatest(changeGenre, getFilmsTask);
  yield takeLatest(changeSorting, getFilmsTask);
  yield takeLatest(fetchfilmsList.request, getFilmsTask);
}
