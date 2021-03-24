import { createAsyncAction, action } from 'typesafe-actions';

import { Film } from '../../../interfaces';

export const fetchfilmsList = createAsyncAction('@filmList/FETCH_REQUEST', '@filmList/FETCH_SUCCESS', '@filmList/FETCH_ERROR')<
  undefined,
  Film[],
  string
>();

export const chengeSorting = action('@filmList/CHENGE_SORTING');

export const clearfilmsList = action('@filmList/CLEAR_FILM_LIST');

