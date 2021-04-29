import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearFromString } from "../../helpers";
import { Film } from "../../components/interfaces";

import { fetchFilm } from "../../redux/filmDetails/actions/filmDetails.actions";
import { RootState, SagaStore, wrapper } from "../../redux/rootStore";
import { openedFilmSelector } from "../../redux/selectors";

import { useRouter } from "next/router";
import { END } from "@redux-saga/core";
import { Main } from "../../components/Main";

interface MovieDetailsProps {
  id: string;
  ssrFilm?: Film;
  ssrLoading?: boolean;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ ssrFilm, ssrLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id === "string") {
      dispatch(fetchFilm.request(id));
    }
  }, [id, ssrFilm]);

  let film = useSelector<RootState, Film | null>(openedFilmSelector) || ssrFilm;

  const errorHandler = useCallback((event: any) => {
    if (event.type === "error") {
      event.target.src =
        "https://www.reelviews.net/resources/img/default_poster.jpg";
    }
  }, []);

  return (
    <>
      <div className="movie-details">
        <div className="movie-details__nav">
          <h3>
            <span>netflix</span>roulette
          </h3>
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            Search
          </button>
        </div>
        <div className="movie-details__main">
          {film ? (
            <>
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
                  <span className="description-rating">
                    {film!.vote_average}
                  </span>
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
      <Main ssrFilms={[]} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query, store, req, res }) => {
    if (typeof query.id === "string") {
      let film = store.getState().filmDescription.openedFilm;
      let loading = true;

      if (!store.getState().filmDescription.openedFilm) {
        store.dispatch(fetchFilm.request(query.id));
        store.dispatch(END);
        await (store as SagaStore).sagaTask.toPromise();
        film = store.getState().filmDescription.openedFilm;
        loading = false;
      }

      return {
        props: {
          ssrFilm: film,
          ssrLoading: loading,
        },
      };
    }
  }
);

export default MovieDetails;
