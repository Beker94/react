import { Film } from "../../interfaces";
import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  movies: Film[];
  openModal(type: string, filmID: string): void;
}

const FilmList: React.FC<FilmListProps> = ({ movies, openModal }) => {
  const filmsCards: any = movies.map((el) => {
    return <FilmCard film={el} key={el.id} openModal={openModal} />;
  });

  const noFilm = <div>No movie found</div>;
  return (
    <>
      <div className="film-count">
        <h3>
          <span>{movies.length}</span> movies found
        </h3>
      </div>
      <div className={movies.length ? "film-list" : "film-list__none"}>
        {movies.length ? filmsCards : noFilm}
      </div>
    </>
  );
};

export default FilmList;
