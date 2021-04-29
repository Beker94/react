import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getSearchWord } from "../../helpers";
import { searchFilm } from "../../redux/filmList/actions/filmList.actions";

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const searchedWord = router.query.search;

  const [inputValue, setInputValue] = useState(searchedWord);

  const onSearchFilm = useCallback((event) => {
    event.preventDefault();
    const input = event.target[0].value;
    if (input) {
      router.push(`/search/${input}`);
    } else {
      dispatch(
        searchFilm({
          payloadOptions: { searchTitle: "" },
        })
      );
      router.push(`/`);
    }
  }, []);
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
          onChange={handleInput}
        />
        <button>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchFilm;
