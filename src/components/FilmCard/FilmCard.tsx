import { useCallback, useState } from "react";
import { FormType } from "../../constants";
import { getYearFromString } from "../../helpers";
import { Film, Genre } from "../../interfaces";
import "./style.scss";

interface FilmProps {
  film: Film;
  openModal(type: string, film: Film): void;
  onMovieItemClick(film: Film): void;
}

const FilmCard: React.FC<FilmProps> = ({
  film,
  openModal,
  onMovieItemClick,
}) => {
  const [showFilmSettings, setShowFilmSettings] = useState(false);
  const genres = film.genre
    .map((el: Genre) => {
      return el.value;
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
    openModal(FormType.EDIT, film);
    setShowFilmSettings(false);
  }, [openModal, film]);

  const filmDelete = useCallback(() => {
    openModal(FormType.DELETE, film);
    setShowFilmSettings(false);
  }, [openModal, film]);

  const changeOpenFilm = useCallback(() => {
    onMovieItemClick(film);
  }, [film, onMovieItemClick]);

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
      <div className="film" onClick={changeOpenFilm}>
        <img src={film.movieURL} alt={film.title} />
        <div className="film-title">
          <span className="film-title__name">{film.title}</span>
          <span className="film-title__year">
            {new Date(getYearFromString(film.releaseDate)).getFullYear()}
          </span>
        </div>
        <div className="film-genre">{genres}</div>
      </div>
    </div>
  );
};

export default FilmCard;
