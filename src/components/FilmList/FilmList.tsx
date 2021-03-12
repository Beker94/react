import { useEffect, useState } from "react";
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
  const [moviesConfigs, setMoviesConfigs] = useState({
    movies: sorting(filterByGenre(movies, selectedGenre), sortBy),
    sort: selectedGenre,
    genre: sortBy,
  });

  useEffect(() => {
    setMoviesConfigs((prevState) => {
      if (prevState.genre !== selectedGenre) {
        return {
          ...prevState,
          genre: selectedGenre,
          movies: sorting(filterByGenre(movies, selectedGenre), sortBy),
        };
      }

      return {
        ...prevState,
        genre: selectedGenre,
        movies: sorting(prevState.movies, sortBy),
      };
    });
  }, [movies, selectedGenre, sortBy]);

  return (
    <>
      <div className="film-count">
        <h3>
          <span>{moviesConfigs.movies.length}</span> movies found
        </h3>
      </div>
      <div className={movies.length ? "film-list" : "film-list__none"}>
        {moviesConfigs.movies.length ? (
          moviesConfigs.movies.map((el) => {
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
