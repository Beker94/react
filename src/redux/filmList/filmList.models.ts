
import { Film } from '../../interfaces';

export interface FilmsListState {
  films: Film[] | [];
  errors: string;
  loading: boolean;
  sortByDate: boolean
}
