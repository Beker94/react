import { useEffect } from "react";
import { DeleteForm } from "../DeleteForm";
import { Film } from "../interfaces";
import { SuccessPopap } from "../SuccessPopap";
import { FormType } from "../../constants";
import { FilmFormWrapper } from "../FilmFormWrapper";

interface FormWrapperProps {
  film: Film;
  modalType: string | null;
  successSubmit: boolean;
  isOpen: boolean;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  film,
  modalType,
  successSubmit,
  isOpen,
}) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, [isOpen, successSubmit]);

  function renderSwitch(
    modalType: string | null,
    film: Film,
    successSubmit: boolean
  ) {
    if (successSubmit) {
      return <SuccessPopap modalType={modalType} />;
    }

    switch (modalType) {
      case FormType.DELETE:
        return <DeleteForm film={film} modalType={modalType} />;

      case FormType.ADD:
        return (
          <FilmFormWrapper
            film={film}
            modalType={modalType}
            successSubmit={successSubmit}
          />
        );

      case FormType.EDIT:
        return (
          <FilmFormWrapper
            film={film}
            modalType={modalType}
            successSubmit={successSubmit}
          />
        );

      default:
        return <></>;
    }
  }

  return (
    <div className="form-wrapper" id="wrapper">
      {renderSwitch(modalType, film, successSubmit)}
    </div>
  );
};

export default FormWrapper;
