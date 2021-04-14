import { FormFieldsName } from "./constants";
import { Film, Genre } from "./interfaces";

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

const getKeyValue = function <T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
};

const getYearFromString = (string: string) => {
  const [year] = string.split("-");

  return year;
};

const stringToObject = (genres: string[]) => {
  return genres.map((el: string) => {
    return { value: el, label: el };
  });
};

const objectToString = (genres: Genre[]) => {
  const app = genres.map((el: Genre) => {
    return el.value;
  });
  return app;
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

const getErrors = (arr: string[]) => {
  const errors: any = {};
  arr.forEach((el: string, index: number) => {
    for (let key in FormFieldsName) {
      if (el.includes(key)) {
        const value = el.replace(
          key,
          FormFieldsName[key as keyof typeof FormFieldsName]
        );
        errors[key] = value;
      }
    }
  });

  return errors;
};

const sorting = (movies: Film[], sortingType: string) => {
  return movies.sort((a: Film, b: Film) => {
    if (sortingType === "release_date") {
      return (
        new Date(getYearFromString(a.release_date)).getFullYear() -
        new Date(getYearFromString(b.release_date)).getFullYear()
      );
    } else {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
  });
};

const filterByUserInput = (movies: Film[], searchFilm: string) => {
  return movies.filter((el) => {
    return el.title.toLowerCase().includes(searchFilm.toLowerCase());
  });
};

const getSearchWord = (url: string) => {
  const index = url.lastIndexOf("/") + 1;
  return url.slice(index, url.length);
};

export {
  filterByUserInput,
  filterByGenre,
  dateFormatter,
  getYearFromString,
  objectToString,
  stringToObject,
  sorting,
  getKeyValue,
  getErrors,
  getSearchWord,
};
