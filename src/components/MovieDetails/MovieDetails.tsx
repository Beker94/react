import { getYearFromString } from "../../helpers";
import { Film } from "../../interfaces";
import "./style.scss";

interface MovieDetailsProps {
  closeFilm(): void;
  film: Film;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ closeFilm, film }) => {
  return (
    <div className="movie-details">
      <div className="movie-details__nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={closeFilm}>Search</button>
      </div>
      <div className="movie-details__main">
        <img src={film.movieURL} alt={film.title} />
        <div className="description">
          <div className="description-header">
            <span className="description-title">
              {film.title.toUpperCase()}
            </span>
            <span className="description-rating">{film.rating}</span>
          </div>
          <div className="description-times">
            <span>
              {new Date(getYearFromString(film.releaseDate)).getFullYear()}
            </span>
            <span>{film.runtime} min</span>
          </div>
          <p className="description-plot">{film.overviev}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
