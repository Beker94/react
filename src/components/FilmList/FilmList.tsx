import { useDispatch } from "react-redux";
import { Film } from "../../interfaces";
import { getMoreFilms } from "../../redux/filmList/actions/filmList.actions";

import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  films: Film[];
}

const FilmList: React.FC<FilmListProps> = ({ films }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="film-count">
        <h3>
          <span>{films.length}</span> films found
        </h3>
      </div>
      <div className={films.length ? "film-list" : "film-list__none"}>
        {films.length ? (
          films.map((el: any) => {
            return <FilmCard film={el} key={el.id} />;
          })
        ) : (
          <div>No movie found</div>
        )}
      </div>
      {films.length ? (
        <div className="film-add" onClick={() => dispatch(getMoreFilms())}>
          More Movies
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FilmList;
