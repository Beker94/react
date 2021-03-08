import "./style.scss";
import { useFormik } from "formik";
import { Film, Modal } from "../../interfaces";
import { films } from "../../films";
import Select from "react-select";
import DeleteForm from "./DeleteForm";
import { useEffect, useState } from "react";
import { newMovie, FormType, Genres } from "../../constants";
import { selectStyle } from "./selectConfig";

interface FormProps {
  closeModal(): void;
  modalState: Modal;
}

const Form: React.FC<FormProps> = ({ closeModal, modalState }) => {
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
      values.releaseDate = new Date(values.releaseDate);
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
    <div className="form-wrapper">
      {modalState.type === FormType.DELETE ? (
        <DeleteForm movie={movie} closeModal={closeModal} />
      ) : (
        <form
          className="form"
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <div className="close" onClick={closeModal}></div>
          <h3>{modalState.type.toUpperCase()} MOVIE</h3>

          <label htmlFor="title">TITLE</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <label htmlFor="releaseDate">RELEASE DATE</label>
          <input
            id="releaseDate"
            name="releaseDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.releaseDate.toString()}
          />
          <label htmlFor="movieURL">MOVIE URL</label>
          <input
            id="movieURL"
            name="movieURL"
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
            id="overviev"
            name="overviev"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.overviev}
          />
          <label htmlFor="runtime">RUNTIME</label>
          <input
            id="runtime"
            name="runtime"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.runtime}
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
      )}
    </div>
  );
};

export default Form;
