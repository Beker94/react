import { SearchFilm } from "../SearchFilm";
import "./style.scss";

interface HeaderProps {
  onSearch(event: React.ChangeEvent<HTMLFormElement>): void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="header">
      <div className="header-nav">
        <h3>
          <span>netflix</span>roulette
        </h3>
        <button>+ ADD MOVIE</button>
      </div>

      <SearchFilm onSearch={onSearch} />
      <hr />
    </div>
  );
};

export default Header;
