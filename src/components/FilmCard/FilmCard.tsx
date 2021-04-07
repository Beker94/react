import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getYearFromString } from "../../helpers";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { Film } from "../../interfaces";
import {
  openDeleteForm,
  openEditForm,
} from "../../redux/modal/actions/modal.actions";

import "./style.scss";

interface FilmProps {
  film: Film;
}

const FilmCard: React.FC<FilmProps> = ({ film }) => {
  const [showFilmSettings, setShowFilmSettings] = useState(false);
  const wrapperRef = useRef(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const genres = film.genres
    .map((el) => {
      return el;
    })
    .join(" , ");

  const openClosePopup = useCallback(
    (event) => {
      event.stopPropagation();
      setShowFilmSettings(!showFilmSettings);
    },
    [showFilmSettings]
  );
  useOutsideClickHook(wrapperRef, () => setShowFilmSettings(!showFilmSettings));

  const filmEdit = useCallback(() => {
    dispatch(openEditForm(film));
  }, [film]);

  const openFilmInHeader = useCallback(() => {
    history.push(`/movie/${film.id}`);
    window.scrollTo(0, 0);
  }, [film]);

  const filmDelete = useCallback(() => {
    dispatch(openDeleteForm(film));
  }, [film]);

  const errorHandler = useCallback((event: any) => {
    if (event.type === "error") {
      event.target.src =
        "https://www.reelviews.net/resources/img/default_poster.jpg";
    }
  }, []);

  const editButton = (
    <div className="film-edit__button" onClick={openClosePopup}></div>
  );

  const list = (
    <div className="film-edit__options" ref={wrapperRef}>
      <span className="close" onClick={openClosePopup}></span>
      <ul>
        <li onClick={filmEdit}>Edit</li>
        <li onClick={filmDelete}>Delete</li>
      </ul>
    </div>
  );

  return (
    <div className="film-wrapper">
      {showFilmSettings ? list : editButton}
      <div className="film" onClick={openFilmInHeader}>
        <img src={film.poster_path} alt={film.title} onError={errorHandler} />
        <div className="film-title">
          <span className="film-title__name">{film.title}</span>
          <span className="film-title__year">
            {new Date(getYearFromString(film.release_date)).getFullYear()}
          </span>
        </div>
        <div className="film-genre">{genres}</div>
      </div>
    </div>
  );
};

export default FilmCard;
