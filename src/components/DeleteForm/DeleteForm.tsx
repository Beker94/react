import { useRef } from "react";
import { films } from "../../films";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";
import { Modal } from "../../interfaces";
import "./style.scss";

interface DeleteFormrops {
  modalState: Modal;
  closeModal(): void;
}

const DeleteForm: React.FC<DeleteFormrops> = ({ modalState, closeModal }) => {
  const wrapperRef = useRef(null);
  useOutsideClickHook(wrapperRef, closeModal);
  const onSubmit = () => {
    films.splice(films.indexOf(modalState.film!), 1);
    closeModal();
  };

  return (
    <div className="form" ref={wrapperRef}>
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
