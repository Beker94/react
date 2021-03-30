import { sorting } from "../../helpers";
import { Film } from "../../interfaces";

import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  films: Film[];
  sortingType: string;
}

const FilmList: React.FC<FilmListProps> = ({ films, sortingType }) => {
  return (
    <>
      <div className="film-count">
        <h3>
          <span>{films.length}</span> films found
        </h3>
      </div>
      <div className={films.length ? "film-list" : "film-list__none"}>
        {films.length ? (
          sorting(films, sortingType).map((el: any) => {
            return <FilmCard film={el} key={el.id} />;
          })
        ) : (
          <div>No movie found</div>
        )}
      </div>
    </>
  );
};

export default FilmList;
