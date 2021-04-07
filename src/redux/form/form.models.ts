import { Film } from "../../interfaces";

export interface FormState {
  film: Film | null;
  successSubmit: boolean;
  errors: ErrorFields[];
}

export interface ErrorFields {
  title?: string;
  release_date?: string;
  genres?: string;
  poster_path?: string;
  overview?: string;
  runtime?: string;
  vote_average?: string;
  tagline?: string;
  vote_count?: string;
  budget?: string;
  revenue?: string;
}
