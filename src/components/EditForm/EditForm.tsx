import "./style.scss";
import { useFormik } from "formik";
import { Film, Modal } from "../../interfaces";
import { films } from "../../films";
import Select from "react-select";
import { useEffect, useState } from "react";
import { newMovie, FormType, Genres, formfields } from "../../constants";
import { selectStyle } from "./selectConfig";

interface FormProps {
  closeModal(): void;
  modalState: Modal;
}

const EditForm: React.FC<FormProps> = ({ closeModal, modalState }) => {
  const [movie] = useState<Film>(
    films.find((el) => {
      return el.id === modalState.filmID;
    }) || newMovie
  );

  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  });

  const formik = useFormik({
    initialValues: movie,
    onSubmit: (values) => {
      if (modalState.type === FormType.EDIT) {
        films[films.indexOf(movie)] = values;
      } else {
        films.push(values);
      }
      closeModal();
    },
    onReset: (values) => {
      values = movie;
    },
  });

  return (
    <form
      className="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <h3>{modalState.type.toUpperCase()} MOVIE</h3>

      <label htmlFor="title">TITLE</label>
      <input
        id={formfields.title}
        name={formfields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor="releaseDate">RELEASE DATE</label>
      <input
        id={formfields.releaseDate}
        name={formfields.releaseDate}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.releaseDate}
      />
      <label htmlFor="movieURL">MOVIE URL</label>
      <input
        id={formfields.movieURL}
        name={formfields.movieURL}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.movieURL}
      />
      <label htmlFor="genre">GENRE</label>

      <Select
        className="select"
        options={Genres}
        isMulti={true}
        value={formik.values.genre}
        onChange={(value) => formik.setFieldValue("genre", value)}
        styles={selectStyle}
      />
      <label htmlFor="overviev">OVERVIEW</label>
      <input
        id={formfields.overviev}
        name={formfields.overviev}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overviev}
      />
      <label htmlFor="runtime">RUNTIME</label>
      <input
        id={formfields.runtime}
        name={formfields.runtime}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.runtime}
      />
      <label htmlFor="runtime">RATING</label>
      <input
        id={formfields.rating}
        name={formfields.rating}
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

export default EditForm;
