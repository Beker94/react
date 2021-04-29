import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DefaultFilters, FILM_LIMIT } from "../../constants";

import { Film } from "../interfaces";
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
import { useRouter } from "next/router";

interface MainProps {
  ssrFilms: Film[];
}

const Main: React.FC<MainProps> = ({ ssrFilms }) => {
  const dispatch = useDispatch();
  let films = useSelector<RootState, Film[]>(allMoviesSelector) || ssrFilms;
  const offset = useSelector<RootState, number>(offsetSelector);
  const [serverFilms, setserverFilms] = useState(ssrFilms);

  const router = useRouter();

  const searchedWord = router.query.search?.toString() || "";
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);

  if (serverFilms.length) {
    films = serverFilms;
  }

  if (searchedWord !== searchTitle && ssrFilms.length) {
    dispatch(
      searchFilm({
        payloadOptions: { searchTitle: searchedWord },
      })
    );
    setSearchTitle(searchedWord);
    setserverFilms([]);
  }

  const handleChangeGenre = (event: React.MouseEvent) => {
    const genreChanged = (event.target as HTMLInputElement).id;
    dispatch(
      changeGenre({
        payloadOptions: { genre: genreChanged },
      })
    );

    setGenre(genreChanged);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingChanged = event.target.value;

    dispatch(
      changeSorting({
        payloadOptions: { sortingType: sortingChanged },
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
    dispatch(
      fetchfilmsList.request({
        payloadOptions: {},
      })
    );
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
