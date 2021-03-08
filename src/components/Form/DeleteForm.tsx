import { films } from "../../films";
import { Film } from "../../interfaces";
import "./style.scss";

interface DeleteFormrops {
  movie: Film;
  closeModal(): void;
}

const DeleteForm: React.FC<DeleteFormrops> = ({ movie, closeModal }) => {
  const onSubmit = () => {
    films.splice(films.indexOf(movie), 1);

    closeModal();
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="close" onClick={closeModal}></div>
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
