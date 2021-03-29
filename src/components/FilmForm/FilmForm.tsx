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
import { genreSelector } from "../../redux/selectors";
import { objectToString, stringToObject } from "../../helpers";

interface FormProps {
  film: Film;
  modalType: string | null;
}

const FilmForm: React.FC<FormProps> = ({ film, modalType }) => {
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => dispatch(closeForm()));

  const genre: string = useSelector<RootState, string>(genreSelector);

  const formik = useFormik({
    initialValues: { ...film, genres: stringToObject(film.genres) },
    onSubmit: (values) => {
      if (modalType === FormType.EDIT) {
        dispatch(
          formEditFilm.request({
            film: { ...values, genres: objectToString(values.genres) },
            genre: genre,
          })
        );
      } else {
        dispatch(
          formAddFilm.request({
            film: { ...values, genres: objectToString(values.genres) },
            genre: genre,
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
      <input
        id={Formfields.title}
        name={Formfields.title}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor={Formfields.release_date}>RELEASE DATE</label>
      <input
        id={Formfields.release_date}
        name={Formfields.release_date}
        type="date"
        onChange={formik.handleChange}
        value={formik.values.release_date}
      />
      <label htmlFor={Formfields.poster_path}>MOVIE URL</label>
      <input
        id={Formfields.poster_path}
        name={Formfields.poster_path}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.poster_path}
      />
      <label htmlFor={Formfields.genres}>GENRE</label>

      <Select
        className="select"
        options={Genres}
        isMulti={true}
        value={formik.values.genres}
        onChange={(value: any) => {
          debugger;
          return formik.setFieldValue("genres", value.label);
        }}
        styles={selectStyle}
      />
      <label htmlFor={Formfields.overview}>OVERVIEW</label>
      <input
        id={Formfields.overview}
        name={Formfields.overview}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.overview}
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
        value={formik.values.vote_average}
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
