import { Film } from "./interfaces";

const filterByGenre = (movies: Film[], selectedGenre: string) => {
  if (selectedGenre === "All") {
    return movies;
  }

  return movies.filter((el: Film) => {
    for (let i = 0; i < el.genre.length; i++) {
      if (el.genre[i].value === selectedGenre) {
        return true;
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
      return a.releaseDate.getFullYear() - b.releaseDate.getFullYear();
    }
  });
};

export { sorting, filterByUserInput, filterByGenre };
