import "./style.scss";

const DeleteForm: React.FC = () => {
  return (
    <>
      <h3>Are you sure you want to delete this movie</h3>
      <div className="buttons-section">
        <button type="submit" className="button-submit">
          Submit
        </button>
      </div>
    </>
  );
};

export default DeleteForm;
