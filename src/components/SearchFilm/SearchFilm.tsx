import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchFilm } from "../../redux/filmList/actions/searchFilm.action";
import "./style.scss";

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();

  const onSearchFilm = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(searchFilm.request(event.target[0].value));
    },
    [dispatch]
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
