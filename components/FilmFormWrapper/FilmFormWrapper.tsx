import { Film } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../../redux/modal/actions/modal.actions";
import { useCallback, useEffect } from "react";
import { FilmForm } from "../FilmForm";
import { RootState } from "../../redux/rootStore";
import { ErrorFields } from "../../redux/form/form.models";
import { errorsSelector } from "../../redux/selectors";
import { FormType } from "../../constants";
import {
  clearErrors,
  formAddFilm,
  formEditFilm,
} from "../../redux/form/actions/form.actions";

interface FilmFormWrapperProps {
  film: Film;
  modalType: string | null;
  successSubmit: boolean;
}

const FilmFormWrapper: React.FC<FilmFormWrapperProps> = ({
  film,
  modalType,
  successSubmit,
}) => {
  const dispatch = useDispatch();
  const errors = useSelector<RootState, ErrorFields>(errorsSelector);

  useEffect(() => {
    if (successSubmit) {
      dispatch(closeForm());
    }
  }, [successSubmit]);

  const handleCloseForm = useCallback(() => {
    dispatch(closeForm());
  }, []);

  const handleSubmitForm = useCallback((film: Film) => {
    if (modalType === FormType.EDIT) {
      dispatch(formEditFilm.request(film));
    } else {
      dispatch(formAddFilm.request(film));
    }
  }, []);

  const handleClearErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <FilmForm
      film={film}
      modalType={modalType}
      errors={errors}
      closeForm={handleCloseForm}
      submitForm={handleSubmitForm}
      clearErrors={handleClearErrors}
    />
  );
};

export default FilmFormWrapper;
