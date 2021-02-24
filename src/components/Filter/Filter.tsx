import { ChangeEvent } from "react";
import "./style.scss";

interface FilterProps {
  genre: String;
  genreList: Array<object>;
  chengeGenre(e: React.MouseEvent): void;
  chengeSort(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const Filter: React.FC<FilterProps> = ({
  genre,
  genreList,
  chengeGenre,
  chengeSort,
}) => {
  const genreListDom = genreList.map((el: any, index: number) => {
    return (
      <li id={el.id} className={genre === el.id ? "active" : ""} key={el.id}>
        {el.genre}
      </li>
    );
  });
  return (
    <div className="filter">
      <ul className="filter-genre" onClick={chengeGenre}>
        {genreListDom}
      </ul>
      <div className="filter-sort">
        <span>Sorted by</span>
        <select name="sort-type" onChange={chengeSort}>
          <option value="date">date</option>
          <option value="name">name</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
