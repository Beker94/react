import { Film } from "../../interfaces";
import "./style.scss";

interface FilmProps {
  film: Film;
}

// const arrToString =()=

const FilmCard: React.FC<FilmProps> = ({ film }) => {
  const genres = film.genre.join(" , ");

  return (
    <div className="film">
      <img src={film.src} alt={film.name} />
      <div className="film-title">
        <span className="film-title__name">{film.name}</span>
        <span className="film-title__year">{film.year}</span>
      </div>
      <div className="film-genre">{genres}</div>
    </div>
  );
};

export default FilmCard;
