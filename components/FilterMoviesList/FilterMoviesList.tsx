import { genreList } from "../../films";

interface FilterMoviesListProps {
  onSortChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  onGenreChange(event: React.MouseEvent): void;
  selectedGenre: string;
}

const FilterMoviesList: React.FC<FilterMoviesListProps> = ({
  onSortChange,
  onGenreChange,
  selectedGenre,
}) => {
  const genreListDom = genreList.map((el) => {
    return (
      <li id={el} className={selectedGenre === el ? "active" : ""} key={el}>
        {el}
      </li>
    );
  });

  return (
    <div className="filter-movies">
      <ul className="filter-movies__genre" onClick={onGenreChange}>
        {genreListDom}
      </ul>
      <div className="filter-movies__sort">
        <span>Sorted by</span>
        <select name="sort-type" onChange={onSortChange}>
          <option value="release_date">date</option>
          <option value="title">name</option>
        </select>
      </div>
    </div>
  );
};

export default FilterMoviesList;
