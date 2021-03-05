import { Genre } from "../../interfaces";
import "./style.scss";

interface FilterMoviesListProps {
  selectedGenre: String;
  genreList: Array<Genre>;
  onChangeGenre(event: React.MouseEvent): void;
  chengeSort(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const FilterMoviesList: React.FC<FilterMoviesListProps> = ({
  selectedGenre,
  genreList,
  onChangeGenre,
  chengeSort,
}) => {
  const genreListDom = genreList.map((el: Genre) => {
    return (
      <li
        id={el.value}
        className={selectedGenre === el.value ? "active" : ""}
        key={el.value}
      >
        {el.value}
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
