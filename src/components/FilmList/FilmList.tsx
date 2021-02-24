import "./style.scss";
import { films } from "../../films";
import { Film } from "../Film";
import { FilmObj } from "../../interfaces";
import ErrorBoundaries from "../ErrorBoundaries/ErrorBoundaries";

interface FilmListProps {
  genre: string;
  searchFilm: string;
  sort: string;
}

const FilmList: React.FC<FilmListProps> = ({ genre, searchFilm, sort }) => {
  const filmes: any = films
    .filter((el) => {
      if (genre === "All") {
        return true;
      }
      return el.genre.indexOf(genre) > -1;
    })
    .filter((el) => {
      if (searchFilm === "") {
        return true;
      }

      return el.name.toLowerCase().includes(searchFilm.toLowerCase());
    })
    .sort((a: FilmObj, b: FilmObj) => {
      if (sort === "name") {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else {
        return a.year - b.year;
      }
    })
    .map((el: FilmObj, index: number) => {
      return (
        <ErrorBoundaries>
          <Film film={el} key={index} />
        </ErrorBoundaries>
      );
    });
  const noFilm = <div>No movie found</div>;
  return (
    <div className={filmes.length ? "film-list" : "film-list__none"}>
      {filmes.length ? filmes : noFilm}
    </div>
  );
};

export default FilmList;
