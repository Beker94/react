import { Film } from "../../interfaces";

export interface FilmsListState {
  films: Film[] | [];
  error: string | ErrorEvent;
  loading: boolean;
  sortingType: string;
  genre: string;
  needReload: false;
  searchTitle: string;
}

export interface FilmOptions {
  genre: string;
  searchTitle: string;
}
