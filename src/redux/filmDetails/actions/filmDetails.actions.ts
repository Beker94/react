import { action } from "typesafe-actions";

import { Film } from "../../../interfaces";

export const openFilmDetails = (film: Film) =>
  action("@filmDetails/OPEN_FILM_DETAILS", film);

export const closeFilmDetails = action("@filmDetails/CLOSE_FILM_DETAILS");
