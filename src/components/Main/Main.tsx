import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultFilters, FILM_LIMIT } from "../../constants";
import { useQuery } from "../../hooks/queryHook";
import { Film } from "../../interfaces";
import {
  changeGenre,
  changeSorting,
  fetchfilmsList,
  getMoreFilms,
  searchFilm,
} from "../../redux/filmList/actions/filmList.actions";
import { RootState } from "../../redux/rootStore";
import { allMoviesSelector, offsetSelector } from "../../redux/selectors";
import { FilmList } from "../FilmList";
import { FilterMoviesList } from "../FilterMoviesList";

import "./style.scss";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const films = useSelector<RootState, Film[]>(allMoviesSelector);
  const offset = useSelector<RootState, number>(offsetSelector);
  const searchedWord = query.get("search");
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);
  const [searchTitle, setSearchTitle] = useState("");

  if (searchedWord !== null && searchedWord !== searchTitle) {
    dispatch(
      searchFilm({
        payloadOptions: { searchTitle: searchedWord },
        shouldReload: true,
        shouldClear: true,
      })
    );
    setSearchTitle(searchedWord);
  }

  const handleChangeGenre = (event: React.MouseEvent) => {
    const genreChanged = (event.target as HTMLInputElement).id;
    dispatch(
      changeGenre({
        payloadOptions: { genre: genreChanged },
        shouldReload: true,
        shouldClear: true,
      })
    );

    setGenre(genreChanged);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingChanged = event.target.value;

    dispatch(
      changeSorting({
        payloadOptions: { sortingType: sortingChanged },
        shouldReload: true,
        shouldClear: true,
      })
    );
  };

  const showMoreMovies = () => {
    dispatch(getMoreFilms());
    dispatch(
      fetchfilmsList.request({
        payloadOptions: { offset: offset + FILM_LIMIT },
        shouldReload: true,
        shouldClear: false,
      })
    );
  };

  useEffect(() => {
    if (searchedWord === null) {
      dispatch(
        fetchfilmsList.request({
          payloadOptions: {},
          shouldReload: true,
          shouldClear: false,
        })
      );
    }
  }, []);

  return (
    <div className="main">
      <FilterMoviesList
        onSortChange={handleChangeSort}
        onGenreChange={handleChangeGenre}
        selectedGenre={selectedGenre}
      />
      <FilmList films={films} showMoreMovies={showMoreMovies} />
    </div>
  );
};

export default Main;
