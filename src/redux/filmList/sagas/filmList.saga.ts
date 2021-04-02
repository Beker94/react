import {
  changeGenre,
  getMoreFilms,
  searchFilm,
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
import {
  genreSelector,
  searchedFilmSelector,
  offsetSelector,
  sortingTypeSelector,
} from "../../selectors";

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
  payload: FilmOptions;
}): Generator<StrictEffect, void, any> {
  try {
    let needClear = true;
    let needReload = true;
    const genre = yield select(genreSelector);
    const searchTitle = yield select(searchedFilmSelector);
    const offset = yield select(offsetSelector);
    const sortingType = yield select(sortingTypeSelector);

    const state = {
      genre,
      searchTitle,
      offset,
      sortingType,
    };
    const options = {
      ...state,
      ...data.payload,
    };

    switch (Object.keys(data.payload)[0]) {
      case "searchTitle":
        if (data.payload.searchTitle !== searchTitle) {
          yield put(searchFilm(data.payload.searchTitle!));
          options.offset = 0;
        } else {
          needReload = false;
          needClear = false;
        }

        break;
      case "genre":
        if (data.payload.genre !== genre) {
          yield put(changeGenre(data.payload.genre!));
          options.offset = 0;
        } else {
          needReload = false;
          needClear = false;
        }

        break;
      case "sortingType":
        if (data.payload.sortingType !== sortingType) {
          yield put(changeGenre(data.payload.sortingType!));
          options.offset = 0;
        } else {
          needReload = false;
          needClear = false;
        }
        break;
      case "offset":
        yield put(getMoreFilms());
        needClear = false;
        options.offset = offset + FILM_LIMIT;
        break;
      default:
        needClear = false;
        break;
    }

    const res = needReload ? yield call(getFilms, options) : [];
    if (needClear) {
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
  yield takeLatest(fetchfilmsList.request, getFilmsTask);
}
