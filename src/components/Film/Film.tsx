import { FilmObj } from "../../interfaces";
import "./style.scss";

interface FilmProps {
  film: FilmObj;
}

const Film: React.FC<FilmProps> = ({ film }) => {
  let genres = "";
  film.genre.forEach((el) => {
    if (!genres) {
      genres = `${el}`;
      return;
    }

    genres = `${genres} , ${el}`;
  });

  return (
    <div className="film">
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg"
        width="375px"
        alt="film"
      />
      <div className="film-title">
        <span className="film-title__name">{film.name}</span>
        <span className="film-title__year">{film.year}</span>
      </div>
      <div className="film-genre">{genres}</div>
    </div>
  );
};

export default Film;
