import { Film } from "./interfaces";

const dateFormatter = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

  return `${year}-${month}-${day}`;
};

const getYearFromString = (string: string) => {
  const [year] = string.split("-");

  return year;
};

const filterByGenre = (movies: Film[], selectedGenre: string) => {
  if (selectedGenre === "All") {
    return movies;
  }

  return movies.filter((el: Film) => {
    for (let i = 0; i < el.genres.length; i++) {
      if (el.genres[i] === selectedGenre) {
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
  return movies.sort((a: Film, b: Film) => {
    if (!sortBy) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else {
      return (
        new Date(getYearFromString(a.release_date)).getFullYear() -
        new Date(getYearFromString(b.release_date)).getFullYear()
      );
    }
  });
};

export {
  sorting,
  filterByUserInput,
  filterByGenre,
  dateFormatter,
  getYearFromString,
};
