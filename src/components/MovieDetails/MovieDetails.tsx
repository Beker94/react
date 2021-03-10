import { useEffect, useRef, useState } from "react";
import { finedFilm } from "../../helpers";
import { Film } from "../../interfaces";
import "./style.scss";

interface MovieDetailsProps {
  closeFilm(): void;
  filmID: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ closeFilm, filmID }) => {
  const [movie, setMovie] = useState<Film>(finedFilm(filmID));

  const openedFilm = useRef(filmID);

  useEffect(() => {
    if (openedFilm.current !== filmID) {
      setMovie(finedFilm(filmID));
    }
  }, [filmID]);

  return (
    <div className="movie-details">
      <div className="movie-details__nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={closeFilm}>Search</button>
      </div>
      <div className="movie-details__main">
        <img src={movie.movieURL} alt={movie.title} />
        <div className="description">
          <div className="description-header">
            <span className="description-title">
              {movie.title.toUpperCase()}
            </span>
            <span className="description-rating">{movie.rating}</span>
          </div>
          <div className="description-times">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="description-plot">{movie.overviev}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
