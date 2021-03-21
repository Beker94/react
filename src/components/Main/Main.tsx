import { useState } from "react";

import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";
import { genreList } from "../../films";
import { Film } from "../../interfaces";

import "./style.scss";
import { DefaultFilters } from "../../constants";

interface MainProps {
  onMovieItemClick(film: Film): void;
  movies: Film[];
  openModal(type: string, film: Film): void;
}

const Main: React.FC<MainProps> = ({ movies, openModal, onMovieItemClick }) => {
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);
  const [sortBy, setSort] = useState(DefaultFilters.defaultSort);

  const onChangeGenre = (event: React.MouseEvent) => {
    setGenre((event.target as HTMLInputElement).id);
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
        onMovieItemClick={onMovieItemClick}
      />
    </div>
  );
};

export default Main;
