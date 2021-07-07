import { action, createCustomAction } from "typesafe-actions";
import { Film } from "../../../components/interfaces";

export const openDeleteForm = (film: Film) =>
  action("@modal/OPEN_DELETE_FORM", film);
export const openEditForm = (film: Film) =>
  action("@modal/OPEN_EDIT_FORM", film);
export const openAddForm = createCustomAction("@modal/OPEN_ADD_FORM");

export const closeForm = createCustomAction("@modal/CLOSE_FORM");
