import React from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

import "./app-styles.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MovieDetails } from "./components/MovieDetails";
import { FormWrapper } from "./components/FormWrapper";
import { useSelector } from "react-redux";
import { Film } from "./interfaces";
import {
  isOpenSelector,
  modalTypeSelector,
  movieSelector,
  successSubmitSelector,
} from "./redux/selectors";
import { RootState } from "./redux/rootStore";
import { Route, useRouteMatch } from "react-router";

import { NotFoundPage } from "./components/NotFoundPage";
import { CustomSwitch } from "./components/CustomSwitch";

const App: React.FC = () => {
  const film = useSelector<RootState, Film>(movieSelector);
  const isOpen = useSelector<RootState, boolean>(isOpenSelector);
  const modalType = useSelector<RootState, string | null>(modalTypeSelector);
  const successSubmit = useSelector<RootState, boolean>(successSubmitSelector);
  const hasMatchedNotFound = useRouteMatch("/notfoundpage");

  return (
    <>
      <ErrorBoundary>
        <Route path="/notfoundpage">
          <NotFoundPage />
        </Route>
        {!hasMatchedNotFound && (
          <>
            <CustomSwitch>
              <Route exact path="/">
                <Header />
              </Route>
              <Route path="/search">
                <Header />
              </Route>
              <Route path="/movie/:id">
                <MovieDetails />
              </Route>
            </CustomSwitch>
            <Main />
            <Footer />
          </>
        )}

        {isOpen || successSubmit ? (
          <FormWrapper
            film={film}
            modalType={modalType}
            successSubmit={successSubmit}
            isOpen={isOpen}
          />
        ) : (
          <></>
        )}
      </ErrorBoundary>
    </>
  );
};

export default App;
