import { Film } from "../../components/interfaces";

export interface FilmDetailState {
  openedFilm: Film | null;
  loading: boolean;
}
