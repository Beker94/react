import { Film } from "../../interfaces";

export interface FormState {
  film: Film | null;
}

export interface FormPayload {
  film: Film;
  genre: string;
}
