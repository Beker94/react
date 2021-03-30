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
  openedFilmSelector,
} from "./redux/selectors";
import { RootState } from "./redux/rootStore";

const App: React.FC = () => {
  const film = useSelector<RootState, Film>(movieSelector);
  const openedFilm = useSelector<RootState, Film | null>(openedFilmSelector);
  const isOpen = useSelector<RootState, boolean>(isOpenSelector);
  const modalType = useSelector<RootState, string | null>(modalTypeSelector);

  return (
    <>
      <ErrorBoundary>
        {openedFilm ? <MovieDetails film={openedFilm} /> : <Header />}

        <Main />
        <Footer />
        {isOpen ? (
          <FormWrapper modalType={modalType}>
            {modalType === FormType.DELETE ? (
              <DeleteForm film={film} modalType={modalType} />
            ) : (
              <FilmForm film={film} modalType={modalType} />
            )}
          </FormWrapper>
        ) : (
          <></>
        )}
      </ErrorBoundary>
    </>
  );
};

export default App;
