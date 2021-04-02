import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultFilters } from "../../constants";
import { Film } from "../../interfaces";
import { fetchfilmsList } from "../../redux/filmList/actions/filmList.actions";
import { RootState } from "../../redux/rootStore";
import { allMoviesSelector } from "../../redux/selectors";
import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";

import "./style.scss";

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const films = useSelector<RootState, Film[]>(allMoviesSelector);

  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);

  const handleChangeGenre = (event: React.MouseEvent) => {
    const genreChanged = (event.target as HTMLInputElement).id;

    dispatch(
      fetchfilmsList.request({
        genre: genreChanged,
      })
    );
    setGenre(genreChanged);
  };

  const handlechangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingChanged = event.target.value;

    dispatch(
      fetchfilmsList.request({
        sortingType: sortingChanged,
      })
    );
  };

  const showMoreMovies = (event: React.MouseEvent) => {
    dispatch(fetchfilmsList.request({ offset: 0 }));
  };

  useEffect(() => {
    dispatch(fetchfilmsList.request({}));
  }, []);

  return (
    <div className="main">
      <FilterMoviesList
        onSortChange={handlechangeSort}
        onGenreChange={handleChangeGenre}
        selectedGenre={selectedGenre}
      />
      <FilmList films={films} showMoreMovies={showMoreMovies} />
    </div>
  );
};

export default Main;
