import "./style.scss";
import { useFormik } from "formik";
import { Film } from "../../interfaces";
import Select from "react-select";
import { FormType, Genres, Formfields } from "../../constants";
import { selectStyle } from "./selectConfig";
import { useRef } from "react";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { closeForm } from "../../redux/modal/actions/modal.actions";
import { useDispatch } from "react-redux";
import {
  formAddFilm,
  formEditFilm,
} from "../../redux/form/actions/form.actions";

import { objectToString, stringToObject } from "../../helpers";
import { filmFormSchema } from "./validaion";
import ErrorField from "../ErrorField/ErrorField";

interface FormProps {
  film: Film;
  modalType: string | null;
}

const FilmForm: React.FC<FormProps> = ({ film, modalType }) => {
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => dispatch(closeForm()));

  const formik = useFormik({
    initialValues: { ...film, genres: stringToObject(film.genres) },
    validationSchema: filmFormSchema,
    onSubmit: (values) => {
      const newFilm = {
        ...values,
        genres: objectToString(values.genres),
      };
      if (modalType === FormType.EDIT) {
        dispatch(formEditFilm.request(newFilm));
      } else {
        dispatch(formAddFilm.request(newFilm));
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
      <ErrorField error={formik.errors.title} />
      <input
        id={Formfields.title}
        name={Formfields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor={Formfields.tagline}>TAGLINE</label>
      <ErrorField error={formik.errors.tagline} />
      <input
        id={Formfields.tagline}
        name={Formfields.tagline}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.tagline}
      />
      <label htmlFor={Formfields.release_date}>RELEASE DATE</label>
      <ErrorField error={formik.errors.release_date} />
      <input
        id={Formfields.release_date}
        name={Formfields.release_date}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.release_date}
      />
      <label htmlFor={Formfields.poster_path}>MOVIE URL</label>
      <ErrorField error={formik.errors.poster_path} />
      <input
        id={Formfields.poster_path}
        name={Formfields.poster_path}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.poster_path}
      />
      <label htmlFor={Formfields.genres}>GENRE</label>
      <ErrorField error={formik.errors.genres} />
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
      <ErrorField error={formik.errors.overview} />
      <input
        id={Formfields.overview}
        name={Formfields.overview}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overview}
      />
      <label htmlFor={Formfields.runtime}>RUNTIME</label>
      <ErrorField error={formik.errors.runtime} />
      <input
        id={Formfields.runtime}
        name={Formfields.runtime}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.runtime}
      />
      <label htmlFor={Formfields.vote_average}>RATING</label>
      <ErrorField error={formik.errors.vote_average} />
      <input
        id={Formfields.vote_average}
        name={Formfields.vote_average}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_average}
      />
      <label htmlFor={Formfields.vote_average}>VOTE COUN</label>
      <ErrorField error={formik.errors.vote_count} />
      <input
        id={Formfields.vote_count}
        name={Formfields.vote_count}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_count}
      />
      <label htmlFor={Formfields.vote_average}>BUDGET</label>
      <ErrorField error={formik.errors.budget} />
      <input
        id={Formfields.budget}
        name={Formfields.budget}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.budget}
      />
      <label htmlFor={Formfields.vote_average}>REVENUE</label>
      <ErrorField error={formik.errors.revenue} />
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
