import { useState } from "react";

import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";
import { genreList } from "../../films";
import { Film, Modal } from "../../interfaces";

import "./style.scss";
import { EditForm } from "../EditForm";
import { DefaultFilters, FormType } from "../../constants";
import { FormWrapper } from "../FormWrapper";
import { DeleteForm } from "../DeleteForm";

interface MainProps {
  modalState: Modal;
  closeModal(): void;
  setOpenedFilmId(filmID: string): void;
  movies: Film[];
  openModal(type: string, filmID: string): void;
}

const Main: React.FC<MainProps> = ({
  modalState,
  closeModal,
  movies,
  openModal,
  setOpenedFilmId,
}) => {
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);
  const [sortBy, setSort] = useState(DefaultFilters.defaultSort);

  const onChangeGenre = (event: React.MouseEvent) => {
    setGenre((prevGenre) =>
      (event.target as HTMLInputElement).id
        ? (event.target as HTMLInputElement).id
        : prevGenre
    );
  };

  const chengeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <div className="main">
      <FilterMoviesList
        selectedGenre={selectedGenre}
        genreList={genreList}
        onChangeGenre={onChangeGenre}
        chengeSort={chengeSort}
      />

      <FilmList
        selectedGenre={selectedGenre}
        sortBy={sortBy}
        movies={movies}
        openModal={openModal}
        setOpenedFilmId={setOpenedFilmId}
      />

      {modalState.isOpen ? (
        <FormWrapper closeModal={closeModal}>
          {modalState.type === FormType.DELETE ? (
            <DeleteForm closeModal={closeModal} modalState={modalState} />
          ) : (
            <EditForm closeModal={closeModal} modalState={modalState} />
          )}
        </FormWrapper>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
