import { useState } from "react";
import { newMovie } from "../../constants";
import { films } from "../../films";
import { Film, Modal } from "../../interfaces";
import "./style.scss";

interface DeleteFormrops {
  modalState: Modal;
  closeModal(): void;
}

const DeleteForm: React.FC<DeleteFormrops> = ({ modalState, closeModal }) => {
  const [movie] = useState<Film>(
    films.find((el) => {
      return el.id === modalState.filmID;
    }) || newMovie
  );

  const onSubmit = () => {
    films.splice(films.indexOf(movie), 1);
    closeModal();
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>DELETE MOVIE</h3>
      <h3>Are you sure you want to delete this movie</h3>
      <div className="buttons-section">
        <button type="submit" className="button-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DeleteForm;
