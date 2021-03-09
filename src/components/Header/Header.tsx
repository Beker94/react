import { useCallback } from "react";
import { FormType } from "../../constants";
import { SearchFilm } from "../SearchFilm";
import "./style.scss";

interface HeaderProps {
  onSearch(event: React.ChangeEvent<HTMLFormElement>): void;
  openModal(type: string, filmID: string): void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, openModal }) => {
  const openAddMovieModal = useCallback(() => {
    openModal(FormType.ADD, "");
  }, [openModal]);

  return (
    <div className="header">
      <div className="header-nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={openAddMovieModal}>+ ADD MOVIE</button>
      </div>

      <SearchFilm onSearch={onSearch} />
      <hr />
    </div>
  );
};

export default Header;
