import "./style.scss";
import { useFormik } from "formik";
import { Modal } from "../../interfaces";
import { films } from "../../films";
import Select from "react-select";
import { FormType, Genres, Formfields } from "../../constants";
import { selectStyle } from "./selectConfig";
import { useRef } from "react";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";

interface FormProps {
  closeModal(): void;
  modalState: Modal;
}

const FilmForm: React.FC<FormProps> = ({ closeModal, modalState }) => {
  const wrapperRef = useRef(null);
  useOutsideClickHook(wrapperRef, closeModal);

  const formik = useFormik({
    initialValues: modalState.film!,
    onSubmit: (values) => {
      if (modalState.type === FormType.EDIT) {
        films[films.indexOf(modalState.film!)] = values;
      } else {
        films.push(values);
      }
      closeModal();
    },
    onReset: (values) => {
      values = modalState.film!;
    },
  });

  return (
    <form
      className="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      ref={wrapperRef}
    >
      <h3>{modalState.type.toUpperCase()} MOVIE</h3>

      <label htmlFor={Formfields.title}>TITLE</label>
      <input
        id={Formfields.title}
        name={Formfields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor={Formfields.releaseDate}>RELEASE DATE</label>
      <input
        id={Formfields.releaseDate}
        name={Formfields.releaseDate}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.releaseDate}
      />
      <label htmlFor={Formfields.movieURL}>MOVIE URL</label>
      <input
        id={Formfields.movieURL}
        name={Formfields.movieURL}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.movieURL}
      />
      <label htmlFor={Formfields.genre}>GENRE</label>

      <Select
        className="select"
        options={Genres}
        isMulti={true}
        value={formik.values.genre}
        onChange={(value) => formik.setFieldValue("genre", value)}
        styles={selectStyle}
      />
      <label htmlFor={Formfields.overviev}>OVERVIEW</label>
      <input
        id={Formfields.overviev}
        name={Formfields.overviev}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overviev}
      />
      <label htmlFor={Formfields.runtime}>RUNTIME</label>
      <input
        id={Formfields.runtime}
        name={Formfields.runtime}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.runtime}
      />
      <label htmlFor={Formfields.rating}>RATING</label>
      <input
        id={Formfields.rating}
        name={Formfields.rating}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.rating}
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
