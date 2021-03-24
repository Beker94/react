import { action } from "typesafe-actions";
import { Film } from "../../../interfaces";

export const openDeleteForm = (film: Film) =>
  action("@modal/OPEN_DELETE_FORM", film);
export const openEditForm = (film: Film) =>
  action("@modal/OPEN_EDIT_FORM", film);
export const openAddForm = action("@modal/OPEN_ADD_FORM");

export const closeForm = action("@modal/CLOSE_FORM");
