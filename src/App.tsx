import React from "react";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { films } from "./films";
import { Modal } from "./interfaces";
import { filterByUserInput } from "./helpers";

import "./app-styles.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MovieDetails } from "./components/MovieDetails";

const App: React.FC = () => {
  const [searchedFilm, setSearchFilm] = useState("");
  const [openedFilmId, setOpenedFilmId] = useState("");
  const [modalState, setmodalState] = useState<Modal>({
    type: "",
    isOpen: false,
    filmID: "",
  });

  const onSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchFilm((event.target[0] as HTMLInputElement).value);
  };

  const openModal = (type: string, film?: string) => {
    setmodalState({
      type: type,
      isOpen: true,
      filmID: film || "",
    });
  };

  const closeModal = () => {
    setmodalState({
      type: "",
      isOpen: false,
      filmID: "",
    });
  };

  const closeFilm = () => {
    setOpenedFilmId("");
  };

  const changeOpenFilm = (filmID: string) => {
    window.scrollTo(0, 0);
    setOpenedFilmId(filmID);
  };

  return (
    <>
      <ErrorBoundary>
        {openedFilmId.length ? (
          <MovieDetails closeFilm={closeFilm} filmID={openedFilmId} />
        ) : (
          <Header onSearch={onSearch} openModal={openModal} />
        )}

        <Main
          modalState={modalState}
          closeModal={closeModal}
          openModal={openModal}
          movies={filterByUserInput(films, searchedFilm)}
          setOpenedFilmId={changeOpenFilm}
        />
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default App;
