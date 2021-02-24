import { useState } from "react";

import { FilmList } from "../FilmList";
import { Filter } from "../Filter";
import { genreList } from "../../films";

import "./style.scss";

interface MainProps {
  searchFilm: string;
}

const Main: React.FC<MainProps> = ({ searchFilm }) => {
  const [genre, setGenre] = useState<string>(genreList[0].id);
  const [sort, setSort] = useState<string>("date");

  const chengeGenre = (e: React.MouseEvent) => {
    setGenre(() => (e.target as HTMLInputElement).id);
  };

  const chengeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(() => e.target.value);
  };

  return (
    <div className="main">
      <Filter
        genre={genre}
        genreList={genreList}
        chengeGenre={chengeGenre}
        chengeSort={chengeSort}
      />
      <FilmList genre={genre} searchFilm={searchFilm} sort={sort} />
    </div>
  );
};

export default Main;
