import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getYearFromString } from "../../helpers";
import { Film } from "../interfaces";

import { fetchFilm } from "../../redux/filmDetails/actions/filmDetails.actions";
import { RootState } from "../../redux/rootStore";
import { loadingSelector, openedFilmSelector } from "../../redux/selectors";

import "./style.scss";

interface Parameters {
  id: string;
}

const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams<Parameters>();

  useEffect(() => {
    dispatch(fetchFilm.request(id));
  }, [id]);

  const film = useSelector<RootState, Film | null>(openedFilmSelector);
  const loading = useSelector<RootState, boolean>(loadingSelector);

  const errorHandler = useCallback((event: any) => {
    if (event.type === "error") {
      event.target.src =
        "https://www.reelviews.net/resources/img/default_poster.jpg";
    }
  }, []);

  if (!film && !loading) {
    history.push("/notfoundpage");
  }

  return (
    <div className="movie-details">
      <div className="movie-details__nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Search
        </button>
      </div>
      <div className="movie-details__main">
        {loading ? (
          <h1>LOADING...</h1>
        ) : film ? (
          <>
            {" "}
            <img
              src={film!.poster_path}
              alt={film!.title}
              onError={errorHandler}
            />
            <div className="description">
              <div className="description-header">
                <span className="description-title">
                  {film!.title.toUpperCase()}
                </span>
                <span className="description-rating">{film!.vote_average}</span>
              </div>
              <div className="description-times">
                <span>
                  {new Date(
                    getYearFromString(film!.release_date)
                  ).getFullYear()}
                </span>
                <span>{film!.runtime} min</span>
              </div>
              <p className="description-plot">{film!.overview}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
