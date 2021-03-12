import React from "react";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { films } from "./films";
import { Film, Modal } from "./interfaces";
import { filterByUserInput } from "./helpers";

import "./app-styles.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MovieDetails } from "./components/MovieDetails";
import { FormType, newMovie } from "./constants";
import { FormWrapper } from "./components/FormWrapper";
import { DeleteForm } from "./components/DeleteForm";
import { FilmForm } from "./components/FilmForm";

const App: React.FC = () => {
  const [searchedFilm, setSearchFilm] = useState("");
  const [openedFilm, setOpenedFilm] = useState<Film | null>(null);
  const [modalState, setmodalState] = useState<Modal>({
    type: "",
    isOpen: false,
    film: null,
  });

  const onSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchFilm((event.target[0] as HTMLInputElement).value);
  };

  const openModal = (type: string, film?: Film) => {
    setmodalState({
      type: type,
      isOpen: true,
      film: film || newMovie,
    });
  };

  const closeModal = () => {
    setmodalState({
      type: "",
      isOpen: false,
      film: null,
    });
  };

  const closeFilm = () => {
    setOpenedFilm(null);
  };

  const changeOpenFilm = (film: Film) => {
    setOpenedFilm(film);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ErrorBoundary>
        {openedFilm ? (
          <MovieDetails closeFilm={closeFilm} film={openedFilm} />
        ) : (
          <Header onSearch={onSearch} openModal={openModal} />
        )}

        <Main
          openModal={openModal}
          movies={filterByUserInput(films, searchedFilm)}
          onMovieItemClick={changeOpenFilm}
        />
        <Footer />
        {modalState.isOpen ? (
          <FormWrapper closeModal={closeModal}>
            {modalState.type === FormType.DELETE ? (
              <DeleteForm closeModal={closeModal} modalState={modalState} />
            ) : (
              <FilmForm closeModal={closeModal} modalState={modalState} />
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
