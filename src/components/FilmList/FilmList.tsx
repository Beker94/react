import { useEffect, useState } from "react";
import { filterByGenre, sorting } from "../../helpers";
import { Film } from "../../interfaces";
import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  selectedGenre: string;
  sortBy: string;
  setOpenedFilmId(filmID: string): void;
  movies: Film[];
  openModal(type: string, filmID: string): void;
}

const FilmList: React.FC<FilmListProps> = ({
  movies,
  openModal,
  selectedGenre,
  sortBy,
  setOpenedFilmId,
}) => {
  const [moviesConfigs, setMoviesConfigs] = useState(movies);

  useEffect(() => {
    setMoviesConfigs((prevState) => {
      return [...sorting(prevState, sortBy)];
    });
  }, [sortBy]);

  useEffect(() => {
    setMoviesConfigs(filterByGenre(movies, selectedGenre));
  }, [movies, selectedGenre]);

  const noFilm = <div>No movie found</div>;
  return (
    <>
      <div className="film-count">
        <h3>
          <span>{moviesConfigs.length}</span> movies found
        </h3>
      </div>
      <div className={movies.length ? "film-list" : "film-list__none"}>
        {moviesConfigs.length
          ? moviesConfigs.map((el) => {
              return (
                <FilmCard
                  film={el}
                  key={el.id}
                  openModal={openModal}
                  setOpenedFilmId={setOpenedFilmId}
                />
              );
            })
          : noFilm}
      </div>
    </>
  );
};

export default FilmList;
