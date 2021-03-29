import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultFilters } from "../../constants";
import { Film } from "../../interfaces";
import {
  changeGenre,
  changeSorting,
  clearfilmsList,
  fetchfilmsList,
} from "../../redux/filmList/actions/filmList.actions";
import { RootState } from "../../redux/rootStore";
import {
  allMoviesSelector,
  genreSelector,
  sortingTypeSelector,
} from "../../redux/selectors";
import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";

import "./style.scss";

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const films: Film[] = useSelector<RootState, Film[]>(allMoviesSelector);

  const sortingType: string = useSelector<RootState, string>(
    sortingTypeSelector
  );

  const genre: string = useSelector<RootState, string>(genreSelector);

  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);

  const handleChangeGenre = (event: React.MouseEvent) => {
    const genre = (event.target as HTMLInputElement).id;

    dispatch(changeGenre(genre));
    setGenre(genre);
  };

  const handlechangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSorting(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchfilmsList.request(genre));
    return () => {
      dispatch(clearfilmsList());
    };
  }, [genre]);

  return (
    <div className="main">
      <FilterMoviesList
        onSortChange={handlechangeSort}
        onGenreChange={handleChangeGenre}
        selectedGenre={selectedGenre}
      />
      <FilmList films={films} sortingType={sortingType} />
    </div>
  );
};

export default Main;
