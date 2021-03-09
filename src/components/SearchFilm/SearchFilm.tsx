import "./style.scss";

interface SearchFilmProps {
  onSearch(event: React.ChangeEvent<HTMLFormElement>): void;
}

const SearchFilm: React.FC<SearchFilmProps> = ({ onSearch }) => {
  return (
    <div className="search">
      <h1>FIND YOUR MOVIE</h1>
      <form className="search-form" onSubmit={onSearch}>
        <input type="text" placeholder="What do you want to watch?" />
        <button>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchFilm;
