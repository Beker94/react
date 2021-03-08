import { useCallback, useState } from "react";
import { FormType } from "../../constants";
import { Film, Genre } from "../../interfaces";
import "./style.scss";

interface FilmProps {
  film: Film;
  openModal(type: string, filmID: string): void;
}

const FilmCard: React.FC<FilmProps> = ({ film, openModal }) => {
  const [filmSettings, showFilmSettings] = useState(false);
  const genres = film.genre
    .map((el: Genre) => {
      return el.value;
    })
    .join(" , ");

  const openClosePopup = useCallback(() => {
    showFilmSettings(!filmSettings);
  }, [showFilmSettings, filmSettings]);

  const filmEdit = useCallback(() => {
    openModal(FormType.EDIT, film.id);
    showFilmSettings(false);
  }, [openModal, showFilmSettings, film.id]);

  const filmDelete = useCallback(() => {
    openModal(FormType.DELETE, film.id);
    showFilmSettings(false);
  }, [openModal, showFilmSettings, film.id]);

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
    <div className="film">
      {filmSettings ? list : editButton}
      <img src={film.movieURL} alt={film.title} />
      <div className="film-title">
        <span className="film-title__name">{film.title}</span>
        <span className="film-title__year">
          {film.releaseDate.getFullYear()}
        </span>
      </div>
      <div className="film-genre">{genres}</div>
    </div>
  );
};

export default FilmCard;
