import { combineReducers } from "redux";
import { filmFilmDetailsReducer } from "./filmDetails/reducers/filmDetails.reducer";

import { filmListReducer } from "./filmList/reducers/filmList.reducer";
import { formReducer } from "./form/reducers/form.reducer";
import { modalReducer } from "./modal/reducers/modal.reducer";

export const rootReducer = combineReducers({
  films: filmListReducer,
  modal: modalReducer,
  filmDescription: filmFilmDetailsReducer,
  form: formReducer,
});
