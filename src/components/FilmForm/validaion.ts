import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  title: Yup.string().required(),
  tagline: Yup.string().required(),
  release_date: Yup.string().required(),
  genres: Yup.array().required(),
  poster_path: Yup.string().required().url(),
  overview: Yup.string().required(),
  runtime: Yup.number().required().min(0, "Too Short!").integer(),
  vote_average: Yup.number().required().min(0, "Too Short!"),
  vote_count: Yup.number().required().min(0, "Too Short!").integer(),
  budget: Yup.number().required().min(0, "Too Short!").integer(),
  revenue: Yup.number().required().min(0, "Too Short!").integer(),
});
