import { useState } from "react";

import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";
import { genreList } from "../../films";
import { Film, Modal } from "../../interfaces";

import "./style.scss";
import { Form } from "../Form";
import { filterByGenre, sorting } from "../../helpers";
import { DefaultFilters } from "../../constants";

interface MainProps {
  modalState: Modal;
  closeModal(): void;
  movies: Film[];
  openModal(type: string, filmID: string): void;
}

const Main: React.FC<MainProps> = ({
  modalState,
  closeModal,
  movies,
  openModal,
}) => {
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);
  const [sortBy, setSort] = useState("");

  const onChangeGenre = (event: React.MouseEvent) => {
    setSort("");
    setGenre((prevGenre) =>
      (event.target as HTMLInputElement).id
        ? (event.target as HTMLInputElement).id
        : prevGenre
    );
  };

  const chengeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(DefaultFilters.defaultGenre);
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
        movies={filterByGenre(sorting(movies, sortBy), selectedGenre)}
        openModal={openModal}
      />

      {modalState.isOpen ? (
        <Form closeModal={closeModal} modalState={modalState} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
