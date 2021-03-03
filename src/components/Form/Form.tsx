import "./style.scss";
import { useFormik } from "formik";
import { Modal } from "../../interfaces";
import { films } from "../../films";
import { CONSTANTS } from "../../constants";
import Select from "react-select";

const selectStyle: any = {
  menu: () => {
    return {
      backgroundColor: "#232323;",
      position: "absolute",
      margin: "20px",
      marginTop: "0",
      display: "block",
      width: "330px",
      top: "48px",
      borderRadius: "3px",
    };
  },
  option: () => {
    return {
      ":hover": {
        backgroundColor: "#f65261;",
      },
    };
  },
  control: () => {
    return {
      backgroundColor: "#555",
      margin: "20px",
      border: "none",
      height: "26px",
      borderRadius: "3px",
      color: "white",
      display: "flex",
    };
  },
};

interface FormProps {
  closeModal(): void;
  modalState: Modal;
}

const Form: React.FC<FormProps> = ({ closeModal, modalState }) => {
  const movie: any =
    modalState.type === CONSTANTS.FORM_TYPE.ADD
      ? CONSTANTS.ADD_MOVIE
      : films.find((el) => {
          return el.id === modalState.filmID;
        });

  const formik = useFormik({
    initialValues: movie,
    onSubmit: (values) => {
      values.releaseDate = new Date(values.releaseDate);
      if (modalState.type === CONSTANTS.FORM_TYPE.EDIT) {
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
          value={formik.values.releaseDate}
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
          options={CONSTANTS.GENRES}
          isMulti={true}
          value={formik.values.genre}
          onChange={(value) => formik.setFieldValue("genre", value)}
          styles={selectStyle}
        ></Select>
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
    </div>
  );
};

export default Form;
