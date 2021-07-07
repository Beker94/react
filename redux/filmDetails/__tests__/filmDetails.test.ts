import { Movie } from "../mocks";
import { filmFilmDetailsReducer } from "./../reducers/filmDetails.reducer";

import { initialState } from "../reducers/filmDetails.reducer";

import { fetchFilm } from "../actions/filmDetails.actions";

describe("test filmFilmDetailsReducer reducer", () => {
  it("@filmList/FETCH_FILM_REQUEST", () => {
    const expectedState = {
      openedFilm: null,
      loading: true,
    };

    const updatedState = filmFilmDetailsReducer(
      initialState,
      fetchFilm.request("13123123")
    );

    expect(updatedState).toEqual(expectedState);
  });

  it("@filmList/FETCH_FILM_SUCCESS", () => {
    const expectedState = {
      openedFilm: Movie,
      loading: false,
    };

    const updatedState = filmFilmDetailsReducer(
      initialState,
      fetchFilm.success(Movie)
    );

    expect(updatedState).toEqual(expectedState);
  });

  it("@filmList/FETCH_FILM_ERROR", () => {
    const expectedState = {
      openedFilm: null,
      loading: false,
    };

    const updatedState = filmFilmDetailsReducer(
      initialState,
      fetchFilm.failure("error")
    );

    expect(updatedState).toEqual(expectedState);
  });
});
