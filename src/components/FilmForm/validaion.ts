import * as Yup from "yup";

export const filmFormSchema = Yup.object().shape({
  title: Yup.string().required(),
  tagline: Yup.string().required(),
  release_date: Yup.string().required(),
  genres: Yup.array().min(1),
  poster_path: Yup.string().required().url("URL is invalid"),
  overview: Yup.string().required(),
  runtime: Yup.number().required().min(0, "Runtime too Small!").integer(),
  vote_average: Yup.number().required().min(0, "Vote averagetoo Small!"),
  vote_count: Yup.number().required().min(0, "Vote count too Small!").integer(),
  budget: Yup.number().required().min(0, "Budget too Small!").integer(),
  revenue: Yup.number().required().min(0, "Revenue too Small!").integer(),
});
