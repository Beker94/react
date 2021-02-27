import { useState } from "react";

import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";
import { genreList } from "../../films";

import "./style.scss";

const CONSTANTS = {
  defaultSort: "date",
  defaultGenre: "All",
};

interface MainProps {
  searchedFilm: string;
}

const Main: React.FC<MainProps> = ({ searchedFilm }) => {
  const [selectedGenre, setGenre] = useState(CONSTANTS.defaultGenre);
  const [sortBy, setSort] = useState(CONSTANTS.defaultSort);

  const onChangeGenre = (event: React.MouseEvent) => {
    setGenre((prevGenre) =>
      (event.target as HTMLInputElement).id
        ? (event.target as HTMLInputElement).id
        : prevGenre
    );
  };

  const chengeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(() => event.target.value);
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
        searchedFilm={searchedFilm}
        sortBy={sortBy}
      />
    </div>
  );
};

export default Main;
