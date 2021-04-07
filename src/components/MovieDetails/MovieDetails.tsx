import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getYearFromString } from "../../helpers";
import { Film } from "../../interfaces";
import { closeFilmDetails } from "../../redux/filmDetails/actions/filmDetails.actions";
import "./style.scss";

interface MovieDetailsProps {
  film: Film;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ film }) => {
  const dispatch = useDispatch();

  const errorHandler = useCallback((event: any) => {
    if (event.type === "error") {
      event.target.src =
        "https://www.reelviews.net/resources/img/default_poster.jpg";
    }
  }, []);

  return (
    <div className="movie-details">
      <div className="movie-details__nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={() => dispatch(closeFilmDetails())}>Search</button>
      </div>
      <div className="movie-details__main">
        <img src={film.poster_path} alt={film.title} onError={errorHandler} />
        <div className="description">
          <div className="description-header">
            <span className="description-title">
              {film.title.toUpperCase()}
            </span>
            <span className="description-rating">{film.vote_average}</span>
          </div>
          <div className="description-times">
            <span>
              {new Date(getYearFromString(film.release_date)).getFullYear()}
            </span>
            <span>{film.runtime} min</span>
          </div>
          <p className="description-plot">{film.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
