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
  offsetSelector,
  searchedFilmSelector,
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
  const searchTitle: string = useSelector<RootState, string>(
    searchedFilmSelector
  );
  const offset: number = useSelector<RootState, number>(offsetSelector);

  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);

  const handleChangeGenre = (event: React.MouseEvent) => {
    const genreChenged = (event.target as HTMLInputElement).id;
    if (genre !== genreChenged) {
      dispatch(clearfilmsList());
      dispatch(changeGenre(genreChenged));
      setGenre(genreChenged);
    }
  };

  const handlechangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== sortingType) {
      dispatch(clearfilmsList());
      dispatch(changeSorting(event.target.value));
    }
  };

  useEffect(() => {
    dispatch(
      fetchfilmsList.request({
        genre: genre,
        searchTitle: searchTitle,
        offset: offset,
        sortingType: sortingType,
      })
    );
  }, [genre, searchTitle, offset, sortingType]);

  return (
    <div className="main">
      <FilterMoviesList
        onSortChange={handlechangeSort}
        onGenreChange={handleChangeGenre}
        selectedGenre={selectedGenre}
      />
      <FilmList films={films} />
    </div>
  );
};

export default Main;
