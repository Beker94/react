import { Film } from "../../components/interfaces";

export interface FilmsListState {
  films: Film[] | [];
  error: string | ErrorEvent;
  loading: boolean;
  sortingType: string;
  genre: string;
  needReload: false;
  searchTitle: string;
  moviesCount: number;
  offset: number;
}

export interface FilmOptions {
  genre?: string;
  searchTitle?: string;
  offset?: number;
  sortingType?: string;
  limit?: number;
}
