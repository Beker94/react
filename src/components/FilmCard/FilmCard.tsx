import { useState } from "react";
import { Film } from "../../interfaces";
import { CONSTANTS } from "../../constants";
import "./style.scss";

interface FilmProps {
  film: Film;
  openModal(type: string, filmID: string): void;
}

const FilmCard: React.FC<FilmProps> = ({ film, openModal }) => {
  const [editList, openEditList] = useState(false);
  const genres = film.genre
    .map((el: any) => {
      return el.value;
    })
    .join(" , ");

  function filmEdit(type = "", filmID: string) {
    openModal(type, filmID);
    openEditList(false);
  }

  const editButton = (
    <div className="film-edit__button" onClick={() => openEditList(true)}></div>
  );

  const list = (
    <div className="film-edit__options">
      <span className="close" onClick={() => openEditList(false)}></span>
      <ul>
        <li onClick={filmEdit.bind(this, CONSTANTS.FORM_TYPE.EDIT, film.id)}>
          Edit
        </li>
        <li onClick={filmEdit.bind(this, CONSTANTS.FORM_TYPE.DELETE, film.id)}>
          Delete
        </li>
      </ul>
    </div>
  );

  return (
    <div className="film">
      {editList ? list : editButton}
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
