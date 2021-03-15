import { useMemo } from "react";
import { filterByGenre, sorting } from "../../helpers";
import { Film } from "../../interfaces";
import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  selectedGenre: string;
  sortBy: string;
  onMovieItemClick(film: Film): void;
  movies: Film[];
  openModal(type: string, film: Film): void;
}

const FilmList: React.FC<FilmListProps> = ({
  movies,
  openModal,
  selectedGenre,
  sortBy,
  onMovieItemClick,
}) => {
  const filteredMoviesByGenre = useMemo(
    () => filterByGenre(movies, selectedGenre),
    [movies, selectedGenre]
  );

  const sortedMovies = useMemo(() => sorting(filteredMoviesByGenre, sortBy), [
    filteredMoviesByGenre,
    sortBy,
  ]);

  return (
    <>
      <div className="film-count">
        <h3>
          <span>{sortedMovies.length}</span> movies found
        </h3>
      </div>
      <div className={movies.length ? "film-list" : "film-list__none"}>
        {sortedMovies.length ? (
          sortedMovies.map((el) => {
            return (
              <FilmCard
                film={el}
                key={el.id}
                openModal={openModal}
                onMovieItemClick={onMovieItemClick}
              />
            );
          })
        ) : (
          <div>No movie found</div>
        )}
      </div>
    </>
  );
};

export default FilmList;
