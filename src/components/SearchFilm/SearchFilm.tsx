import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/queryHook";
import { searchFilm } from "../../redux/filmList/actions/filmList.actions";

import "./style.scss";

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const searchedWord = query.get("search") || "";

  const [inputValue, setInputValue] = useState(searchedWord);

  const onSearchFilm = useCallback(
    (event) => {
      event.preventDefault();
      const input = event.target[0].value;
      if (input) {
        history.push(`/movies/search/?search=${input}`);
      } else {
        dispatch(
          searchFilm({
            payloadOptions: { searchTitle: "" },
          })
        );
        history.push(`/movies`);
      }
    },
    [history]
  );
  const handleInput = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  return (
    <div className="search">
      <h1>FIND YOUR MOVIE</h1>
      <form className="search-form" onSubmit={onSearchFilm}>
        <input
          type="text"
          placeholder="What do you want to watch?"
          value={inputValue}
          onInput={handleInput}
        />
        <button>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchFilm;
