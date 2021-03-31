import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearfilmsList,
  searchFilm,
} from "../../redux/filmList/actions/filmList.actions";

import "./style.scss";

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();

  const [searchedInput, setSearchedInput] = useState("");

  const onSearchFilm = useCallback(
    (event) => {
      event.preventDefault();
      const input = event.target[0].value;

      if (searchedInput !== input) {
        setSearchedInput(input);
        dispatch(clearfilmsList());
        dispatch(searchFilm(input));
      }
    },
    [searchedInput]
  );

  return (
    <div className="search">
      <h1>FIND YOUR MOVIE</h1>
      <form className="search-form" onSubmit={onSearchFilm}>
        <input type="text" placeholder="What do you want to watch?" />
        <button>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchFilm;
