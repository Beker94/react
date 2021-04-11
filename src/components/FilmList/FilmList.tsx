import { useSelector } from "react-redux";
import { Film } from "../../interfaces";
import { RootState } from "../../redux/rootStore";
import { moviesCountSelector } from "../../redux/selectors";

import { FilmCard } from "../FilmCard";

import "./style.scss";

interface FilmListProps {
  films: Film[];

  showMoreMovies(): void;
}

const FilmList: React.FC<FilmListProps> = ({ films, showMoreMovies }) => {
  const moviesCount = useSelector<RootState, number>(moviesCountSelector);

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
      {films.length < moviesCount ? (
        <div className="film-add" onClick={showMoreMovies}>
          More Movies
        </div>
      ) : (
        <div className="film-add">No More Movies</div>
      )}
    </>
  );
};

export default FilmList;
