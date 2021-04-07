import React from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

import "./app-styles.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MovieDetails } from "./components/MovieDetails";
import { FormType } from "./constants";
import { FormWrapper } from "./components/FormWrapper";
import { DeleteForm } from "./components/DeleteForm";
import { FilmForm } from "./components/FilmForm";
import { useSelector } from "react-redux";
import { Film } from "./interfaces";
import {
  isOpenSelector,
  modalTypeSelector,
  movieSelector,
  successSubmitSelector,
} from "./redux/selectors";
import { RootState } from "./redux/rootStore";
import { Route, Switch } from "react-router";
import { SuccesPopap } from "./components/SuccesPopap";
import { NotFoundPage } from "./components/NotFoundPage";

const App: React.FC = () => {
  const film = useSelector<RootState, Film>(movieSelector);
  const isOpen = useSelector<RootState, boolean>(isOpenSelector);
  const modalType = useSelector<RootState, string | null>(modalTypeSelector);
  const successSubmit = useSelector<RootState, boolean>(successSubmitSelector);

  return (
    <>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
          <Route strict path="/movies">
            <Header />
          </Route>
          <Route strict path="/movie/:id">
            <MovieDetails />
          </Route>
          <Route path="/404">
            <FormWrapper>
              <NotFoundPage />
            </FormWrapper>
          </Route>
          <Route path="*">
            <FormWrapper>
              <NotFoundPage />
            </FormWrapper>
          </Route>
        </Switch>
        <Main />
        <Footer />

        {isOpen ? (
          <FormWrapper>
            {modalType === FormType.DELETE ? (
              <DeleteForm film={film} modalType={modalType} />
            ) : (
              <FilmForm
                film={film}
                modalType={modalType}
                successSubmit={successSubmit}
              />
            )}
          </FormWrapper>
        ) : successSubmit ? (
          <FormWrapper>
            <SuccesPopap modalType={modalType} />
          </FormWrapper>
        ) : (
          <></>
        )}
      </ErrorBoundary>
    </>
  );
};

export default App;
