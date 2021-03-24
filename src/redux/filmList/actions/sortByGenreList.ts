import { createAsyncAction } from 'typesafe-actions';

import { Film } from '../../../interfaces';

export const fetchSortByGenreList = createAsyncAction('@sortByGenreList/FETCH_REQUEST', '@sortByGenreList/FETCH_SUCCESS', '@sortByGenreList/FETCH_ERROR')<
  string,
  Film[],
  string
>();



