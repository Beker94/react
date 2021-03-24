import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";

import "./style.scss";

const Main: React.FC = () => {
  return (
    <div className="main">
      <FilterMoviesList />
      <FilmList />
    </div>
  );
};

export default Main;
