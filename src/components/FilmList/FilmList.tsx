import { useMemo } from "react";
import { renderFilms } from "./helpers";

import "./style.scss";

interface FilmListProps {
  selectedGenre: string;
  searchedFilm: string;
  sortBy: string;
}

const FilmList: React.FC<FilmListProps> = ({
  selectedGenre,
  searchedFilm,
  sortBy,
}) => {
  const movies = useMemo(() => {
    return renderFilms(selectedGenre, searchedFilm, sortBy);
  }, [selectedGenre, searchedFilm, sortBy]);

  const noFilm = <div>No movie found</div>;
  return (
    <>
      <div className="film-count">
        <h3>
          <span>{movies.length}</span> movies found
        </h3>
      </div>
      <div className={movies.length ? "film-list" : "film-list__none"}>
        {movies.length ? movies : noFilm}
      </div>
    </>
  );
};

export default FilmList;
