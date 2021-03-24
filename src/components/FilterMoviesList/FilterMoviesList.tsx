import { useDispatch } from "react-redux";
import { fetchSortByGenreList } from "../../redux/filmList/actions/sortByGenreList";
import { genreList } from "../../films";
import "./style.scss";
import { useState } from "react";
import { DefaultFilters } from "../../constants";
import { chengeSorting } from "../../redux/filmList/actions/filmList.actions";

const FilterMoviesList: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedGenre, setGenre] = useState(DefaultFilters.defaultGenre);

  const onChangeGenre = (event: React.MouseEvent) => {
    dispatch(
      fetchSortByGenreList.request((event.target as HTMLInputElement).id)
    );
    setGenre((event.target as HTMLInputElement).id);
  };

  const chengeSort = () => {
    dispatch(chengeSorting);
  };

  const genreListDom = genreList.map((el) => {
    return (
      <li id={el} className={selectedGenre === el ? "active" : ""} key={el}>
        {el}
      </li>
    );
  });

  return (
    <div className="filter-movies">
      <ul className="filter-movies__genre" onClick={onChangeGenre}>
        {genreListDom}
      </ul>
      <div className="filter-movies__sort">
        <span>Sorted by</span>
        <select name="sort-type" onChange={chengeSort}>
          <option value="date">date</option>
          <option value="name">name</option>
        </select>
      </div>
    </div>
  );
};

export default FilterMoviesList;
