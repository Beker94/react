import "./style.scss";
import { useFormik } from "formik";
import { Film } from "../../interfaces";
import Select from "react-select";
import { FormType, Genres, Formfields } from "../../constants";
import { selectStyle } from "./selectConfig";
import { useRef } from "react";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { closeForm } from "../../redux/modal/actions/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  formAddFilm,
  formEditFilm,
} from "../../redux/form/actions/form.actions";
import { RootState } from "../../redux/rootStore";
import {
  genreSelector,
  offsetSelector,
  searchedFilmSelector,
  sortingTypeSelector,
} from "../../redux/selectors";
import { objectToString, stringToObject } from "../../helpers";
import { clearfilmsList } from "../../redux/filmList/actions/filmList.actions";
import { SignupSchema } from "./validaion";

interface FormProps {
  film: Film;
  modalType: string | null;
}

const FilmForm: React.FC<FormProps> = ({ film, modalType }) => {
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => dispatch(closeForm()));

  const genre: string = useSelector<RootState, string>(genreSelector);
  const searchTitle: string = useSelector<RootState, string>(
    searchedFilmSelector
  );
  const offset: number = useSelector<RootState, number>(offsetSelector);
  const sortingType: string = useSelector<RootState, string>(
    sortingTypeSelector
  );

  const formik = useFormik({
    initialValues: { ...film, genres: stringToObject(film.genres) },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(clearfilmsList());
      if (modalType === FormType.EDIT) {
        dispatch(
          formEditFilm.request({
            film: {
              ...values,
              genres: objectToString(values.genres),
            },
            genre,
            searchTitle,
            offset,
            sortingType,
          })
        );
      } else {
        delete values.id;
        dispatch(
          formAddFilm.request({
            film: { ...values, genres: objectToString(values.genres) },
            genre,
            searchTitle,
            offset,
            sortingType,
          })
        );
      }
      dispatch(closeForm());
    },
    onReset: (values) => {
      values = { ...film, genres: stringToObject(film.genres) };
    },
  });

  return (
    <form
      className="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      ref={wrapperRef}
    >
      <div className="form-header">
        <h3>{modalType?.toUpperCase()} MOVIE</h3>
        <div className="close" onClick={() => dispatch(closeForm())}></div>
      </div>
      <label htmlFor={Formfields.title} className="first">
        TITLE
      </label>
      {formik.errors.title ? (
        <div className="error">{formik.errors.title}</div>
      ) : null}
      <input
        id={Formfields.title}
        name={Formfields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor={Formfields.tagline}>TAGLINE</label>
      {formik.errors.tagline ? (
        <div className="error">{formik.errors.tagline}</div>
      ) : null}
      <input
        id={Formfields.tagline}
        name={Formfields.tagline}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.tagline}
      />
      <label htmlFor={Formfields.release_date}>RELEASE DATE</label>
      {formik.errors.release_date ? (
        <div className="error">{formik.errors.release_date}</div>
      ) : null}
      <input
        id={Formfields.release_date}
        name={Formfields.release_date}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.release_date}
      />
      <label htmlFor={Formfields.poster_path}>MOVIE URL</label>
      {formik.errors.poster_path ? (
        <div className="error">{formik.errors.poster_path}</div>
      ) : null}
      <input
        id={Formfields.poster_path}
        name={Formfields.poster_path}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.poster_path}
      />
      <label htmlFor={Formfields.genres}>GENRE</label>
      {formik.errors.genres ? (
        <div className="error">{formik.errors.genres}</div>
      ) : null}
      <Select
        className="select"
        options={Genres}
        isMulti={true}
        value={formik.values.genres}
        onChange={(value: any) => {
          return formik.setFieldValue("genres", value);
        }}
        styles={selectStyle}
      />
      <label htmlFor={Formfields.overview}>OVERVIEW</label>
      {formik.errors.overview ? (
        <div className="error">{formik.errors.overview}</div>
      ) : null}
      <input
        id={Formfields.overview}
        name={Formfields.overview}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overview}
      />
      <label htmlFor={Formfields.runtime}>RUNTIME</label>
      {formik.errors.runtime ? (
        <div className="error">{formik.errors.runtime}</div>
      ) : null}
      <input
        id={Formfields.runtime}
        name={Formfields.runtime}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.runtime}
      />
      <label htmlFor={Formfields.vote_average}>RATING</label>
      {formik.errors.vote_average ? (
        <div className="error">{formik.errors.vote_average}</div>
      ) : null}
      <input
        id={Formfields.vote_average}
        name={Formfields.vote_average}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_average}
      />
      <label htmlFor={Formfields.vote_average}>VOTE COUN</label>
      {formik.errors.vote_count ? (
        <div className="error">{formik.errors.vote_count}</div>
      ) : null}
      <input
        id={Formfields.vote_count}
        name={Formfields.vote_count}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_count}
      />
      <label htmlFor={Formfields.vote_average}>BUDGET</label>
      {formik.errors.budget ? (
        <div className="error">{formik.errors.budget}</div>
      ) : null}
      <input
        id={Formfields.budget}
        name={Formfields.budget}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.budget}
      />
      <label htmlFor={Formfields.vote_average}>REVENUE</label>
      {formik.errors.revenue ? (
        <div className="error">{formik.errors.revenue}</div>
      ) : null}
      <input
        id={Formfields.revenue}
        name={Formfields.revenue}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.revenue}
      />

      <div className="buttons-section">
        <button type="reset" className="button-reset">
          Reset
        </button>
        <button type="submit" className="button-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FilmForm;
