import { takeLatest } from "redux-saga/effects";
import { response } from "../mocks";
import { filmRootSaga, getFilm, getFilmTask } from "../sagas/filmDetails.saga";
import { runSaga } from "@redux-saga/core";
import { fetchFilm } from "../actions/filmDetails.actions";

describe("test fetchPetNames function", () => {
  const genObject = filmRootSaga();

  it("should wait for every FETCH action and call getFilmTask", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchFilm.request, getFilmTask)
    );
  });
  it("should request and return movie", async () => {
    const data = await getFilm(447365);
    expect(data).toStrictEqual(response);
  });
});

describe("test fetchFilm success saga", () => {
  it("should call api and dispatch success action", async () => {
    const dispatched: any[] = [];
    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getFilmTask,
      { payload: "447365" }
    ).toPromise();
    expect(dispatched).toEqual([fetchFilm.success(response)]);
  });
});

describe("test fetchFilm error saga", () => {
  it("should call api and dispatch error action", async () => {
    const dispatched: any[] = [];
    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getFilmTask,
      { payload: "447365333" }
    ).toPromise();
    expect(dispatched).toEqual([fetchFilm.failure("Not Found")]);
  });
});
