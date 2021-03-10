import { newMovie } from "./constants";
import { films } from "./films";
import { Film } from "./interfaces";

const filterByGenre = (movies: Film[], selectedGenre: string) => {
  if (selectedGenre === "All") {
    return movies;
  }

  return movies.filter((el: Film) => {
    for (let i = 0; i < el.genre.length; ) {
      if (el.genre[i].value === selectedGenre) {
        return true;
      } else {
        i++;
      }
    }
    return false;
  });
};

const filterByUserInput = (movies: Film[], searchFilm: string) => {
  return movies.filter((el) => {
    return el.title.toLowerCase().includes(searchFilm.toLowerCase());
  });
};

const sorting = (movies: Film[], sortBy: string) => {
  if (!sortBy) {
    return movies;
  }
  return movies.sort((a: Film, b: Film) => {
    if (sortBy === "name") {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else {
      return (
        new Date(a.releaseDate).getFullYear() -
        new Date(b.releaseDate).getFullYear()
      );
    }
  });
};

const finedFilm = (filmID: string) => {
  return (
    films.find((el: Film) => {
      return el.id === filmID;
    }) || newMovie
  );
};

export { sorting, filterByUserInput, filterByGenre, finedFilm };
