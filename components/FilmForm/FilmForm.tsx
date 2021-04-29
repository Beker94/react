import { useFormik } from "formik";
import { Film } from "../interfaces";
import Select from "react-select";
import { Genres, FormFields } from "../../constants";
import { selectStyle } from "./selectConfig";
import { useRef } from "react";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { objectToString, stringToObject } from "../../helpers";
import { filmFormSchema } from "./validaion";
import ErrorField from "../ErrorField/ErrorField";
import { ErrorFields } from "../../redux/form/form.models";

interface FormProps {
  film: Film;
  modalType: string | null;
  errors: ErrorFields;
  closeForm(): void;
  submitForm(film: Film): void;
  clearErrors(): void;
}

const FilmForm: React.FC<FormProps> = ({
  film,
  modalType,
  errors,
  closeForm,
  submitForm,
  clearErrors,
}) => {
  const wrapperRef = useRef(null);

  useOutsideClickHook(wrapperRef, closeForm);

  const formik = useFormik({
    initialValues: { ...film, genres: stringToObject(film.genres) },
    validationSchema: filmFormSchema,
    onSubmit: (values) => {
      const newFilm = {
        ...values,
        genres: objectToString(values.genres),
      };

      submitForm(newFilm);
    },
    onReset: (values) => {
      values = { ...film, genres: stringToObject(film.genres) };
    },
  });

  if (Object.keys(errors).length && errors !== formik.errors) {
    formik.setErrors(errors);

    clearErrors();
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
        <div className="close" onClick={closeForm}></div>
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
        value={formik.values.runtime!}
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
