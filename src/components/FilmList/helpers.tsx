import { films } from "../../films";
import { FilmCard } from "../FilmCard";
import { Film } from "../../interfaces";

const filterByGenre = (movies: Array<Film>, selectedGenre: string) => {
  return movies.filter((el) => {
    return el.genre.indexOf(selectedGenre) > -1;
  });
};

const finedSerchedFilm = (movies: Array<Film>, searchFilm: string) => {
  return movies.filter((el) => {
    return el.name.toLowerCase().includes(searchFilm.toLowerCase());
  });
};

const sorting = (movies: Array<Film>, sortBy: string) => {
  return movies.sort((a: Film, b: Film) => {
    if (sortBy === "name") {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    } else {
      return a.year - b.year;
    }
  });
};

const renderFilms = (
  selectedGenre: string,
  searchFilm: string,
  sortBy: string
) => {
  let movies: any =
    selectedGenre !== "All" ? filterByGenre(films, selectedGenre) : films;

  if (searchFilm) {
    movies = finedSerchedFilm(movies, searchFilm);
  }

  return sorting(movies, sortBy).map((el: Film, index: number) => {
    return <FilmCard film={el} key={el.id} />;
  });
};

export { renderFilms };
