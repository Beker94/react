import { useCallback, useState } from "react";
import { FormType } from "../../constants";
import { Film, Genre } from "../../interfaces";
import "./style.scss";

interface FilmProps {
  film: Film;
  openModal(type: string, filmID: string): void;
  setOpenedFilmId(filmID: string): void;
}

const FilmCard: React.FC<FilmProps> = ({
  film,
  openModal,
  setOpenedFilmId,
}) => {
  const [filmSettings, showFilmSettings] = useState(false);
  const genres = film.genre
    .map((el: Genre) => {
      return el.value;
    })
    .join(" , ");

  const openClosePopup = useCallback(
    (event) => {
      event.stopPropagation();
      showFilmSettings(!filmSettings);
    },
    [showFilmSettings, filmSettings]
  );

  const filmEdit = useCallback(() => {
    openModal(FormType.EDIT, film.id);
    showFilmSettings(false);
  }, [openModal, showFilmSettings, film.id]);

  const filmDelete = useCallback(() => {
    openModal(FormType.DELETE, film.id);
    showFilmSettings(false);
  }, [openModal, showFilmSettings, film.id]);

  const changeOpenFilm = useCallback(() => {
    setOpenedFilmId(film.id);
  }, [film, setOpenedFilmId]);

  const editButton = (
    <div className="film-edit__button" onClick={openClosePopup}></div>
  );

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const list = (
    <div className="film-edit__options" onClick={stopPropagation}>
      <span className="close" onClick={openClosePopup}></span>
      <ul>
        <li onClick={filmEdit}>Edit</li>
        <li onClick={filmDelete}>Delete</li>
      </ul>
    </div>
  );

  return (
    <div className="film" onClick={changeOpenFilm}>
      {filmSettings ? list : editButton}
      <img src={film.movieURL} alt={film.title} />
      <div className="film-title">
        <span className="film-title__name">{film.title}</span>
        <span className="film-title__year">
          {new Date(film.releaseDate).getFullYear()}
        </span>
      </div>
      <div className="film-genre">{genres}</div>
    </div>
  );
};

export default FilmCard;
