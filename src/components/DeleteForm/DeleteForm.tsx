import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { Film } from "../../interfaces";
import { formDeleteFilm } from "../../redux/form/actions/form.actions";
import { closeForm } from "../../redux/modal/actions/modal.actions";
import { RootState } from "../../redux/rootStore";
import {
  genreSelector,
  offsetSelector,
  searchedFilmSelector,
  sortingTypeSelector,
} from "../../redux/selectors";
import "./style.scss";

interface DeleteFormProps {
  film: Film;
  modalType: string;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ film, modalType }) => {
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

  const onSubmit = () => {
    dispatch(
      formDeleteFilm.request({
        film: film,
        genre,
        searchTitle,
        sortingType,
        offset,
      })
    );
    dispatch(closeForm());
  };

  return (
    <div className="delete-form" ref={wrapperRef}>
      <div className="form-header">
        <h3>{modalType?.toUpperCase()} MOVIE</h3>
        <div className="close" onClick={() => dispatch(closeForm())}></div>
      </div>
      <h3>Are you sure you want to delete this movie</h3>
      <div className="buttons-section">
        <button type="submit" className="button-submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DeleteForm;
