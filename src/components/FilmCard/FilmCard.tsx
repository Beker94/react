import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getYearFromString } from "../../helpers";
import { Film } from "../../interfaces";
import { openFilmDetails } from "../../redux/filmDetails/actions/filmDetails.actions";
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

  const filmEdit = useCallback(() => {
    dispatch(openEditForm(film));
  }, [film, dispatch]);

  const openFilmInHeader = useCallback(() => {
    dispatch(openFilmDetails(film));
    window.scrollTo(0, 0);
  }, [film, dispatch]);

  const filmDelete = useCallback(() => {
    dispatch(openDeleteForm(film));
  }, [film, dispatch]);

  const editButton = (
    <div className="film-edit__button" onClick={openClosePopup}></div>
  );

  const list = (
    <div className="film-edit__options">
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
        <img
          src={film.poster_path}
          alt={film.title}
          onError={(e: any) => {
            if (e.type === "error") {
              e.target.src =
                "https://www.reelviews.net/resources/img/default_poster.jpg";
            }
          }}
        />
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
