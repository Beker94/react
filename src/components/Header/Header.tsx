import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openAddForm } from "../../redux/modal/actions/modal.actions";

import { SearchFilm } from "../SearchFilm";
import "./style.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const openAddMovieModal = useCallback(() => {
    dispatch(openAddForm());
  }, [dispatch]);

  return (
    <div className="header">
      <div className="header-nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={openAddMovieModal}>+ ADD MOVIE</button>
      </div>

      <SearchFilm />
      <hr />
    </div>
  );
};

export default Header;
