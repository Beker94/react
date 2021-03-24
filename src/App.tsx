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

const App: React.FC = () => {
  const film: Film = useSelector((state: any) => {
    return state.modal.film;
  });

  const openedFilm: Film = useSelector((state: any) => {
    return state.filmDescription.openedFilm;
  });

  const isOpen: boolean = useSelector((state: any) => {
    return state.modal.isOpen;
  });

  const modalType: string = useSelector((state: any) => {
    return state.modal.modal;
  });

  return (
    <>
      <ErrorBoundary>
        {openedFilm ? <MovieDetails film={openedFilm} /> : <Header />}

        <Main />
        <Footer />
        {isOpen ? (
          <FormWrapper modalType={modalType}>
            {modalType === FormType.DELETE ? (
              <DeleteForm film={film} />
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
