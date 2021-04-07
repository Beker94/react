import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchfilmsList } from "../../redux/filmList/actions/filmList.actions";

import "./style.scss";

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();

  const onSearchFilm = useCallback((event) => {
    event.preventDefault();
    const input = event.target[0].value;

    dispatch(fetchfilmsList.request({ searchTitle: input }));
  }, []);

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
