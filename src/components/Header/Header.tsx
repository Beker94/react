import { CONSTANTS } from "../../constants";
import { SearchFilm } from "../SearchFilm";
import "./style.scss";

interface HeaderProps {
  onSearch(event: React.ChangeEvent<HTMLFormElement>): void;
  openModal(type: string, filmID: string): void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, openModal }) => {
  return (
    <div className="header">
      <div className="header-nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button onClick={openModal.bind(null, CONSTANTS.FORM_TYPE.ADD, "")}>
          + ADD MOVIE
        </button>
      </div>

      <SearchFilm onSearch={onSearch} />
      <hr />
    </div>
  );
};

export default Header;
