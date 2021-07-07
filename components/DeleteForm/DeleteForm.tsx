import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { Film } from "../interfaces";
import { formDeleteFilm } from "../../redux/form/actions/form.actions";
import { closeForm } from "../../redux/modal/actions/modal.actions";

interface DeleteFormProps {
  film: Film;
  modalType: string | null;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ film, modalType }) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => dispatch(closeForm()));

  const onSubmit = () => {
    dispatch(formDeleteFilm.request(film));
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
