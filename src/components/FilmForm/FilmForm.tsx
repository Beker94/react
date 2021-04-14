import "./style.scss";
import { useFormik } from "formik";
import { Film } from "../../interfaces";
import Select from "react-select";
import { FormType, Genres, FormFields } from "../../constants";
import { selectStyle } from "./selectConfig";
import { useEffect, useRef } from "react";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { closeForm } from "../../redux/modal/actions/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  formAddFilm,
  formEditFilm,
} from "../../redux/form/actions/form.actions";

import { objectToString, stringToObject } from "../../helpers";
import { filmFormSchema } from "./validaion";
import ErrorField from "../ErrorField/ErrorField";
import { RootState } from "../../redux/rootStore";
import { errorsSelector } from "../../redux/selectors";
import { ErrorFields } from "../../redux/form/form.models";

interface FormProps {
  film: Film;
  modalType: string | null;
  successSubmit: boolean;
}

const FilmForm: React.FC<FormProps> = ({ film, modalType, successSubmit }) => {
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => dispatch(closeForm()));
  const errors = useSelector<RootState, ErrorFields>(errorsSelector);

  useEffect(() => {
    if (successSubmit) {
      dispatch(closeForm());
    }
  }, [successSubmit]);

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
    },
    onReset: (values) => {
      values = { ...film, genres: stringToObject(film.genres) };
    },
  });

  if (Object.keys(errors).length) {
    formik.setErrors(errors);

    dispatch(clearErrors());
  }

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
      <label htmlFor={FormFields.title} className="first">
        TITLE
      </label>
      <ErrorField error={formik.errors.title} touched={formik.touched.title} />
      <input
        id={FormFields.title}
        name={FormFields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.tagline}>TAGLINE</label>
      <ErrorField
        error={formik.errors.tagline}
        touched={formik.touched.tagline}
      />
      <input
        id={FormFields.tagline}
        name={FormFields.tagline}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.tagline}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.release_date}>RELEASE DATE</label>
      <ErrorField
        error={formik.errors.release_date}
        touched={formik.touched.release_date}
      />
      <input
        id={FormFields.release_date}
        name={FormFields.release_date}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.release_date}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.poster_path}>MOVIE URL</label>
      <ErrorField
        error={formik.errors.poster_path}
        touched={formik.touched.poster_path}
      />
      <input
        id={FormFields.poster_path}
        name={FormFields.poster_path}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.poster_path}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.genres}>GENRE</label>
      <ErrorField
        error={formik.errors.genres}
        touched={formik.touched.genres}
      />
      <Select
        className="select"
        options={Genres}
        isMulti={true}
        value={formik.values.genres}
        onChange={(value: any) => {
          return formik.setFieldValue("genres", value);
        }}
        styles={selectStyle}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.overview}>OVERVIEW</label>
      <ErrorField
        error={formik.errors.overview}
        touched={formik.touched.overview}
      />
      <input
        id={FormFields.overview}
        name={FormFields.overview}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overview}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.runtime}>RUNTIME</label>
      <ErrorField
        error={formik.errors.runtime}
        touched={formik.touched.runtime}
      />
      <input
        id={FormFields.runtime}
        name={FormFields.runtime}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.runtime}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.vote_average}>RATING</label>
      <ErrorField
        error={formik.errors.vote_average}
        touched={formik.touched.vote_average}
      />
      <input
        id={FormFields.vote_average}
        name={FormFields.vote_average}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_average}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.vote_average}>VOTE COUN</label>
      <ErrorField
        error={formik.errors.vote_count}
        touched={formik.touched.vote_count}
      />
      <input
        id={FormFields.vote_count}
        name={FormFields.vote_count}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.vote_count}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.vote_average}>BUDGET</label>
      <ErrorField
        error={formik.errors.budget}
        touched={formik.touched.budget}
      />
      <input
        id={FormFields.budget}
        name={FormFields.budget}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.budget}
        onBlur={formik.handleBlur}
      />
      <label htmlFor={FormFields.vote_average}>REVENUE</label>
      <ErrorField
        error={formik.errors.revenue}
        touched={formik.touched.revenue}
      />
      <input
        id={FormFields.revenue}
        name={FormFields.revenue}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.revenue}
        onBlur={formik.handleBlur}
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
